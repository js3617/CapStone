import React, { useState } from "react";
import logo from "../../images/캡스톤 어디약.png";
import medicine from "../../images/medicine.png";
import search from "../../images/돋보기.png";
import { Container } from "../../styles/styled";
import styled from "styled-components";

const MainWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15%;
`;

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

const LogoImage = styled.img`
  width: 884px;
  position: relative;
  height: 260px;
  max-width: 100%;
  max-height: 100%;
`;

const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  margin-top: 10%;
`;

function Posts() {
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

  return (
    <Container>
      <MainWrapper>
        <BackgroundImage src={medicine} alt="배경" />
        <MainContentWrapper>
          <LogoImage src={logo} alt="어디약?" />
          <SearchContainer>
            <Search value={value} onChange={onChange} placeholder="약, 증상 검색..." />
            <SearchIcon src={search} alt="돋보기" onClick={handleSearch} />
          </SearchContainer>
        </MainContentWrapper>
      </MainWrapper>
    </Container>
  );
}

export default Posts;
