import React, { useEffect, useState } from 'react';
import apiClient from '../apiClient';
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

const API_hospital = ({ selectedCategory, selectedType }) => {
    const [markers, setMarkers] = useState([]); // 병원 데이터를 저장하는 상태
    const [map, setMap] = useState(null); // Naver Map 객체를 저장하는 상태
    const [mapMarkers, setMapMarkers] = useState([]); // Map에 표시되는 마커 객체들을 저장하는 상태

    useEffect(() => {
        // Naver Map 스크립트를 동적으로 로드
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

        // Map을 초기화하고 병원 데이터를 가져오는 함수
        const initMap = async () => {
        try {
            await loadNaverMapScript();
            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                initializeMap(latitude, longitude);
                fetchNearbyHospitals(latitude, longitude);
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

    // 주어진 위도와 경도에 따라 병원 데이터를 가져오는 함수
    const fetchNearbyHospitals = (latitude, longitude) => {
        apiClient.post('/hospital', { latitude, longitude })
        .then(response => {
            const enrichedHospitals = response.data.hospitals.map(hospital => {
                // 카테고리 결정 로직
                let category = "기본";  // 기본 카테고리 설정
                const hasNightService = hospital.operatingHours.some(hour => hour.close >= 1830);
                const hasHolidayService = hospital.operatingHours.some(hour => hour.dayOfWeek === '공휴일');
    
                if (hasNightService) category = "야간진료";
                if (hasHolidayService) category = "공휴일진료";
    
                return {
                    ...hospital,
                    type: hospital.hospitalsType,  // hospitalsType을 type으로 매핑
                    category  // 결정된 카테고리 할당
                };
            });
            setMarkers(enrichedHospitals);
        })
        .catch(error => {
            console.error('Error fetching nearby hospitals:', error);
        });
    };
    

    // 지도를 초기화하는 함수
    const initializeMap = (latitude, longitude) => {
        const mapOptions = {
        center: new window.naver.maps.LatLng(latitude, longitude),
        zoom: 15
        };
        const mapInstance = new window.naver.maps.Map('map', mapOptions);
        setMap(mapInstance);
    };

    // 지도에 표시된 모든 마커를 제거하는 함수
    const clearMarkers = () => {
        mapMarkers.forEach(marker => marker.setMap(null)); // 마커를 지도에서 제거
        setMapMarkers([]); // 상태 초기화
    };

    // 선택된 카테고리와 유형에 따라 마커를 필터링하고 지도에 추가하는 useEffect
    useEffect(() => {
        if (map && markers.length > 0) {
            // 기존에 표시된 모든 마커를 지도에서 제거
            clearMarkers();

            // 필터링 조건에 맞는 마커만 필터링
            const filteredMarkers = markers.filter(marker => {
                console.log("Checking Marker:", marker);
                const matchesCategory = selectedCategory === '전체' || marker.category === selectedCategory;
                const matchesType = selectedType === '전체' || marker.type === selectedType;
                console.log(`Category Matches: ${matchesCategory}, Type Matches: ${matchesType}, Expected Type: ${selectedType}, Marker Type: ${marker.hospitalsType}`);
                return matchesCategory && matchesType;
            });            

            // 필터링된 마커를 지도에 추가
            const newMapMarkers = filteredMarkers.map(marker => {
                const markerInstance = new window.naver.maps.Marker({
                    position: new window.naver.maps.LatLng(
                        marker.location.coordinates[1], 
                        marker.location.coordinates[0]
                    ),
                    map: map,
                    title: marker.name,
                    icon: {
                        url: '/images/redmarker.png', // 병원 마커 이미지로 교체
                        size: new window.naver.maps.Size(42, 53),
                        origin: new window.naver.maps.Point(0, 0),
                        anchor: new window.naver.maps.Point(11, 35)
                    }
                });
                
                // 커스텀 오버레이 생성
                const overlayContent = `
                    <div style="background-color: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
                        <strong>${marker.hospitalsName}</strong><br />
                        진료과목: ${marker.hospitalsType}<br />
                        위치: ${marker.hospitalsAddr}
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
                return markerInstance;
            });
            setMapMarkers(newMapMarkers); // 새로운 마커들을 상태에 저장
        }
    }, [markers, map, selectedCategory, selectedType]);

    return (
        <MapContainer>
            <MapElement id="map" />
        </MapContainer>
    );
};

export default API_hospital;
