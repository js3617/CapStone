import React, { useState } from "react";
import styled from "styled-components";
import Pharmacy from "./Pharmacy";
import Store from "./Store";
import Store_Stock_All from "../pages/Store_Stock_All";

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 8%;
    z-index: 9999;
`;

const NavButton = styled.button`
    height: 3rem;
    width: 15vh;
    cursor: pointer;
    padding: 3px 8px;
    background-color: ${props => (props.active ? '#E8E8E8' : '#AEB9F2')};
    color: #000000;
    border-radius: 100px;
    align-items: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border: none;
    &:hover {
        background-color: #E8E8E8;
    }
`;

function Store_Stock() {
    const [activeComponent, setActiveComponent] = useState("전체");

    return (
        <Main>
            <ButtonContainer>
                <NavButton
                    active={activeComponent === "전체"}
                    onClick={() => setActiveComponent("전체")}
                >
                    전체
                </NavButton>
                <NavButton
                    active={activeComponent === "Store"}
                    onClick={() => setActiveComponent("Store")}
                >
                    Store
                </NavButton>
                <NavButton
                    active={activeComponent === "Pharmacy"}
                    onClick={() => setActiveComponent("Pharmacy")}
                >
                    Stock
                </NavButton>
            </ButtonContainer>
            {activeComponent === "전체" && <Store_Stock_All />}
            {activeComponent === "Store" && <Store />}
            {activeComponent === "Pharmacy" && <Pharmacy />}
        </Main>
    );
}

export default Store_Stock;