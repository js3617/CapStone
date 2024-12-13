const express = require('express');
const Pharmacy = require('../models/pharmacy.model');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const { latitude, longitude } = req.body;
    const currentTime = new Date();
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const currentDayOfWeek = dayOfWeek[currentTime.getDay()];
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentTimeInMinutes = currentHour * 100 + currentMinute;
    
    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Invalid location data" });
    }

    try {
        const pharmacies = await Pharmacy.find({
            operatingHours: {
                $elemMatch: {
                    dayOfWeek: currentDayOfWeek,
                    open: { $lte: currentTimeInMinutes },
                    close: { $gte: currentTimeInMinutes }
                }
            },
            location: {
                $nearSphere: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude] // 경도, 위도 순서
                    },
                    $maxDistance: 5000 // 예를 들어 5km 이내의 약국을 찾습니다
                }
            }
        }).limit(10).exec();  // 최대 10개의 약국 정보를 반환

        res.json({ pharmacies });
    } catch (error) {
        console.error("Error fetching pharmacies based on location and time:", error);
        next(error);
    }
});

module.exports = router;
