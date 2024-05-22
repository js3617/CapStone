import React, { useState } from 'react';
import { DetailText, DetailBText, CloseButton, DrugDetailsWrapper } from '../../styles/Drugstyled';
import { Link } from 'react-router-dom';

// Custom Hook
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

      <Link to="/pharmacy">
        <button>약국</button>
      </Link>

      <Link to="/store">
        <button>편의점</button>
      </Link>
    </DrugDetailsWrapper>
  );
};

export { useDrugDetails, DrugDetails };
