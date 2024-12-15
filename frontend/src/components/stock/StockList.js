import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import useStock from '../../hooks/useStock';

import styled from 'styled-components';
import { LocationText, Name } from '../../styles/styled';
import Spinner from '../loading/Spinner';

import { GoPlus } from "react-icons/go";


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

const MoreBtn = styled.button`
    background-color: transparent;
    border: none;
    color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const StockList = () => {
  const { id } = useParams();
  const { stores, loading, error } = useStock(id);
  const [visibleCount, setVisibleCount] = useState(10); //약국 데이터 관리 수

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error loading stock data: {error.message}</div>;
  }

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + 10);  // 10개씩 추가로 데이터를 표시
};

  return (
      <StoreContainer>
        {stores && stores.length > 0 ? (
          <StoreList>
            {stores.slice(0, visibleCount).map((store, index) => (  // visibleCount에 따라 상점 표시
              <StoreItem key={index}>
                <Name>{store.storeName}</Name>
                <LocationText>{store.storeAddr}</LocationText>
              </StoreItem>
            ))}
          </StoreList>
        ) : (
          <NoStoresMessage>재고가 남아 있지 않습니다.</NoStoresMessage>
        )}
        {visibleCount < stores.length && (
            <MoreBtn onClick={handleLoadMore}><GoPlus />더 보기</MoreBtn>  // "더 보기" 버튼 추가
        )}
      </StoreContainer>
  );
};

export default StockList;
