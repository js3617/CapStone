import { createGlobalStyle } from "styled-components";

// --point-color-background: #AEB9F2; 이전 배경 색상

const GlobalStyle = createGlobalStyle`
    :root{
        --point-color-main: #;
        --point-color-serve: #;
        --point-color-background: #FFFFFF;
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
        z-index: 10;
        color: var(--text-color)
    }

    ::-webkit-scrollbar {
    width: 10px;  
    }

    ::-webkit-scrollbar-thumb {
        background: rgba(102, 102, 102, 0.3); /* 스크롤바 색상 */
        border-radius: 10px; /* 스크롤바 둥근 테두리 */
    }

    ::-webkit-scrollbar-track {
        background: none;  /*스크롤바 뒷 배경 색상*/
    }

    input{
        outline: none;
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
            height: 10vh;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        img{
            width: 25vh;
            height: 10vh;
        }
    }
    
    nav .navMenu{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        & a{
            margin: 1vh 2vh;
            font-size: 2vh;
            justify-content: end;
        }
        & hr{
            border: 0;
            background-color: #1C3988;
            height: 0.5vh;
            box-shadow: 2px 2px 2px gray;
        }
    }
    
`;

export default GlobalStyle;
