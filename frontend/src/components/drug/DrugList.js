import React from 'react';
import styled from 'styled-components';
import { DrugContainer, Text, DrugCard, DrugImage, ImgCard, DrugWrapper } from '../../styles/Drugstyled';
import Search from '../../components/search/Search';
import LongBackground from '../background/LongBackgroundImage';
import { useDrugDetails, DrugDetails } from './DrugDetail';

// Styled components
const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const DrugList = ({ drugList }) => {
  const { selectedDrug, handleCardClick, handleCloseDetails } = useDrugDetails();

  return (
    <DrugContainer>
      <LongBackground/>
      <MainWrapper>
      {!selectedDrug && <Search />}
        <DrugWrapper hidden={!!selectedDrug}>
          {drugList.map((drug, index) => (
            <DrugCard key={index} onClick={() => handleCardClick(drug)}>
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
      </MainWrapper>
    </DrugContainer>
  );
};

export default DrugList;
