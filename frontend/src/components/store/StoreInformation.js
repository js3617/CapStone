// src/components/StoreInformation.js
import React from 'react';
import useStores from '../../hooks/useStores';
import styled from 'styled-components';
import { LocationText, Name } from '../../styles/styled';

const StoreContainer = styled.div`
    display: flex;
    width: 840px;
    align-items: center;
    background-color: #E8E8E8;
    padding: 20px;
    border-radius: 30px 30px 0 0;
    z-index:10;
`;

const StoreList = styled.ul`
    list-style: none;
    padding: 0;
`;

const StoreItem = styled.li`
    margin-bottom: 10px;
`;

const StoreInformation = () => {
    const stores = useStores();

    return (
        <StoreContainer>
            <StoreList>
                {stores.map((store, index) => (
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
