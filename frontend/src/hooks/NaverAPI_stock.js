import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const { naver } = window;

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

const API_stock = () => {
  const { id } = useParams();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        initializeMap(latitude, longitude);
        fetchNearbyStoresWithStock(latitude, longitude, id);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [id]);

  const fetchNearbyStoresWithStock = (latitude, longitude, drugID) => {
    axios.post('http://localhost:3000/store/stock', { latitude, longitude, drugID })
      .then(response => {
        setMarkers(response.data.stores);
      })
      .catch(error => {
        console.error('Error fetching stores with stock:', error);
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
          title: marker.storeName
        });
      });
    }
  }, [markers, map]);

  return (
    <MapContainer>
      <MapElement id="map" />
    </MapContainer>
  );
};

export default API_stock;
