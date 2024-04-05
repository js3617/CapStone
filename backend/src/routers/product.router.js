const express = require('express');
const Product = require('../models/product.model');

const router = express.Router();

// product 페이지로 간다면 모든 제품의 리스트를 보여줌
router.get('/', async(req, res, next) => {
    try {
        await Product.find()
                     .exec((err, product) => {
                        if(err) return res.status(400).send(err);
                        return res.status(200).json({success: true, product});
                     })
        
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 카테고리를 검색한다면 그 카테고리에 있는 값을 검색한다면
router.get('/search_category/:category', async(req, res, next) => {
    // 검색한 값을 categorySlug 변수에 할당
    const categorySlug = req.params.category;
    try {
        // product에서 categorySlug가 포함된 drug들의 값을 products 변수에 할당
        const products = await Product.find({drugCategory: categorySlug});
        res.json({
            products
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

// 이름을 검색한다면 
router.get('/search_name/:name', async(req, res, next) => {
    // 검색한 값을 productName 변수에 할당
    const productName = req.params.name;
    try {
        // product에서 productName가 포함된 drug들의 값을 products 변수에 할당 (여기서는 그 값을 포함한 값들을 할당해줌, $regex가 그 역할)
        const products = await Product.find({
            drugName: { $regex: productName }
        });
        res.json({
            products
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;