import React from "react";
import medicine from "../../images/medicine.png";
import styled from "styled-components";


const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80%;
  margin-top: 10%;
  object-fit: fill;
`;

function Background() {
  return (
    <BackgroundImage src={medicine} alt="배경" />
  );
}

export default Background;