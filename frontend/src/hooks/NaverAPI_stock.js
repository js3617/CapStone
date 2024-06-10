// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import styled from 'styled-components';

// const MapContainer = styled.div`
//   width: 100%;
//   height: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// `;

// const MapElement = styled.div`
//   width: 880px;
//   height: 460px;
// `;

// const { naver } = window;

// const API_stock = () => {
//   const { id } = useParams();
//   console.log(id);
//   const [markers, setMarkers] = useState([]);
//   console.log(markers);
//   const [map, setMap] = useState(null);
//   console.log(map);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         initializeMap(latitude, longitude);
//         fetchNearbyStoresWithStock(latitude, longitude, id);
//       });
//     } else {
//       alert("Geolocation is not supported by this browser.");
//     }
//   }, [id]);

//   const fetchNearbyStoresWithStock = async (latitude, longitude, drugID) => {
//     try {
//       const response = await axios.post(`http://localhost:3000/store/stock/${drugID}`, { latitude, longitude });
//       setMarkers(response.data.stores);
//     } catch (error) {
//       console.error('Error fetching stores with stock:', error);
//     }
//   };

//   const initializeMap = (latitude, longitude) => {
//     const mapOptions = {
//       center: new naver.maps.LatLng(latitude, longitude),
//       zoom: 15,
//     };
//     const mapInstance = new naver.maps.Map('map', mapOptions);
//     setMap(mapInstance);
//   };

//   useEffect(() => {
//     if (map && markers.length > 0) {
//       markers.forEach(marker => {
//         new naver.maps.Marker({
//           position: new naver.maps.LatLng(marker.location.coordinates[1], marker.location.coordinates[0]),
//           map: map,
//           title: marker.storeName,
//         });
//       });
//     }
//   }, [markers, map]);

//   return (
//     <MapContainer>
//       <MapElement id="map" />
//     </MapContainer>
//   );
// };

// export default API_stock;

// client/src/Map.js
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
        console.log(latitude, longitude);
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
        new naver.maps.Marker({
          position: new naver.maps.LatLng(marker.location.coordinates[1], marker.location.coordinates[0]),
          map: map,
          title: marker.storeName,
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

export default API_stock;