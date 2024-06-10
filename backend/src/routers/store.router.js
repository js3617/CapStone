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

// router.get('/stock/:drugID', async (req, res, next) => {
//     const drugID = req.params.drugID;
//     const { latitude, longitude } = req.query;

//     let browser;
//     try {
//         browser = await puppeteer.launch({
//             headless: true,
//             args: [
//                 '--disable-gpu',
//                 '--disable-dev-shm-usage',
//                 '--disable-setuid-sandbox',
//                 '--no-first-run',
//                 '--no-sandbox',
//                 '--no-zygote',
//                 '--single-process',
//                 '--disable-webgl'
//             ]
//         });
//         const page = await browser.newPage();
//         const url = `https://www.pocketcu.co.kr/search/stock?isRecommend=Y&recommend_id=&searchWord=%EA%B0%80%EC%95%BC%EB%8F%99&item_cd=${encodeURIComponent(drugID)}`;
//         await page.goto(url, { waitUntil: 'domcontentloaded' });

//         // 페이지에서 원하는 정보를 추출합니다.
//         const storeStocks = await page.evaluate(() => {
//             const stores = [];
//             const storeElements = document.querySelectorAll('.store_info');
//             storeElements.forEach(storeElement => {
//                 const storeNameElement = storeElement.querySelector('.tit_18');
//                 const stockElement = storeElement.querySelector('.mty_qty');

//                 // storeNameElement나 stockElement가 null인 경우를 처리
//                 if (storeNameElement && stockElement) {
//                     const storeName = storeNameElement.innerText.trim();
//                     const stock = stockElement.innerText.trim();
//                     if (parseInt(stock, 10) > 0) {
//                         stores.push({
//                             name: storeName,
//                             stock: parseInt(stock, 10)
//                         });
//                     }
//                 } else {
//                     console.log('storeNameElement or stockElement is null');
//                 }
//             });
//             return stores;
//         });

//         await browser.close();

//         const nearbyStores = await Store.find({
//             location: {
//                 $near: {
//                     $geometry: {
//                         type: 'Point',
//                         coordinates: [parseFloat(longitude), parseFloat(latitude)]
//                     }
//                 }
//             }
//         })
//         .limit(100)
//         .exec();

//         const filteredStores = nearbyStores.filter(store => {
//             if (!store.storeName.startsWith('씨유')) {
//                 return false;
//             }

//             const storeNameNormalized = store.storeName.replace(/\s/g, '').toLowerCase();
//             const stockNames = storeStocks.map(stock => stock.name.replace(/\s/g, '').toLowerCase());

//             // "씨유"를 접두사로 추가한 이름과 원래 이름 모두를 비교
//             const matchingStoreName = stockNames.find(stockName => 
//                 storeNameNormalized.includes(stockName) ||
//                 stockName.includes(storeNameNormalized) ||
//                 ("씨유" + storeNameNormalized).includes(stockName) ||
//                 stockName.includes("씨유" + storeNameNormalized)
//             );

//             if (matchingStoreName) {
//                 return storeStocks.find(stock => stock.name.replace(/\s/g, '').toLowerCase() === matchingStoreName).stock > 0;
//             } else {
//                 return false;
//             }
//         }).map(store => {
//             const storeNameNormalized = store.storeName.replace(/\s/g, '').toLowerCase();
//             const matchingStore = storeStocks.find(stock => 
//                 storeNameNormalized.includes(stock.name.replace(/\s/g, '').toLowerCase()) ||
//                 stock.name.replace(/\s/g, '').toLowerCase().includes(storeNameNormalized) ||
//                 ("씨유" + storeNameNormalized).includes(stock.name.replace(/\s/g, '').toLowerCase()) ||
//                 stock.name.replace(/\s/g, '').toLowerCase().includes("씨유" + storeNameNormalized)
//             );
//             return {
//                 ...store.toObject(),
//                 stock: matchingStore.stock
//             };
//         });

//         res.json({ stores: filteredStores });
//     } catch (error) {
//         console.error(error);
//         next(error);
//     } finally {
//         if (browser) await browser.close();
//     }
// });

// router.post('/stock', async (req, res, next) => {
//     const { latitude, longitude, drugID } = req.body;

//     let browser;
//     try {
//         browser = await puppeteer.launch({
//             headless: true,
//             args: [
//                 '--disable-gpu',
//                 '--disable-dev-shm-usage',
//                 '--disable-setuid-sandbox',
//                 '--no-first-run',
//                 '--no-sandbox',
//                 '--no-zygote',
//                 '--single-process',
//                 '--disable-webgl'
//             ]
//         });
//         const page = await browser.newPage();
//         const url = `https://www.pocketcu.co.kr/search/stock?isRecommend=Y&recommend_id=&searchWord=%EA%B0%80%EC%95%BC%EB%8F%99&item_cd=${encodeURIComponent(drugID)}`;
//         await page.goto(url, { waitUntil: 'domcontentloaded' });

//         // 페이지에서 원하는 정보를 추출합니다.
//         const storeStocks = await page.evaluate(() => {
//             const stores = [];
//             const storeElements = document.querySelectorAll('.store_info');
//             storeElements.forEach(storeElement => {
//                 const storeNameElement = storeElement.querySelector('.tit_18');
//                 const stockElement = storeElement.querySelector('.mty_qty');

//                 // storeNameElement나 stockElement가 null인 경우를 처리
//                 if (storeNameElement && stockElement) {
//                     const storeName = storeNameElement.innerText.trim();
//                     const stock = stockElement.innerText.trim();
//                     if (parseInt(stock, 10) > 0) {
//                         stores.push({
//                             name: storeName,
//                             stock: parseInt(stock, 10)
//                         });
//                     }
//                 } else {
//                     console.log('storeNameElement or stockElement is null');
//                 }
//             });
//             return stores;
//         });

//         await browser.close();

//         const nearbyStores = await Store.find({
//             location: {
//                 $near: {
//                     $geometry: {
//                         type: 'Point',
//                         coordinates: [parseFloat(longitude), parseFloat(latitude)]
//                     }
//                 }
//             }
//         })
//         .limit(100)
//         .exec();

//         const filteredStores = nearbyStores.filter(store => {
//             if (!store.storeName.startsWith('씨유')) {
//                 return false;
//             }

//             const storeNameNormalized = store.storeName.replace(/\s/g, '').toLowerCase();
//             const stockNames = storeStocks.map(stock => stock.name.replace(/\s/g, '').toLowerCase());

//             // "씨유"를 접두사로 추가한 이름과 원래 이름 모두를 비교
//             const matchingStoreName = stockNames.find(stockName => 
//                 storeNameNormalized.includes(stockName) ||
//                 stockName.includes(storeNameNormalized) ||
//                 ("씨유" + storeNameNormalized).includes(stockName) ||
//                 stockName.includes("씨유" + storeNameNormalized)
//             );

//             if (matchingStoreName) {
//                 return storeStocks.find(stock => stock.name.replace(/\s/g, '').toLowerCase() === matchingStoreName).stock > 0;
//             } else {
//                 return false;
//             }
//         }).map(store => {
//             const storeNameNormalized = store.storeName.replace(/\s/g, '').toLowerCase();
//             const matchingStore = storeStocks.find(stock => 
//                 storeNameNormalized.includes(stock.name.replace(/\s/g, '').toLowerCase()) ||
//                 stock.name.replace(/\s/g, '').toLowerCase().includes(storeNameNormalized) ||
//                 ("씨유" + storeNameNormalized).includes(stock.name.replace(/\s/g, '').toLowerCase()) ||
//                 stock.name.replace(/\s/g, '').toLowerCase().includes("씨유" + storeNameNormalized)
//             );
//             return {
//                 ...store.toObject(),
//                 stock: matchingStore.stock
//             };
//         });

//         res.json({ stores: filteredStores });
//     } catch (error) {
//         console.error(error);
//         next(error);
//     } finally {
//         if (browser) await browser.close();
//     }
// });

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