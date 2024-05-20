const 
    express = require('express'),
    Pharmacy = require('../models/pharmacy.model'), 
    router = express.Router();

router.post('/', async (req, res, next) => {
    const
        { latitude, longitude } = req.body,
        currentTime = new Date(),
        dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"],
        currentDayOfWeek = dayOfWeek[currentTime.getDay()],
        currentHour = currentTime.getHours(),
        currentMinute = currentTime.getMinutes(),
        currentTimeInMinutes = currentHour * 100 + currentMinute;
    
    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Invalid location data" });
    }

    try {
        const pharmacies = await Pharmacy.find({
            $and: [
                    {
                        openingHours: {
                            $elemMatch: {
                                dayOfWeek: currentDayOfWeek,
                                openingTime: { $lte: currentTimeInMinutes },
                                closingTime: { $gte: currentTimeInMinutes }
                            }
                        }
                    },
                    {
                        location: {
                            $near: {
                                $geometry: {
                                    type: "Point",
                                    coordinates: [longitude, latitude] // 경도, 위도 순서
                                }
                            }
                        }
                    }
                ]
            })
            .limit(10) // 개수 10개 제한
            .exec();

        res.json({pharmacies});
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;