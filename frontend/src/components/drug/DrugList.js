import React from 'react';
import styled from 'styled-components';
import { DrugContainer } from '../../styles/styled';
import Search from '../../components/search/Search';
// import Background from '../background/BackgroundImage';

const DrugWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 90%;
`;

const DrugCard = styled.div`
  background-color: #e8e8e8;
  padding: 10px;
  width: 30%;
  height: 280px;
  margin-bottom: 20px;
  border-radius: 30px;
`;

const ImgCard = styled.div`
  background-color: #FFFFFF;
  padding: 10px;
  width: 250px;
  height: 250px;
  border-radius: 20px;
`;

const DrudImage = styled.img`
  width: 180px;
  height: 120px;
  margin: auto;
  border-radius: 20px;
  display: flex;
  justify-content: center;
`

const dgName = styled.p`
  font-size: 1.5rem;
  justify-content: center;
  display: flex;
`

const DrugList = ({ drugList }) => {
  return (
    <DrugContainer>
      {/* <Background opaque={false}/> */}
      <Search />
      <b>많이 찾는 약</b>
      <DrugWrapper>
        {drugList.map((drug, index) => (
          <DrugCard key={index}>
            <ImgCard>
              <DrudImage src={drug.drugImage} alt="test" />
              <dgName>{drug.drugName}</dgName>
            </ImgCard>
          </DrugCard>
        ))}
      </DrugWrapper>
    </DrugContainer>
  );
};

export default DrugList;
