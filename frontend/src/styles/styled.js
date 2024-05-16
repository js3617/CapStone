import styled from "styled-components";

const Text = styled.p`
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
`

const Container = styled.div`
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1440px;
    min-height: calc(100vh - 180px);
`

const DrugContainer = styled.div`
    width: 100%;
    display: flex;
    margin-top: 8%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 1440px;
    min-height: calc(100vh - 180px);
`

export {Container, DrugContainer, Text};