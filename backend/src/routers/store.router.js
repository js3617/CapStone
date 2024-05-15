const express = require('express');
const puppeteer = require('puppeteer');
const Store = require('../models/store.model');

const router = express.Router();

router.get('/stock', async (req, res, next) => {
    const { storeId, searchWord } = req.params;

    try {
        const browser = await puppeteer.launch({
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
        // await page.goto(`https://www.pocketcu.co.kr/search/stock/storeItems/${storeId}?searchWord=${searchWord}`, { waitUntil: 'domcontentloaded' });
        await page.goto('https://www.pocketcu.co.kr/search/stock?isRecommend=Y&recommend_id=&searchWord=%EA%B0%80%EC%95%BC%EB%8C%80%EB%A1%9C&item_cd=8806723002312', {waitUntil: 'domcontentloaded'})

        // 페이지에서 원하는 정보를 추출합니다.
        const storeStocks = await page.evaluate(() => {
            const elements = document.querySelectorAll('.store_info .mty_qty');
            const stocks = Array.from(elements).map(element => {
                let stockText = element.innerText.trim();
                return stockText === "0" ? '재고 없음' : stockText;
            });
            return stocks;
        });

        await browser.close();

        res.json({
            storeId,
            storeStocks
        });
    } catch (error) {
        console.error(error);
        await browser.close();
        next(error);
    }
});

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


module.exports = router;