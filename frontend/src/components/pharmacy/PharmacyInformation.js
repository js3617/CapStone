// src/components/PharmacyInformation.js
import React from 'react';
import usePharmacies from '../../hooks/usePharmacies';
import { BsTelephone } from 'react-icons/bs';
import { LocationText, Name } from '../../styles/styled';
import styled from 'styled-components';

const PharmacyContainer = styled.div`
    display: flex;
    width: 840px;
    align-items: center;
    background-color: #E8E8E8;
    border-radius: 30px 30px 0 0;
    z-index:10;
`;

const PharmacyList = styled.ul`
    list-style: none;
    padding: 0;
`;

const PharmacyItem = styled.li`
    margin-bottom: 10px;
`;

const PhoneLink = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
    margin-left: 10px;
`;

const PharmacyInformation = () => {
    const pharmacies = usePharmacies();

    return (
        <PharmacyContainer>
            <PharmacyList>
                {pharmacies.map((pharmacy, index) => (
                    <PharmacyItem key={index}>
                        <div>
                            <Name>{pharmacy.dutyName}</Name>
                            <LocationText>{pharmacy.dutyAddr}</LocationText>
                        </div>
                        <PhoneLink href={`tel:${pharmacy.dutyTel1}`}>
                            <BsTelephone />
                        </PhoneLink>
                    </PharmacyItem>
                ))}
            </PharmacyList>
        </PharmacyContainer>
    );
};

export default PharmacyInformation;
