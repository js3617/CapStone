import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import useStock from '../../hooks/useStock';
import { LocationText, Name } from '../../styles/styled';
import Spinner from '../loading/Spinner';

const StoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 840px;
    align-items: center;
    background-color: #E8E8E8;
    padding: 20px;
    border-radius: 30px 30px 0 0;
    z-index: 100;
    position: relative;
    top: -30px;
`;

const StoreList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
`;

const StoreItem = styled.li`
  border-bottom: 1px solid #FFFFFF;
  align-items: center;
  &:last-child {
      border-bottom: none;
  }
`;

const NoStoresMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: #FF0000;
  margin-top: 20px;
`;

const StockList = () => {
  const { id } = useParams();
  const { stores, loading, error } = useStock(id);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading stock data: {error.message}</div>;
  }

  return (
      <StoreContainer>
        {stores && stores.length > 0 ? (
          <StoreList>
            {stores.map((store, index) => (
              <StoreItem key={index}>
                <Name>{store.storeName}</Name>
                <LocationText>{store.storeAddr}</LocationText>
              </StoreItem>
            ))}
          </StoreList>
        ) : (
          <NoStoresMessage>재고가 남아 있지 않습니다.</NoStoresMessage>
        )}
      </StoreContainer>
  );
};

export default StockList;
