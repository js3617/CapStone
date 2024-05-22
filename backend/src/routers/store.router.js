const express = require('express');
const puppeteer = require('puppeteer');
const Store = require('../models/store.model');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { latitude, longitude } = req.body;
    try {
        const stores = await Store.find({
                location: {
                    $near: {
                        $geometry: {
                            type: "Point",
                            coordinates: [longitude, latitude] // 경도, 위도 순서
                        }
                    }
                }
            })
            .limit(10)
            .exec();
        res.json({stores});
    } catch (error) {
        res.status(500).send(err);
    }
})

router.get('/stock', async (req, res, next) => {
    // const { drugID } = req.query;
    // const url = `https://www.pocketcu.co.kr/search/stock?isRecommend=Y&recommend_id=&searchWord=%EB%B6%80%EC%82%B0%EC%A7%84%EA%B5%AC&item_cd=${drugID}`;
    const url = `https://www.pocketcu.co.kr/search/stock?isRecommend=Y&recommend_id=&searchWord=%EA%B0%80%EC%95%BC%EB%8F%99&item_cd=8806521017242`;

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
                '--single-process',
                '--disable-webgl'
            ]
        });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'domcontentloaded' });

        // 페이지에서 원하는 정보를 추출합니다.
        const storeStocks = await page.evaluate(() => {
            const stores = [];
            const storeElements = document.querySelectorAll('.store_info');
            storeElements.forEach(storeElement => {
                const storeNameElement = storeElement.querySelector('.tit_18');
                const stockElement = storeElement.querySelector('.mty_qty');

                // storeNameElement나 stockElement가 null인 경우를 처리
                if (storeNameElement && stockElement) {
                    const storeName = storeNameElement.innerText.trim();
                    const stock = stockElement.innerText.trim();
                    if (parseInt(stock, 10) > 0) {
                        stores.push({
                            name: storeName,
                            stock: parseInt(stock, 10)
                        });
                    }
                } else {
                    console.log('storeNameElement or stockElement is null');
                }
            });
            return stores;
        });

        await browser.close();

        res.json(storeStocks);
    } catch (error) {
        console.error(error);
        if (browser) await browser.close();
        next(error);
    }
});

router.post('/stock', async (req, res, next) => {
    const { latitude, longitude } = req.body;

    try {
        // 먼저 위치 기반으로 편의점을 검색
        const stores = await Store.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude] // 경도, 위도 순서
                    }
                }
            }
        })
        .limit(100)
        .exec();

        // GET 라우트를 통해 재고 데이터를 가져옴
        const stockResponse = await fetch('http://localhost:3000/store/stock');
        const stockData = await stockResponse.json();

        // 재고가 있는 편의점 중 "씨유"로 시작하는 편의점만 필터링
        const filteredStores = stores.filter(store => {
            if (!store.storeName.startsWith('씨유')) {
                return false;
            }

            const storeNameNormalized = store.storeName.replace(/\s/g, '').toLowerCase();
            const stockNames = stockData.map(stock => stock.name.replace(/\s/g, '').toLowerCase());

            // "씨유"를 접두사로 추가한 이름과 원래 이름 모두를 비교
            const matchingStoreName = stockNames.find(stockName => 
                storeNameNormalized.includes(stockName) ||
                stockName.includes(storeNameNormalized) ||
                ("씨유" + storeNameNormalized).includes(stockName) ||
                stockName.includes("씨유" + storeNameNormalized)
            );

            if (matchingStoreName) {
                return stockData.find(stock => stock.name.replace(/\s/g, '').toLowerCase() === matchingStoreName).stock > 0;
            } else {
                return false;
            }
        }).map(store => {
            const storeNameNormalized = store.storeName.replace(/\s/g, '').toLowerCase();
            const matchingStore = stockData.find(stock => 
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

        res.json({ stores: filteredStores });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;