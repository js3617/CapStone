const express = require('express');
const Store = require('../models/store.model');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const stores = await Store.find()
                            .limit(10);
        res.json({
            stores
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
});

router.get('/:(lat, lng)', async (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
})

module.exports = router;
