import React from "react";
import styled from "styled-components";
import BackgroundImage from "../../images/longbackground.png"

const LongBackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  margin-top: 10%;
  object-fit: fill;
`;

function longBackground() {
    return (
      <LongBackgroundImage src={BackgroundImage} alt="배경" />
    );
  }

  export default longBackground;