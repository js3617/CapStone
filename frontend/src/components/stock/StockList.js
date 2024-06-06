import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useStock from '../../hooks/useStock';

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

const StoreList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const StoreItem = styled.li`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StockList = () => {
  const { mapRef, id } = useParams();
  const { stores, loading, error } = useStock(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading stock data: {error.message}</div>;
  }

  return (
    <div>
      <MapContainer>
        <MapElement id="map" ref={mapRef} />
      </MapContainer>
      <StoreList>
        {stores && stores.map((store, index) => (
          <StoreItem key={index}>
            <div><strong>{store.storeName}</strong></div>
            <div>{store.stock} items in stock</div>
          </StoreItem>
        ))}
      </StoreList>
    </div>
  );
};

export default StockList;
