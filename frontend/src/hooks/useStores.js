// src/hooks/useStores.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useStores = () => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        const fetchStores = async () => {
            try {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;

                    const response = await axios.post('http://localhost:3000/store', {
                        latitude,
                        longitude
                    });
                    setStores(response.data.stores);
                });
            } catch (error) {
                console.error('Error fetching stores:', error);
            }
        };

        fetchStores();
    }, []);

    return stores;
};

export default useStores;
