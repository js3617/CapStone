import React from 'react';
import styled from 'styled-components';
import { DrugContainer, Text, DrugCard, ImgCard, DrugImage } from '../../styles/Drugstyled';
import Search from '../../components/search/Search';
import { useDrugDetails, DrugDetails } from '../drug/DrugDetail';
import LongBackground from '../background/LongBackgroundImage';

// 스타일드 컴포넌트
const DrugWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 60%;
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  z-index: 10;
`;

const SearchResults = ({ drugList }) => {
  const { selectedDrug, handleCardClick, handleCloseDetails } = useDrugDetails();

  return (
    <DrugContainer>
      <LongBackground />
      {!selectedDrug && <Search />}
      <DrugWrapper hidden={!!selectedDrug}>
        {drugList.map((drug) => (
          <DrugCard key={drug._id} onClick={() => handleCardClick(drug)}>
            <ImgCard>
              <DrugImage src={drug.drugImage} alt="drug" />
              <Text>{drug.drugName}</Text>
            </ImgCard>
          </DrugCard>
        ))}
      </DrugWrapper>
      {selectedDrug && (
        <DrugDetails selectedDrug={selectedDrug} onClose={handleCloseDetails} />
      )}
    </DrugContainer>
  );
};

export default SearchResults;
