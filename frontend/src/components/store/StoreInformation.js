import React, { useState } from 'react';

import useStores from '../../hooks/useStores';

import styled from 'styled-components';
import { LocationText, Name } from '../../styles/styled';
import { GoPlus } from "react-icons/go";
//import useCategories from '../../hooks/useCategories';

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

const MoreBtn = styled.button`
    background-color: transparent;
    border: none;
    color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

const StoreInformation = ({ selectedCategory }) => {
    const [visibleCount, setVisibleCount] = useState(10);

    const stores = useStores();
    const filteredStores = selectedCategory === '전체'
        ? stores
        : stores.filter(store => store.storeName.includes(selectedCategory));

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + 10);  // 10개씩 추가로 데이터를 표시
    };

    return (
        <StoreContainer>
            <StoreList>
                {filteredStores.slice(0, visibleCount).map((store, index) => (
                    <StoreItem key={index}>
                        <Name>{store.storeName}</Name>
                        <LocationText>{store.storeAddr}</LocationText>
                    </StoreItem>
                ))}
            </StoreList>
            {visibleCount < stores.length && (
                <MoreBtn onClick={handleLoadMore}><GoPlus />더 보기</MoreBtn>  // "더 보기" 버튼 추가
            )}
        </StoreContainer>
    );
};

export default StoreInformation;