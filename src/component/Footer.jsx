import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (<footer>
        <div className="top_footer">
            <ul className="top_foot_top">
                <li><Link to="#">개인정보처리방침</Link></li>
                <li><Link to="#">이용약관</Link></li>
                <li><Link to="#">전자우편무단수집거부</Link></li>
                <li><Link to="#">저작권정책</Link></li>
                <li><Link to="#">고객서비스헌장</Link></li>
                <li><Link to="#">찾아오시는 길</Link></li>
            </ul>

            <ul className="top_foot_bottom">
                <li>경기도 의정부시 시민로 80 센트럴타워 6층</li>
                <li>TEL : 0507-1430-4112</li>
                <li>사업자등록번호 : 202-40-10304</li>
                <li>통신판매업신고 : 제2024-의정부-0011호</li>
            </ul>
        </div>

        <div className="bottom_footer">
            <ul className="footer_img">
                <li className="festamp_logo">
                    <Link to="/" className="link">
                        <img src="./imgs/logo/blackstamp.jpg" alt="메인으로" />
                    </Link>
                </li>

                <li>
                    <Link to="https://conlab.visitkorea.or.kr/" target="_blank" className="link">
                        <img src="./imgs/logo/korea_logo1.png" alt="한국관광콘텐츠랩" />
                    </Link>
                </li>

                <li>
                    <Link to="https://knto.or.kr/index" target="_blank" className="link">
                        <img src="./imgs/logo/korea_logo2.png" alt="한국관광공사" />
                    </Link>
                </li>

                <li>
                    <Link to="https://www.mcst.go.kr/kor/main.jsp" target="_blank" className="link">
                        <img src="./imgs/logo/korea_logo3.png" alt="문화체육관광부" />
                    </Link>
                </li>

                <li>
                    <Link to="https://www.gg.go.kr/" target="_blank" className="link">
                        <img src="./imgs/logo/korea_logo4.png" alt="경기도 사이트" />
                    </Link>
                </li>
            </ul>
        </div>
    </footer>
    );
};

export default Footer;
