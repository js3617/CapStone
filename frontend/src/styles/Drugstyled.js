import styled from "styled-components";

const Text = styled.p`
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
`;

const DetailText = styled.p`
    font-size: 1.2rem;
    display: flex;
    text-align: left;
    line-height: 2;
`;

const DetailBText = styled.b`
    font-size: 1.2rem;
    display: flex;
    text-align: left;
`;

const DrugWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: center;
  width: 800px;
  visibility: ${props => (props.hidden ? 'hidden' : 'visible')};
  z-index: 10;
`;

const DrugContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 8%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 180px);
`;

const DrugDetailsWrapper = styled.div`
  background-color: #FFFFFF;
  padding: 40px;
  border-radius: 30px;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%);
  width: 1054px;
  z-index: 10;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background-color: #FFFFFF;
  color: #000000;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
`;

const DrugCard = styled.div`
  background-color: #e8e8e8;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 30px;
  flex: 1;
  margin-right: 10px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImgCard = styled.div`
  background-color: #FFFFFF;
  padding: 10px;
  border-radius: 20px;
`;

const DrugImage = styled.img`
  width: 180px;
  height: 120px;
  margin: auto;
  border-radius: 20px;
  display: flex;
  justify-content: center;
`;

export {
    DrugContainer,
    Text,
    DetailText,
    DetailBText,
    DrugDetailsWrapper,
    CloseButton,
    DrugCard,
    DrugImage,
    ImgCard,
    DrugWrapper,
};
