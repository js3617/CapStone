// src/routes/hospital.router.js
const express = require('express');
const Hospital = require('../models/hospital.model'); 
const router = express.Router();

// 위치 기반 병원 검색 API
router.post('/', async (req, res) => {
    const { latitude, longitude } = req.body;
    
    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    try {
        const hospitals = await Hospital.find({
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [longitude, latitude] },
                    $maxDistance: 5000 // 5km 이내의 병원 검색
                }
            }
        });
        res.json({ hospitals });
        console.log(hospitals);
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
