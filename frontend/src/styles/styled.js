import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: calc(100vh - 180px);
`

const Name = styled.p`
    color: #CE3737;
    font-size: 1.5vh;
`

const LocationText = styled.p`
    font-size: 1.5vh;
    color: #000000;
`

const ListButton = styled.div`
    display: flex;
    width: 28vh;
    height: 5rem;
    border-radius: 100px;
    background-color: #1C3988;
    color: #FFFFFF;
    align-items: center;
    padding: 0 20px;
    font-size: 3vh;
    font-weight: 700;
    justify-content: center;
    margin: 30px 0 30px 0;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

export {Container, LocationText, Name, ListButton};