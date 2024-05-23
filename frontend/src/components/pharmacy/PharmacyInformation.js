import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PharmacyInformation = () => {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        fetchPharmacies();
    }, []);

    const fetchPharmacies = async () => {
        try {
            // 위치 정보 가져오기
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                // 위도와 경도를 사용하여 약국 정보를 요청
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

    return (
        <div>
            <ul>
                {pharmacies.map((pharmacy, index) => (
                    <li key={index}>
                        <strong>Name:</strong> {pharmacy.dutyName}<br />
                        <strong>Address:</strong> {pharmacy.dutyAddr}<br />
                        <strong>Phone:</strong> {pharmacy.dutyTel1}<br />
                        <strong>Map:</strong> <img src={pharmacy.dutyMapimg} alt={pharmacy.dutyName} /><br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PharmacyInformation;
