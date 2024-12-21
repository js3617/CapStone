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

const API_stock = () => {
  const { id } = useParams(); // `id`는 drugID를 의미합니다.
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState(null);

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
          fetchNearbyStores(latitude, longitude, id);
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
  }, [id]);

  // 서버에서 상점 재고 정보를 가져오는 함수
  const fetchNearbyStores = (latitude, longitude, drugID) => {
    apiClient
      .post('/store/stock', { latitude, longitude, drugID })
      .then((response) => {
        setMarkers(response.data.stores);
      })
      .catch((error) => {
        console.error('Error fetching nearby stores:', error); 
      });
  };

  // 마커를 지도에 추가하는 useEffect
  useEffect(() => {
    if (map && markers.length > 0) {
      markers.forEach((marker) => {
        const markerInstance = new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(
            marker.location.coordinates[1],
            marker.location.coordinates[0]
          ),
          map: map,
          icon: {
            url: '/images/redmarker.png',
            size: new window.naver.maps.Size(42, 53),
            origin: new window.naver.maps.Point(0, 0),
            anchor: new window.naver.maps.Point(11, 35),
          },
        });

        // 커스텀 오버레이 생성
        const overlayContent = `
          <div style="background-color: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
            <strong>${marker.storeName}</strong><br />
            재고: ${marker.stock}개
          </div>
        `;
        const overlay = new window.naver.maps.InfoWindow({
          content: overlayContent,
          disableAnchor: true,
          borderWidth: 0,
        });

        // 마커에 오버레이 표시/숨김 이벤트 등록
        window.naver.maps.Event.addListener(markerInstance, 'mouseover', () => {
          overlay.open(map, markerInstance);
        });
        window.naver.maps.Event.addListener(markerInstance, 'mouseout', () => {
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
