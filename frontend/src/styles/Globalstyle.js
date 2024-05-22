import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    :root{
        --point-color-main: #;
        --point-color-serve: #;
        --point-color-background: #AEB9F2;
        --text-color: #000000;
    }

    *{
        list-style: none;
        text-decoration: none;
    }

    html, body{
        background-color: var(--point-color-background);
    }

    a{
        color: var(--text-color)
    }
    nav{
        top: 0;
        left: 0;
        background-color: transparent;
        position: fixed;
        display: flex;
        z-index: 999;
        width: 100%;
        .content{
            width: 100%;
            height: 120px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
    
    nav .navMenu{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        & a{
            margin: 1rem 2rem;
            font-size: 1.5rem;
            justify-content: end;
        }
        & hr{
            border: 0;
            background-color: white;
            height: 1vh;
            box-shadow: 2px 2px 2px gray;
        }
    }
    
`;

export default GlobalStyle;
