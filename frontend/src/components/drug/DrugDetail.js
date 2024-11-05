import React, { useState } from 'react';
import { DetailText, DetailBText, CloseButton, DrugDetailsWrapper } from '../../styles/Drugstyled';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { RiCloseLargeLine } from "react-icons/ri";

const Detailcontainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

const Pillbutton = styled.div`
  display: flex;
  width: 25vh;
  height: 7vh;
  border-radius: 100px;
  background-color: white;
  justify-content: space-evenly;
  align-items: center;
  z-index: 10;
  padding: 0 20px;
  font-size: 3vh;
  font-weight: 700;
  position: absolute;
  bottom: -7rem;
  right: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Dividing = styled.div`
  background-color: #000000;
  width: 0.3vh;
  height: 5vh;
`;

const useDrugDetails = () => {
  const [selectedDrug, setSelectedDrug] = useState(null);

  const handleCardClick = (drug) => {
    setSelectedDrug(drug);
    window.scrollTo(0, 0);
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
        <CloseButton onClick={onClose}><RiCloseLargeLine /></CloseButton>
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
          <Link to={`/store/stock/${selectedDrug.drugID}?drugName=${encodeURIComponent(selectedDrug.drugName)}`}>편의점</Link>
        </Pillbutton>
      </DrugDetailsWrapper>
    </Detailcontainer>
  );
};

export { useDrugDetails, DrugDetails };
