import React from "react";
import logo from "../../images/캡스톤 어디약.png";
import medicine from "../../images/medicine.png";
import { Container } from "../../styles/styled";
import styled from "styled-components";
import Search from "../../components/search/Search";

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
  justify-content: center;
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
  return (
    <Container>
      <MainWrapper>
        <BackgroundImage src={medicine} alt="배경" />
        <MainContentWrapper>
          <LogoImage src={logo} alt="어디약?" />
          <Search/>
        </MainContentWrapper>
      </MainWrapper>
    </Container>
  );
}

export default Posts;
