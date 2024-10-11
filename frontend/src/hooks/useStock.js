import { useEffect, useRef, useState } from 'react';
import apiClient from '../apiClient';

const { naver } = window;

const useStock = (drugID) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeMap = (latitude, longitude) => {
      if (!mapRef.current) {
        console.error('Map container not found');
        return;
      }
      const mapOptions = {
        center: new naver.maps.LatLng(latitude, longitude),
        zoom: 15,
      };
      const mapInstance = new naver.maps.Map(mapRef.current, mapOptions);
      setMap(mapInstance);
    };

    const fetchStockData = async (latitude, longitude, drugID) => {
      try {
        const response = await apiClient.post(`/store/stock`, {
          latitude,
          longitude,
          drugID,
        });
        setStores(response.data.stores);
        if (map) {
          response.data.stores.forEach(store => {
            new naver.maps.Marker({
              position: new naver.maps.LatLng(store.location.coordinates[1], store.location.coordinates[0]),
              map: map,
              title: store.storeName,
            });
          });
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        initializeMap(latitude, longitude);
        fetchStockData(latitude, longitude, drugID);
      }, (error) => {
        console.error('Error getting geolocation:', error);
        setError(error);
        setLoading(false);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, [drugID]);

  useEffect(() => {
    if (map && stores.length > 0) {
      stores.forEach(store => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(store.location.coordinates[1], store.location.coordinates[0]),
          map: map,
          title: store.storeName,
        });
      });
    }
  }, [map, stores]);

  return { map, mapRef, stores, loading, error };
};

export default useStock;