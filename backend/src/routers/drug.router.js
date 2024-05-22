const 
    express = require('express'),
    Drug = require('../models/drug.model'),
    router = express.Router(); 

// product 페이지로 간다면 모든 제품의 리스트를 보여줌
router.get('/', async(req, res, next) => {
    try {
        await Drug.find()
                     .exec((err, drug) => {
                        if(err) return res.status(400).send(err);
                        return res.status(200).json({success: true, drug});
                    })
    } catch (error) {
        console.error(error);
        next(error);
    }
});

// 약 하나에 대한 상세 정보
router.get('/:id', async(req, res, next) => {
    try {
        await Drug.findById(req.params.id)
                     .exec((err, drug) => {
                        if(err) return res.status(400).send(err);
                        return res.status(200).json({success: true, drug});
                    })
    } catch (error) {
        console.error(error);
        next(error);
    }
})

// 검색을 관련
router.get('/search/:search', async (req, res, next) => {
    const drugSearch = req.params.search;
    try {
        // 약물 이름 또는 카테고리가 정확히 일치하는 경우 검색
        let drug = await Drug.find({
            $or: [
                { drugName: drugSearch },
                { drugCategory: drugSearch }
            ]
        });

        // 검색 결과가 없는 경우 약물 이름에 포함된 경우로 다시 검색
        if (drug.length === 0) {
            drug = await Drug.find({ drugName: { $regex: drugSearch, $options: 'i' } });
        }

        return res.status(200).json(drug);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;