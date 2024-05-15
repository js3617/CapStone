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
        currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    if (isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Invalid location data" });
    }

    try {
        const pharmacies = await Pharmacy.find({
            $and: [
                    {
                        // 현재 요일에 영업 중인지 확인합니다.
                        'openingHours.dayOfWeek': currentDayOfWeek,
                        'openingHours.openingTime': { $lte: currentTimeInMinutes },
                        'openingHours.closingTime': { $gte: currentTimeInMinutes }
                    },
                    {
                        // 해당 좌표에서 가까운 순으로 정렬
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