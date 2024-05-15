import React from 'react';
import { Container } from "../../styles/styled";
import Search from "../../components/search/Search";

// DrugList 컴포넌트는 drugList라는 props를 받아와서 약품 목록을 화면에 표시
const DrugList = ({ drugList }) => {
    console.log(drugList);
  return (
    <Container>
      <Search/>
      <b>많이 찾는 약</b>
      {drugList.map((drug, index) => (
        <div key={index}>
          <h2>{drug.drugName}</h2>
          <p><strong>약품 카테고리:</strong> {drug.drugCategory.join(', ')}</p>
          <p><strong>복약 방법:</strong> {drug.drugDose}</p>
          <p><strong>주의사항:</strong></p>
          <ul>
            {drug.drugCaution.map((caution, idx) => (
              <li key={idx}>{caution}</li>
            ))}
          </ul>
        </div>
      ))}
    </Container>
  );
};

export default DrugList;
