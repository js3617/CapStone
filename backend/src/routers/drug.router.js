const 
    express = require('express'),
    Drug = require('../models/drug.model'),
    router = express.Router(); 

// drug 페이지로 간다면 모든 제품의 리스트를 보여줌
router.get('/', async (req, res, next) => {
    try {
        const drugs = await Drug.find();
        res.render('drugs', { drugs });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 카테고리를 검색한다면 그 카테고리에 있는 값을 검색한다면
router.get('/category/:category', async(req, res, next) => {
    // 검색한 값을 categorySlug 변수에 할당
    const categorySlug = req.params.category;
    try {
        // drug에서 categorySlug가 포함된 drug들의 값을 drugs 변수에 할당
        const drugs = await Drug.find({drugCategory: categorySlug});
        res.json({
            drugs
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
})

// 이름을 검색한다면 
router.get('/name/:name', async(req, res, next) => {
    // 검색한 값을 drugName 변수에 할당
    const drugName = req.params.name;
    try {
        // drug에서 drugName가 포함된 drug들의 값을 drugs 변수에 할당 (여기서는 그 값을 포함한 값들을 할당해줌, $regex가 그 역할)
        const drugs = await Drug.find({
            drugName: { $regex: drugName }
        });
        res.json({
            drugs
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
})

module.exports = router;