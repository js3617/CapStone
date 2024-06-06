import React from 'react';
import styled from 'styled-components';
import { LocationText, Name } from '../../styles/styled';
import useStores from '../../hooks/useStores';
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

const StoreInformation = ({ selectedCategory }) => {
    const stores = useStores();
    const filteredStores = selectedCategory === '전체'
        ? stores
        : stores.filter(store => store.storeName.includes(selectedCategory));

    return (
        <StoreContainer>
            <StoreList>
                {filteredStores.map((store, index) => (
                    <StoreItem key={index}>
                        <Name>{store.storeName}</Name>
                        <LocationText>{store.storeAddr}</LocationText>
                    </StoreItem>
                ))}
            </StoreList>
        </StoreContainer>
    );
};

export default StoreInformation;
