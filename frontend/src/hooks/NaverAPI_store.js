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

const API_store = ({selectedCategory}) => {
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);
  const [mapMarkers, setMapMarkers] = useState([]);

  useEffect(() => {
    // Naver Maps API 스크립트가 로드되었는지 확인하는 함수
    const loadNaverMapsScript = () => {
      return new Promise((resolve) => {
        if (window.naver && window.naver.maps) {
          resolve();
        } else {
          const script = document.createElement('script');
          script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.REACT_APP_NCP_CLIENT_ID}`;
          script.async = true;
          script.onload = () => resolve();
          document.head.appendChild(script);
        }
      });
    };

    // 지도를 초기화하고 마커를 로드하는 함수
    const initialize = async () => {
      await loadNaverMapsScript(); // 스크립트 로드 대기
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          initializeMap(latitude, longitude);
          fetchNearbyStores(latitude, longitude);
        });
      } else {
        alert('Geolocation is not supported by this browser.');
      }
    };

    // 지도 초기화 함수
    const initializeMap = (latitude, longitude) => {
      const mapOptions = {
        center: new window.naver.maps.LatLng(latitude, longitude),
        zoom: 15,
      };
      const map = new window.naver.maps.Map('map', mapOptions);
      setMap(map);
    };

    initialize(); // 지도와 스크립트 초기화 실행
  }, []);

  // 서버에서 상점 정보를 가져오는 함수
  const fetchNearbyStores = (latitude, longitude) => {
    axios
      .post('http://localhost:3000/store', { latitude, longitude })
      .then((response) => {
        setMarkers(response.data.stores);
      })
      .catch((error) => {
        console.error('Error fetching nearby stores:', error);
      });
  };

  const clearMarkers = () => {
    mapMarkers.forEach(marker => marker.setMap(null)); // 마커를 지도에서 제거
    setMapMarkers([]); // 상태 초기화
  };

  // 마커를 지도에 추가하는 useEffect
  useEffect(() => {
    if (map && markers.length > 0) {
      clearMarkers();
      
      const filteredMarkers = markers.filter((marker) => {
        if (selectedCategory === '전체') return true;
        if (selectedCategory === '씨유' && marker.storeName.includes('씨유')) return true;
        if (selectedCategory === 'GS25' && marker.storeName.includes('GS25')) return true;
        if (selectedCategory === '이마트24' && marker.storeName.includes('이마트24')) return true;
        return false;
      });

      const newMapMarkers = filteredMarkers.map((marker) => {
        const newMarker = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            marker.location.coordinates[1],
            marker.location.coordinates[0]
          ),
          map: map,
          title: marker.storeName,
          icon: {
            url: '/images/redmarker.png', // 원하는 마커 이미지 경로
            size: new window.naver.maps.Size(42, 53),
            origin: new window.naver.maps.Point(0, 0),
            anchor: new window.naver.maps.Point(11, 35),
          },
        });
        return newMarker;
      });

      setMapMarkers(newMapMarkers); // 새로운 마커들을 상태에 저장
    }
  }, [markers, map, selectedCategory]);

  return (
    <MapContainer>
      <MapElement id="map" />
    </MapContainer>
  );
};

export default API_store;
