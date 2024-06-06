// client/src/Map.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MapElement = styled.div`
  width: 880px;
  height: 460px;
`;

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
          title: marker.name,
          icon: {
            url: '/images/redmarker.png',
            size: new naver.maps.Size(22, 36),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(11, 35)
        }
        });
      });
    }
  }, [markers, map]);

  return (
    <MapContainer>
      <MapElement id="map" />
    </MapContainer>
  )
};

export default API_pharmacy;