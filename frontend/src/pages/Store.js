// client/src/pages/Store.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API_store from "../hooks/NaverAPI_store";
import StoreInformation from "../components/store/StoreInformation";
import SearchComponents from "../components/search/Search";
import Category from "../components/store/Categories";
// import LongBackground from '../components/background/LongBackgroundImage';
import styled from 'styled-components';
import { ListButton } from "../styles/styled";
import useStores from '../hooks/useStores';

const StorePageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 3%;
`;

function Store() {
    const stores = useStores();
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const [categories, setCategories] = useState(['전체']);

    useEffect(() => {
        const uniqueCategories = new Set(['전체']);
        stores.forEach(store => {
            if (store.storeName.includes('CU')) uniqueCategories.add('CU');
            else if (store.storeName.includes('GS25')) uniqueCategories.add('GS25');
            else if (store.storeName.includes('세븐일레븐')) uniqueCategories.add('세븐일레븐');
            else if (store.storeName.includes('이마트24')) uniqueCategories.add('이마트24');
        });
        setCategories([...uniqueCategories]);
    }, [stores]);

    return (
        <StorePageContainer>
            {/* <LongBackground /> */}
            <SearchComponents />
            <Category
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <API_store selectedCategory={selectedCategory} />
            <StoreInformation selectedCategory={selectedCategory} />
            <Link to="/drug">
                <ListButton>의약품 목록</ListButton>
            </Link>
        </StorePageContainer>
    );
}

export default Store;
