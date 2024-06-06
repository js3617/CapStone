import { useState, useEffect, useRef } from 'react';
import axios from 'axios';


const useStock = (drugID) => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchStores = async () => {
      setLoading(true);
      try {
        const { coords } = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = coords;

        const response = await axios.post('http://localhost:3000/store/stock', {
          latitude,
          longitude,
          drugID,
        });

        setStores(response.data.stores);
        setLoading(false);

      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (drugID) {
      fetchStores();
    }
  }, [drugID]);

  return { mapRef, stores, loading, error };
};

export default useStock;