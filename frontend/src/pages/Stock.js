import React from "react";
import { Link } from "react-router-dom";
import API_stock from "../hooks/NaverAPI_stock";
import StockList from "../components/stock/StockList"
import SearchComponents from "../components/search/Search";
import LongBackground from '../components/background/LongBackgroundImage'
import styled from 'styled-components';
import { ListButton } from "../styles/styled";

const StockPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8%;
`;

function Stock(){

    return(
        <StockPageContainer>
            <LongBackground/>
            <SearchComponents/>
            <API_stock/>
            <StockList/>
            <Link to="/drug">
                <ListButton>의약품 목록</ListButton>
            </Link>
        </StockPageContainer>
    )
}

export default Stock;