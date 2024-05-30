import React from "react";
import { Link } from "react-router-dom";
import API_store from "../hooks/NaverAPI_store";
import StoreInformation from "../components/store/StoreInformation"
import SearchComponents from "../components/search/Search";
import LongBackground from '../components/background/LongBackgroundImage'
import styled from 'styled-components';
import { ListButton } from "../styles/styled";

const StorePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8%;
`;

function Store(){

    return(
        <StorePageContainer>
            <LongBackground/>
            <SearchComponents/>
            <API_store/>
            <StoreInformation/>
            <Link to="/drug">
                <ListButton>의약품 목록</ListButton>
            </Link>
        </StorePageContainer>
    )
}

export default Store;