import React, { useState } from "react";
import searchIcon from "../../images/돋보기.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // React Router의 useNavigate를 import

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
`;

const Search = styled.input`
  width: 460px;
  height: 80px;
  position: relative;
  border-radius: 40px;
  border: none;
  padding-left: 20px;
  padding-right: 40px;
`;

const SearchIcon = styled.img`
  width: 49px;
  cursor: pointer;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
`;

function SearchComponents() {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const handleSearch = () => {
    // 검색한 결과를 DrugList 페이지로 전달하여 해당 약을 표시
    navigate(`/drug/search/${value}`);
    console.log(value)
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <Search value={value} onChange={onChange} onKeyDown={handleKeyDown} placeholder="약, 증상 검색..." />
      <SearchIcon src={searchIcon} alt="돋보기" onClick={handleSearch} />
    </SearchContainer>
  );
}

export default SearchComponents;
