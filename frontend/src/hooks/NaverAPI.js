import React, { useEffect, useState } from 'react';
import { Container as MapDiv, NaverMap, Marker } from 'react-naver-maps';

function API() {
  const [currentPosition, setCurrentPosition] = useState(null);
  //현재위치 저장, 해당 상태를 업데이트
  const [error, setError] = useState(null);
  //위치를 가져오는 상황에서의 오류 저장, 해당 오류 설정


  //현재 위치를 가져옴
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        //메서드를 사용하여 브라우저의 Geolocation API를 통해 현재 위치를 가져옴
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
          console.log(position)
          //position 객체를 받아와서 latitude와 longitude 값을 추출한 후 
          //setCurrentPosition을 호출하여 currentPosition 상태 업데이트
        },
        (error) => {
          setError('Error getting current position: ' + error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  return (
    <MapDiv
      style={{
        width:"100%",
        height: '600px',
      }}
    >
      {error && <div>{error}</div>}
      {/* 오류 발생시 오류 문구 띄움 */}
      {currentPosition && (
        <NaverMap
          defaultCenter={currentPosition}
          center={currentPosition}
          defaultZoom={15}
        >
          <Marker position={currentPosition} />
        </NaverMap>
      )}
    </MapDiv>
  );
}

export default API;
