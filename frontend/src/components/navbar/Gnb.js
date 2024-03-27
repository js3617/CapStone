// react
import React from "react";

// react-router-dom
import { Link } from "react-router-dom";

// image
import logo from "../../images/어디약돋보기.png";


function Gnb(){
    return(
        <nav>
            <div className="content">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="어디약?" />
                    </Link>
                </div>
                <div className="navMenu">
                    <Link to="/">의약품 검색</Link>
                    <Link to="/">약국 지도</Link>
                    <Link to="/">편의점 지도</Link>
                </div>
            </div>
        </nav>
    )
}

export default Gnb;