const 
    express = require('express'),
    Pharmacy = require('../models/pharmacy.model'), 
    router = express.Router();

router.get('/:location', async (req, res, next) => {
// router.get('/', async (req, res, next) => {
    // const { lat, lng } = req.body;
    const
        loc = req.params.location.split(','),
        lat = parseFloat(loc[0]),
        lng = parseFloat(loc[1]),
        currentTime = new Date(),
        dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"],
        currentDayOfWeek = dayOfWeek[currentTime.getDay()],
        currentHour = currentTime.getHours(),
        currentMinute = currentTime.getMinutes(),
        currentTimeInMinutes = currentHour * 60 + currentMinute;
    
    if (isNaN(lat) || isNaN(lng)) {
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
                                    coordinates: [lng, lat] // 경도, 위도 순서
                                }
                            }
                        }
                    }
                ]
            })
            .limit(10) // 개수 10개 제한
            .exec();
        
        res.json(pharmacies);
    } catch (error) {
        console.error(error);
        next(error);
    }
});

module.exports = router;