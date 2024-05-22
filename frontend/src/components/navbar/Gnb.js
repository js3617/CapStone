import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../images/어디약돋보기.png";
import GlobalStyle from "../../styles/Globalstyle"; 

function Gnb() {

    //useLocation() 사용하여 현재 URL 정보 가져오기
    const location = useLocation();

    // 링크가 활성화되어 있는지 여부를 판단하는 기능
    const isActive = (path) => location.pathname === path;

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
                            <hr style={{ opacity: isActive('/drug') || isActive('/') ? 1 : 0.4 }} />
                        </Link>
                        <Link to="/pharmacy">
                            약국 지도
                            <hr style={{ opacity: isActive('/pharmacy') || isActive('/') ? 1 : 0.4 }} />
                        </Link>
                        <Link to="/store">
                            편의점 지도
                            <hr style={{ opacity: isActive('/store') || isActive('/') ? 1 : 0.4 }} />
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Gnb;
