import React from 'react';
import { DrugContainer, Text, DrugCard, ImgCard, DrugImage, DrugWrapper } from '../../styles/Drugstyled';
import Search from '../../components/search/Search';
import { useDrugDetails, DrugDetails } from '../drug/DrugDetail';
import LongBackground from '../background/LongBackgroundImage';


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
