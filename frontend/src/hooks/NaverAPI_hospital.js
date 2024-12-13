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
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState(null);
    const [mapMarkers, setMapMarkers] = useState([]);

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

    const fetchNearbyHospitals = (latitude, longitude) => {
        apiClient.post('/hospital', { latitude, longitude })
        .then(response => {
            setMarkers(response.data.hospitals);
        })
        .catch(error => {
            console.error('Error fetching nearby hospitals:', error);
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
        if (map && markers.length > 0) {
            // 기존에 표시된 모든 마커를 지도에서 제거
            mapMarkers.forEach(marker => marker.setMap(null));

            //수정 필요
            const filteredMarkers = markers.filter(marker =>
                (selectedCategory === '전체' || marker.category === selectedCategory) &&
                (selectedType === '전체' || marker.type === selectedType)
            );

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
            setMapMarkers(newMapMarkers);
        }
    }, [markers, map, selectedCategory, selectedType]);

    return (
        <MapContainer>
            <MapElement id="map" />
        </MapContainer>
    );
};

export default API_hospital;
