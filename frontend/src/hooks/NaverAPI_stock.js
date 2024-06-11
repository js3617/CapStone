import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

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

const API_stock = () => {
  const { id } = useParams(); // `id`는 drugID를 의미합니다.
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        initializeMap(latitude, longitude);
        fetchNearbyStores(latitude, longitude, id);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, [id]);

  const fetchNearbyStores = (latitude, longitude, drugID) => {
    axios.post(`http://localhost:3000/store/stock`, { latitude, longitude, drugID })
      .then(response => {
        setMarkers(response.data.stores);
      })
      .catch(error => {
        console.error('Error fetching nearby stores:', error);
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
        const markerInstance = new naver.maps.Marker({
          position: new naver.maps.LatLng(marker.location.coordinates[1], marker.location.coordinates[0]),
          map: map,
          icon: {
            url: '/images/redmarker.png',
            size: new naver.maps.Size(42, 53),
            origin: new naver.maps.Point(0, 0),
            anchor: new naver.maps.Point(11, 35)
          }
        });

        // Create a custom overlay
        const overlayContent = `
          <div style="background-color: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
            <strong>${marker.storeName}</strong><br />
            재고: ${marker.stock}개
          </div>
        `;
        const overlay = new naver.maps.InfoWindow({
          content: overlayContent,
          disableAnchor: true,
          borderWidth: 0
        });

        // Show overlay on hover
        naver.maps.Event.addListener(markerInstance, 'mouseover', () => {
          overlay.open(map, markerInstance);
        });

        // Hide overlay when not hovering
        naver.maps.Event.addListener(markerInstance, 'mouseout', () => {
          overlay.close();
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
