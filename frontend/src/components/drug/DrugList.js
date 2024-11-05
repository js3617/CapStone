import React from 'react';
import styled from 'styled-components';
import { DrugContainer, Text, DrugCard, DrugImage, ImgCard, DrugWrapper } from '../../styles/Drugstyled';
import Search from '../../components/search/Search';
// import LongBackground from '../background/LongBackgroundImage';
import { useDrugDetails, DrugDetails } from './DrugDetail';

const MainWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//크기가 작아지면 약 이미지 배열이 달라지게 수정하기
const DrugList = ({ drugList }) => {
  const { selectedDrug, handleCardClick, handleCloseDetails } = useDrugDetails();

  return (
    <DrugContainer>
      {/* <LongBackground/> */}
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
