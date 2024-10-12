import React, { useState } from "react";
// import searchIcon from "../../images/돋보기.png"; 이전 아이콘

import { CiSearch } from "react-icons/ci"; //새로운 돋보기 아이콘
import { FaLocationDot } from "react-icons/fa6"; //location dot 아이콘

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
  width: 35vh;
  height: 6vh;
  position: relative;
  border-radius: 5px;
  border: none;
  font-size: 1.6vh;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding-left: 10px;
  margin-right: 15px;
`;

const LocationIcon = styled(FaLocationDot)`
  margin-right: 10px;
  color: #9CA3AF;
  font-size: 2.2vh;
`;

// const SearchIcon = styled.img`
//   width: 49px;
//   cursor: pointer;
//   position: absolute;
//   right: 12px;
//   top: 50%;
//   transform: translateY(-50%);
// `; 이전 아이콘에 대한 내용

const SearchWrapper = styled.div`
  cursor: pointer;
  color: #FFFFFF;
  background-color: #2A4387;
  width: 10vh;
  height: 6vh;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  span{
    margin-left: 10px;
    font-size: 1.5vh;
  }
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
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <SearchContainer>
      <InputWrapper>
        <LocationIcon />
        <Search value={value} onChange={onChange} onKeyDown={handleKeyDown} placeholder="약, 증상 검색..." />
      </InputWrapper>
      {/* <SearchIcon src={searchIcon} alt="돋보기" onClick={handleSearch} /> 이전 아이콘에 대한 내용*/}
      <SearchWrapper onClick={handleSearch}>
        <CiSearch size={"2.5vh"} color="white" />
        <span>검색</span>
      </SearchWrapper>
    </SearchContainer>
  );
}

export default SearchComponents;
