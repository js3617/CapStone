// src/hooks/useHospitals.js
import { useState, useEffect } from 'react';
import apiClient from '../apiClient';

const useHospitals = () => {
    const [hospitals, setHospitals] = useState([]);

    useEffect(() => {
        const fetchHospitals = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;

                    const response = await apiClient.post('/hospital', {
                        latitude,
                        longitude
                    });
                    console.log(response.data.hospitals);
                    console.log(response.data);
                    setHospitals(response.data.hospitals);
                }, (error) => {
                    console.error('Geolocation error:', error);
                }, {
                    enableHighAccuracy: true // 위치 정확도 향상을 위해 활성화
                });
            } catch (error) {
                console.error('Error fetching hospitals:', error);
            }
        };

        fetchHospitals();
    }, []);

    return hospitals;
};

export default useHospitals;
