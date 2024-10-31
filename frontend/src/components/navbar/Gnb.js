import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/어디약돋보기.png";
import GlobalStyle from "../../styles/Globalstyle"; 

function Gnb() {

    // useLocation() to get current URL information
    const location = useLocation();

    // Determine if the link is active
    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path);

    return (
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
                        <Link to="/drug">
                            의약품 목록
                            <hr style={{ opacity: isActive('/drug') ? 1 : 0.4 }} />
                        </Link>
                        <Link to="/Store_Stock">
                            약국/편의점
                            <hr style={{ opacity: isActive('/Store_Stock') ? 1 : 0.4 }} />
                        </Link>
                        <Link to="/store">
                            병원
                            <hr style={{ opacity: isActive('/store') ? 1 : 0.4 }} />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Gnb;
