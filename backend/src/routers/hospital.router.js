const express = require('express');
const Hospital = require('../models/hospital.model'); 
const router = express.Router();

function filterHospitals(hospitals, filters) {
    return hospitals.filter(hospital => {
        let matchesCategory = true;
        let matchesType = true;

        if (filters && filters.category) {
            if (filters.category === '야간진료') {
                matchesCategory = hospital.operatingHours.some(hour => hour.close >= 1830);
            } else if (filters.category === '공휴일진료') {
                matchesCategory = hospital.operatingHours.some(hour => hour.dayOfWeek === '공휴일');
            }
        }

        if (filters && filters.type && filters.type !== '전체') {
            matchesType = hospital.hospitalsType === filters.type;
        }

        return matchesCategory && matchesType;
    });
}

router.post('/', async (req, res) => {
    const { latitude, longitude, filters = {} } = req.body;
    
    if (!latitude || !longitude) {
        return res.status(400).json({ error: "Latitude and longitude are required." });
    }

    try {
        const hospitals = await Hospital.find({
            location: {
                $near: {
                    $geometry: { 
                        type: "Point", 
                        coordinates: [longitude, latitude]
                    },
                    
                }
            }
        });

        const filteredHospitals = filterHospitals(hospitals, filters);
        
        res.json({ hospitals: filteredHospitals });
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
