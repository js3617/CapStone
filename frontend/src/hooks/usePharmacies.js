// src/hooks/usePharmacies.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const usePharmacies = () => {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        const fetchPharmacies = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;

                    const response = await axios.post('http://localhost:3000/pharmacy', {
                        latitude,
                        longitude
                    });
                    setPharmacies(response.data.pharmacies);
                });
            } catch (error) {
                console.error('Error fetching pharmacies:', error);
            }
        };

        fetchPharmacies();
    }, []);

    return pharmacies;
};

export default usePharmacies;
