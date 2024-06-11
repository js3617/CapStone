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
                            의약품 검색
                            <hr style={{ opacity: isActive('/drug') ? 1 : 0.4 }} />
                        </Link>
                        <Link to="/pharmacy">
                            약국 지도
                            <hr style={{ opacity: isActive('/pharmacy') ? 1 : 0.4 }} />
                        </Link>
                        <Link to="/store">
                            편의점 지도
                            <hr style={{ opacity: isActive('/store') ? 1 : 0.4 }} />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Gnb;
