import React from 'react';
import styled from 'styled-components';
import { DrugContainer, Text } from '../../styles/styled';
import Search from '../../components/search/Search';

const DrugWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
`;

const DrugCard = styled.div`
  background-color: #e8e8e8;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 30px;
  flex: 1;
  margin-right: 10px;
`;

const ImgCard = styled.div`
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 20px;
`;

const DrudImage = styled.img`
  width: 180px;
  height: 120px;
  margin: auto;
  border-radius: 20px;
  display: flex;
  justify-content: center;
`;

const SearchResults = ({ drugList }) => {
  return (
    <DrugContainer>
      <Search />
      <b>검색 결과</b>
      <DrugWrapper>
        {drugList.map((drug) => (
          <DrugCard key={drug._id}>
            <ImgCard>
              <DrudImage src={drug.drugImage} alt="test" />
              <Text>{drug.drugName}</Text>
            </ImgCard>
          </DrugCard>
        ))}
      </DrugWrapper>
    </DrugContainer>
  );
};

export default SearchResults;
