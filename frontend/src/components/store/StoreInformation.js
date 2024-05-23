import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StoreInformation = () => {
    const [stores, setStores] = useState([]);

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        try {
            // 위치 정보 가져오기
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
    
                // 위도와 경도를 사용하여 편의점 정보를 요청
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

    return (
        <div>
            <ul>
                {stores.map((store, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {store.storeName}<br />
                        <strong>Address:</strong> {store.storeAddr}<br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StoreInformation;
