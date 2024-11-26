import React from 'react';
import { Link } from "react-router-dom";
import API_hospital from '../hooks/NaverAPI_hospital';
import HospitalInformation from '../components/hospital/HospitalInformation';
import SearchComponents from '../components/search/Search';
import styled from 'styled-components';
import { ListButton } from "../styles/styled";
// import LongBackground from '../components/background/LongBackgroundImage'

const HospitalPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3%;
`;

const Hospital = () => {
    return (
        <HospitalPageContainer>
            {/* <LongBackground/> */}
            <SearchComponents/>
            <API_hospital/>
            <HospitalInformation />
            <Link to="/drug">
                <ListButton>의약품 목록</ListButton>
            </Link>
        </HospitalPageContainer>
    );
};

export default Hospital;
