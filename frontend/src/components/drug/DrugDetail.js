import React, { useState } from 'react';
import { DetailText, DetailBText, CloseButton, DrugDetailsWrapper } from '../../styles/Drugstyled';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Detailcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 80%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Pillbutton = styled.div`
  display: flex;
  width: 18.75rem;
  height: 5rem;
  border-radius: 100px;
  background-color: white;
  justify-content: space-evenly;
  align-items: center;
  z-index: 10;
  padding: 0 20px;
  font-size: 32px;
  font-weight: 700;
  position: absolute;
  bottom: -7rem;
  right: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Dividing = styled.div`
  background-color: #000000;
  width: 3px;
  height: 50px;
`;

const useDrugDetails = () => {
  const [selectedDrug, setSelectedDrug] = useState(null);

  const handleCardClick = (drug) => {
    setSelectedDrug(drug);
  };

  const handleCloseDetails = () => {
    setSelectedDrug(null);
  };

  return { selectedDrug, handleCardClick, handleCloseDetails };
};

// DrugDetails Component
const DrugDetails = ({ selectedDrug, onClose }) => {
  return (
    <Detailcontainer>
      <DrugDetailsWrapper>
        <CloseButton onClick={onClose}>×</CloseButton>
        <DetailBText>기본 정보</DetailBText>
        <DetailText>제품명 | {selectedDrug.drugName}</DetailText>
        <DetailText>분류 | {selectedDrug.drugCategory.join(', ')}</DetailText>
        <DetailBText>용법용량</DetailBText>
        <DetailText>{selectedDrug.drugDose}</DetailText>
        <DetailBText>주의사항</DetailBText>
        {selectedDrug.drugCaution.map((caution, index) => (
          <DetailText key={index}>{caution}</DetailText>
        ))}
        <Pillbutton>
          <Link to="/pharmacy">약국</Link>
          <Dividing />
          <Link to={`/store/stock/${selectedDrug.drugID}`}>편의점</Link>
        </Pillbutton>
      </DrugDetailsWrapper>
    </Detailcontainer>
  );
};

export { useDrugDetails, DrugDetails };
