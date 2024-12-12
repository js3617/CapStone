// src/components/Category.js
import React from 'react';
import styled from 'styled-components';
import CUImage from '../../images/CU.png';
import GS25Image from '../../images/GS25.png';
import Emart24Image from '../../images/Emart24.png';
import Eleven7Image from '../../images/7Eleven.png';

const CategoryList = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    width: 65%;
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
    position: relative;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    &:hover {
        background-color: #E8E8E8;
    }
`;

const CategoryImage = styled.img`
    width: 39px;
    height: 39px;
    margin-right: 8px;
    position: absolute;
`;

const CategoryText = styled.span`
    flex: 1;
    text-align: center;
    font-size: 1rem;
`;

const Category = ({ categories, selectedCategory, setSelectedCategory }) => {
    const getCategoryImage = (category) => {
        switch (category) {
            case 'CU':
                return CUImage;
            case 'GS25':
                return GS25Image;
            case '세븐일레븐':
                return Eleven7Image;
            case '이마트24':
                return Emart24Image
            default:
                return null;
        }
    };

    return (
        <CategoryList>
            {categories.map(category => (
                <CategoryItem
                    key={category}
                    active={category === selectedCategory}
                    onClick={() => setSelectedCategory(category)}
                >
                    {getCategoryImage(category) && (
                        <CategoryImage src={getCategoryImage(category)} alt={category} />
                    )}
                    <CategoryText>{category}</CategoryText>
                </CategoryItem>
            ))}
        </CategoryList>
    );
};

export default Category;
