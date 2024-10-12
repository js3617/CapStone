import React from "react";
import logo from "../../images/캡스톤 어디약.png";
// import Background from "../background/BackgroundImage";
import { Container } from "../../styles/styled";
import styled from "styled-components";
import Search from "../../components/search/Search";

import ChatbotIcon from "../chatbot/ChatbotIcon";

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
  background-color: #EBEBEB;
  border-radius: 30px;
  height: 50%;
  box-shadow: 0px 15px 15px 0px #DDDDDD;
`;

const LogoImage = styled.img`
  width: 95vh;
  position: relative;
  height: 22vh;
  max-width: 100%;
  max-height: 100%;
`;

const BottomBar = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4vh;
  background-color: #1C3988;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BottomText = styled.span`
  color: #FFFFFF;
  font-size: 1.6vh;
  font-weight: lighter;
`;

function Posts() {
  return (
    <Container>
      <MainWrapper>
        {/* <Background opaque={true}/> 기존 배경 이미지 */}
        <MainContentWrapper>
          <LogoImage src={logo} alt="어디약?" />
          <Search/>
        <ChatbotIcon/>
        </MainContentWrapper>
      </MainWrapper>

      <BottomBar>
        <BottomText>@어디약?</BottomText>
      </BottomBar>
    </Container>
  );
}

export default Posts;