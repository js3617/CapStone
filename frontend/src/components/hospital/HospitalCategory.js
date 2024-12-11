// src/components/Category.js
import React from 'react';
import styled from 'styled-components';

const CategoryList = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: space-around;
    margin-bottom: 20px;
    z-index: 100;
    gap: 10px;
`;

const CategoryItem = styled.li`
    height: 3rem;
    width: 15vh;
    cursor: pointer;
    padding: 3px 8px;
    background-color: ${props => (props.active ? '#E8E8E8' : '#1C3988')};
    color: ${props => (props.active ? '#000000' : '#ffffff')};
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    &:hover {
        background-color: #E8E8E8;
        color: #000000;
    }
`;

const HospitalCategory = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <CategoryList>
            {categories.map(category => (
                <CategoryItem
                    key={category}
                    active={category === selectedCategory}
                    onClick={() => setSelectedCategory(category)}
                >
                    {category}
                </CategoryItem>
            ))}
        </CategoryList>
    );
};

export default HospitalCategory;
