import React, { useState } from "react";
import searchIcon from "../../images/돋보기.png";
import styled from "styled-components";

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

  const onChange = (e) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };

  const handleSearch = () => {
    console.log("검색:", value);
    // 여기에 검색을 위한 로직을 추가
    // 예를 들어, 검색 API 호출 등
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
