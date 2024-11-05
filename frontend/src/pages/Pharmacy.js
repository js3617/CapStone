import React from 'react';
import { Link } from "react-router-dom";
import API_pharmacy from '../hooks/NaverAPI_pharmacy';
import PharmacyInformation from '../components/pharmacy/PharmacyInformation';
import SearchComponents from '../components/search/Search';
import styled from 'styled-components';
import { ListButton } from "../styles/styled";
// import LongBackground from '../components/background/LongBackgroundImage'

const PharmacyPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3%;
`;

const Pharmacy = () => {
    return (
        <PharmacyPageContainer>
            {/* <LongBackground/> */}
            <SearchComponents/>
            <API_pharmacy/>
            <PharmacyInformation />
            <Link to="/drug">
                <ListButton>의약품 목록</ListButton>
            </Link>
        </PharmacyPageContainer>
    );
};

export default Pharmacy;
