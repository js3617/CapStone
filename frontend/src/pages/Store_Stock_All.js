import React from "react";
import { Link, useLocation } from "react-router-dom";
import NaverAPI_Stock_Stores from "../hooks/NaverAPI_Stock_Stores";
import Stock_StoresList from "../components/stock_stores/Stock_StoresList"
import SearchComponents from "../components/search/Search";
// import LongBackground from '../components/background/LongBackgroundImage'
import styled from 'styled-components';
import { ListButton } from "../styles/styled";

const StockPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3%;
`;

// const DrugItem = styled.li`
//     height: 50px;
//     width: 185px;
//     padding: 3px 8px;
//     background-color: #E8E8E8;
//     color: #000000;
//     border-radius: 100px;
//     display: flex;
//     align-items: center;
//     position: relative;
//     box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//     justify-content: center;
//     margin-bottom: 15px;
// `;

function Store_Stock_All(){

    const { search } = useLocation();
    const query = new URLSearchParams(search);
    // const drugName = query.get("drugName");

    return(
        <StockPageContainer>
            {/* <LongBackground/> */}
            <SearchComponents/>
            <NaverAPI_Stock_Stores/>
            <Stock_StoresList/>
            <Link to="/drug">
                <ListButton>의약품 목록</ListButton>
            </Link>
        </StockPageContainer>
    )
}

export default Store_Stock_All;