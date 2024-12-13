import React, { useEffect, useState } from 'react';
import apiClient from '../apiClient';
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

const NaverAPI_Stock_Stores = ({ selectedCategory }) => {
  const { id } = useParams(); // `id`는 drugID를 의미합니다.
  const [pharmacyMarkers, setPharmacyMarkers] = useState([]); // 약국 데이터 추가
  const [map, setMap] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);
  const [storeMarkers, setStoreMarkers] = useState([]);

  useEffect(() => {
    const loadNaverMapScript = () => {
      return new Promise((resolve, reject) => {
        if (window.naver && window.naver.maps) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;
          script.async = true;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error("Naver Map Script failed to load"));
          document.head.appendChild(script);
        }
      });
    };

    const initMap = async () => {
      try {
        await loadNaverMapScript();
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            initializeMap(latitude, longitude);
            fetchNearbyPharmacies(latitude, longitude);
            fetchNearbyStores(latitude, longitude);
          });
        } else {
          alert("Geolocation is not supported by this browser.");
        }
      } catch (error) {
        console.error("Error loading Naver Maps:", error);
      }
    };

    initMap();
  }, []);

  const fetchNearbyPharmacies = (latitude, longitude) => {
    apiClient.post('/pharmacy', { latitude, longitude })
      .then(response => {
        setPharmacyMarkers(response.data.pharmacies);
      })
      .catch(error => {
        console.error('Error fetching nearby pharmacies:', error);
      });
  };

  const fetchNearbyStores = (latitude, longitude) => {
    apiClient.post('/store', { latitude, longitude })
      .then(response => {
        setStoreMarkers(response.data.stores);
      })
      .catch(error => {
        console.error('Error fetching nearby stores:', error);
      });
  };

  const initializeMap = (latitude, longitude) => {
    const mapOptions = {
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 15
    };
    const mapInstance = new window.naver.maps.Map('map', mapOptions);
    setMap(mapInstance);
  };

  useEffect(() => {
    if (map && (pharmacyMarkers.length > 0 || storeMarkers.length > 0)) {
      // 지도에 표시된 모든 마커를 초기화
      // mapMarkers.forEach(marker => marker.setMap(null));

      // 약국 마커 추가
      const pharmacyMapMarkers = pharmacyMarkers.map(marker => {
        return new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(marker.location.coordinates[1], marker.location.coordinates[0]),
          map: map,
          title: marker.name,
          icon: {
            url: '/images/redmarker.png',
            size: new window.naver.maps.Size(42, 53),
            origin: new window.naver.maps.Point(0, 0),
            anchor: new window.naver.maps.Point(11, 35),
          },
        });
      });

      // 편의점 마커 추가
      const storeMapMarkers = storeMarkers.map(marker => {
        return new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(marker.location.coordinates[1], marker.location.coordinates[0]),
          map: map,
          title: marker.storeName,
          icon: {
            url: '/images/redmarker.png',
            size: new window.naver.maps.Size(42, 53),
            origin: new window.naver.maps.Point(0, 0),
            anchor: new window.naver.maps.Point(11, 35),
          },
        });
      });
      console.log(storeMapMarkers);
      // 새로 추가된 모든 마커 상태에 저장
      setMapMarkers([...pharmacyMapMarkers, ...storeMapMarkers]);
      console.log(mapMarkers);
    }
  }, [pharmacyMarkers, storeMarkers, map]);
  console.log(storeMarkers);
  


  return (
    <MapContainer>
      <MapElement id="map" />
    </MapContainer>
  );
};

export default NaverAPI_Stock_Stores;