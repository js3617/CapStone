const express = require('express');
const Store = require('../models/store.model');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        const stores = await Store.find();
        res.json({
            stores
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
})

router.get('/near_store/:location', async (req, res, next) => {
    const loc = req.params.location.split(',');
    const lat = parseFloat(loc[0]);
    const lng = parseFloat(loc[1]);
    
    if (isNaN(lat) || isNaN(lng)) {
        return res.status(400).json({ error: "Invalid location data" });
    }

    try {
        const stores = await Store.find({
            location: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat] // 경도, 위도 순서
                    }
                }
            }
            })
            .limit(10)
            .exec();
        
        res.json(stores); // 배열 전달
    } catch (error) {
        console.error(error);
        next(error);
    }
});


module.exports = router;
