import { useEffect, useState } from 'react';
import apiClient from '../apiClient';

const useStock_Stores = (drugID) => {
    const [stores, setStores] = useState([]);
    const [pharmacies, setPharmacies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStoresAndPharmacies = async (latitude, longitude) => {
            try {
                const [storeResponse, pharmacyResponse] = await Promise.all([
                    apiClient.post('/store', { latitude, longitude }),
                    apiClient.post('/pharmacy', { latitude, longitude })
                ]);

                setStores(storeResponse.data.stores);
                setPharmacies(pharmacyResponse.data.pharmacies);
            } catch (error) {
                console.error('Error fetching stores and pharmacies:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchStoresAndPharmacies(latitude, longitude);
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                    setError(error);
                    setLoading(false);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            setLoading(false);
        }
    }, []);

    return { stores, pharmacies, loading, error };
};

export default useStock_Stores;
