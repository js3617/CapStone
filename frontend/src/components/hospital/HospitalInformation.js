import React from 'react';
import useHospitals from '../../hooks/useHospitals'; // 병원 정보를 불러오는 훅
import { BsTelephone } from 'react-icons/bs';
import { LocationText, Name } from '../../styles/styled';
import styled from 'styled-components';

const HospitalContainer = styled.div`
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

const HospitalList = styled.ul`
    list-style: none;
    padding: 0;
    width: 100%;
`;

const HospitalItem = styled.li`
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

const NoHospitalsMessage = styled.div`
    text-align: center;
    font-size: 18px;
    color: #FF0000;
    margin-top: 20px;
`;

const HospitalInformation = () => {
    const hospitals = useHospitals(); // 병원 데이터를 불러옴
    console.log(hospitals);

    return (
        <HospitalContainer>
            {hospitals.length > 0 ? (
                <HospitalList>
                    {hospitals.map((hospital, index) => (
                        <HospitalItem key={index}>
                            <div>
                                <Name>{hospital.name}</Name>
                                <LocationText>{hospital.address}</LocationText>
                            </div>
                            <PhoneLink href={`tel:${hospital.phone}`}>
                                <BsTelephone />
                            </PhoneLink>
                        </HospitalItem>
                    ))}
                </HospitalList>
            ) : (
                <NoHospitalsMessage>현재 사용 가능한 병원 정보가 없습니다.</NoHospitalsMessage>
            )}
        </HospitalContainer>
    );
};

export default HospitalInformation;
