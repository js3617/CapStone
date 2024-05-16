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

const SearchResults = ({ searchResults, searchKeyword }) => {
    // 검색 키워드를 받아 해당 카테고리를 포함하는 약을 필터링하는 함수
    const filterDrugsByCategory = (drugs, keyword) => {
    console.log('drugs:', drugs);
    console.log('keyword:', keyword);
      return drugs.filter(drug => drug.drugCategory.includes(keyword));
    };
  
    // 검색 키워드를 기준으로 약을 필터링
    const filteredDrugs = filterDrugsByCategory(searchResults, searchKeyword);

  return (
    <DrugContainer>
      <Search />
      <b>검색 결과</b>
      <DrugWrapper>
        {filteredDrugs.map((drug, index) => (
          <DrugCard key={index}>
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
