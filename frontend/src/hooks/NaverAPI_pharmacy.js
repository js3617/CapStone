// client/src/Map.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const { naver } = window;

const API_pharmacy = () => {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        initializeMap(latitude, longitude);
        fetchNearbyStores(latitude, longitude);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchNearbyStores = (latitude, longitude) => {
    axios.post('http://localhost:3000/pharmacy', { latitude, longitude })
      .then(response => {
        setMarkers(response.data.pharmacies);
      })
      .catch(error => {
        console.error('Error fetching nearby pharmacies:', error);
      });
  };

  const initializeMap = (latitude, longitude) => {
    const mapOptions = {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 15
    };
    const map = new naver.maps.Map('map', mapOptions);
    setMap(map);
  };

  useEffect(() => {
    if (map && markers.length > 0) {
      markers.forEach(marker => {
        new naver.maps.Marker({
          position: new naver.maps.LatLng(marker.location.coordinates[1], marker.location.coordinates[0]),
          map: map,
          title: marker.name
        });
      });
    }
  }, [markers, map]);

  return <div id="map" style={{ width: '100%', height: '400px', marginTop: '10%' }}></div>;
};

export default API_pharmacy;