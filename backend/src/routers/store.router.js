const express = require('express');
const Store = require('../models/store.model'); // 모델 경로가 올바른지 확인하세요
const router = express.Router();

router.post('/', async (req, res) => {
    const { latitude, longitude } = req.body;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude must be provided." });
    }

    try {
        const stores = await Store.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude] // 경도, 위도 순서
                    },
                    $maxDistance: 5000 // 5km 이내의 상점만 조회
                }
            }
        }).limit(10).exec();

        res.status(200).json({ stores });
    } catch (error) {
        console.error("Error fetching stores:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

async function getStockData(drugID) {
    let browser;
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--disable-gpu',
                '--disable-dev-shm-usage',
                '--disable-setuid-sandbox',
                '--no-first-run',
                '--no-sandbox',
                '--no-zygote',
                // '--single-process',
                '--disable-webgl'
            ]
        });
        const page = await browser.newPage();
        const url = `https://www.pocketcu.co.kr/search/stock?isRecommend=Y&recommend_id=&searchWord=%EA%B0%80%EC%95%BC%EB%8F%99&item_cd=${encodeURIComponent(drugID)}`;
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        const storeStocks = await page.evaluate(() => {
            const stores = [];
            const storeElements = document.querySelectorAll('.store_info');
            storeElements.forEach(storeElement => {
                const storeNameElement = storeElement.querySelector('.tit_18');
                const stockElement = storeElement.querySelector('.mty_qty');

                if (storeNameElement && stockElement) {
                    const storeName = storeNameElement.innerText.trim();
                    const stock = stockElement.innerText.trim();
                    if (parseInt(stock, 10) > 0) {
                        stores.push({
                            name: storeName,
                            stock: parseInt(stock, 10)
                        });
                    }
                }
            });
            return stores;
        });

        await browser.close();
        return storeStocks;
    } catch (error) {
        console.error(error);
        if (browser) await browser.close();
        throw error;
    }
}

function filterStores(nearbyStores, storeStocks) {
    return nearbyStores.filter(store => {
        if (!store.storeName.startsWith('씨유')) {
            return false;
        }

        const storeNameNormalized = store.storeName.replace(/\s/g, '').toLowerCase();
        const stockNames = storeStocks.map(stock => stock.name.replace(/\s/g, '').toLowerCase());

        const matchingStoreName = stockNames.find(stockName => 
            storeNameNormalized.includes(stockName) ||
            stockName.includes(storeNameNormalized) ||
            ("씨유" + storeNameNormalized).includes(stockName) ||
            stockName.includes("씨유" + storeNameNormalized)
        );

        if (matchingStoreName) {
            return storeStocks.find(stock => stock.name.replace(/\s/g, '').toLowerCase() === matchingStoreName).stock > 0;
        } else {
            return false;
        }
    }).map(store => {
        const storeNameNormalized = store.storeName.replace(/\s/g, '').toLowerCase();
        const matchingStore = storeStocks.find(stock => 
            storeNameNormalized.includes(stock.name.replace(/\s/g, '').toLowerCase()) ||
            stock.name.replace(/\s/g, '').toLowerCase().includes(storeNameNormalized) ||
            ("씨유" + storeNameNormalized).includes(stock.name.replace(/\s/g, '').toLowerCase()) ||
            stock.name.replace(/\s/g, '').toLowerCase().includes("씨유" + storeNameNormalized)
        );
        return {
            ...store.toObject(),
            stock: matchingStore.stock
        };
    });
}

router.post('/stock', async (req, res, next) => {
    const { latitude, longitude, drugID } = req.body;

    try {
        const storeStocks = await getStockData(drugID);

        const nearbyStores = await Store.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    }
                }
            }
        })
        .limit(100)
        .exec();

        const filteredStores = filterStores(nearbyStores, storeStocks);
        res.json({ stores: filteredStores });
    } catch (error) {
        console.error(error);
        next(error);
    }
});



module.exports = router;
