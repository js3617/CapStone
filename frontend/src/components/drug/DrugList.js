import React from 'react';
import styled from 'styled-components';
import { Container } from '../../styles/styled';
import Search from '../../components/search/Search';
import Background from '../background/BackgroundImage';

const DrugWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
`;

const DrugCard = styled.div`
  background-color: #e8e8e8;
  padding: 20px;
  width: calc(33.3333% - 20px);
  margin-bottom: 20px;
  border-radius: 30px;
`;

const DrudImage = styled.img`
  width: 300px;
  height: 300px;
`

const DrugList = ({ drugList }) => {
  return (
    <Container>
      <Background />
      <Search />
      <b>많이 찾는 약</b>
      <DrugWrapper>
        {drugList.map((drug, index) => (
          <DrugCard key={index}>
            <DrudImage src={drug.drugImage} alt="test" />
            <p>{drug.drugName}</p>
          </DrugCard>
        ))}
      </DrugWrapper>
    </Container>
  );
};

export default DrugList;
