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

const HospitalInformation = ({ selectedCategory, selectedType, hospitals }) => {
    const filteredHospitals = hospitals.filter(hospital => {
        const matchesType = selectedType === '전체' || hospital.hospitalsType === selectedType;
        const matchesCategory = selectedCategory === '전체' || (selectedCategory === '야간진료' && hospital.operatingHours.some(hour => hour.close >= 1800)) || (selectedCategory === '공휴일진료' && hospital.operatingHours.some(hour => hour.dayOfWeek === '공휴일'));
        return matchesType && matchesCategory;
    });

    return (
        <HospitalContainer>
            {filteredHospitals.length > 0 ? (
                <HospitalList>
                    {filteredHospitals.map((hospital, index) => (
                        <HospitalItem key={index}>
                            <div>
                                <Name>{hospital.hospitalsName}</Name>
                                <LocationText>{hospital.hospitalsAddr}</LocationText>
                            </div>
                            <PhoneLink href={`tel:${hospital.hospitalsTel1}`}>
                                <BsTelephone />
                            </PhoneLink>
                        </HospitalItem>
                    ))}
                </HospitalList>
            ) : (
                <NoHospitalsMessage>조건에 맞는 병원 정보가 없습니다.</NoHospitalsMessage>
            )}
        </HospitalContainer>
    );
};

export default HospitalInformation;
