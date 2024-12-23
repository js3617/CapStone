import React from 'react';
import usePharmacies from '../../hooks/usePharmacies';
import { BsTelephone } from 'react-icons/bs';
import { LocationText, Name } from '../../styles/styled';
import styled from 'styled-components';

import Spinner from '../loading/Spinner';

const PharmacyContainer = styled.div`
    display: flex;
    flex-direction: column; /* Stack items vertically */
    width: 840px;
    align-items: center;
    background-color: #E8E8E8;
    padding: 20px;
    border-radius: 30px 30px 0 0;
    z-index: 100;
    position: relative;
    top: -30px;
`;

const PharmacyList = styled.ul`
    list-style: none;
    padding: 0;
    width: 100%;
`;

const PharmacyItem = styled.li`
    border-bottom: 1px solid #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:last-child {
        border-bottom: none; // 마지막 항목에는 구분선 없음
    }
`;

const PhoneLink = styled.a`
    display: flex;
    align-items: center;
    text-decoration: none;
`;

const NoPharmaciesMessage = styled.div`
    text-align: center;
    font-size: 18px;
    color: #FF0000;
    margin-top: 20px;
`;

const PharmacyInformation = () => {
    // const { pharmacies, loading, error } = usePharmacies();
    const pharmacies = usePharmacies();

    // if (loading) return <Spinner />;
    // if (error) return <p>Error loading pharmacies: {error.message}</p>;
    // if (pharmacies.length === 0) return <NoPharmaciesMessage>약국 정보를 찾을 수 없습니다.</NoPharmaciesMessage>;

    return (
        <PharmacyContainer>
            {pharmacies.length > 0 ? (
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
            ) : (
                <NoPharmaciesMessage>잠시만 기다려주세요.</NoPharmaciesMessage>
            )}
        </PharmacyContainer>
    );
};

export default PharmacyInformation;
