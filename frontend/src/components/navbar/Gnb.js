// react
import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// image
import logo from "../../images/어디약돋보기.png";

import GlobalStyle from "../../styles/Globalstyle"; 


function Gnb(){
    return(
        <>
        <GlobalStyle />
        <nav>
            <div className="content">
                <div className="logo">
                    <Link to="/">
                    <img src={logo} alt="어디약?" />
                    </Link>
                </div>
                <div className="navMenu">
                    <Link to="/product">의약품 검색<hr/></Link>
                    <Link to="/drug">약국 지도<hr/></Link>
                    <Link to="/store">편의점 지도<hr/></Link>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Gnb;