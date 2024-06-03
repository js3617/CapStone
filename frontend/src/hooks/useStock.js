import { useEffect, useRef, useState } from 'react';

const { naver } = window;

const useStock = (latitude, longitude) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (!mapRef.current) {
            console.error('Map container not found');
            return;
        }
        const mapOptions = {
            center: new naver.maps.LatLng(latitude, longitude),
            zoom: 15
        };
        const mapInstance = new naver.maps.Map(mapRef.current, mapOptions);
        setMap(mapInstance);
    }, [latitude, longitude]);

    return [map, mapRef];
};

export default useStock;
