import React from "react";
import MainSlide from "./MainSlide";
import "./main.css";

const Main = () => {
    return (
        <div id="main" className="sec">
            <div className="main_slide">
                <h2>오늘의 축제</h2>
                <MainSlide />
            </div>

            <div className="popular">
                <h2>인기 축제 TOP 10</h2>
                <ul className="list">
                    <li className="item">
                        <a href="#">축제 이름</a>
                    </li>
                    <li className="item">
                        <a href="#">축제 이름</a>
                    </li>
                    <li className="item">
                        <a href="#">축제 이름</a>
                    </li>
                    <li className="item">
                        <a href="#">축제 이름</a>
                    </li>
                    <li className="item">
                        <a href="#">축제 이름</a>
                    </li>
                    <li className="item">
                        <a href="#">축제 이름</a>
                    </li>
                    <li className="item">
                        <a href="#">축제 이름</a>
                    </li>
                </ul>
            </div>

            <div className="random">
                <h2>이런 축제는 어때?</h2>

                <div className="random_wrap">
                    <button type="button" className="random_btn">
                        랜덤
                    </button>

                    <div className="random_content"></div>
                </div>
            </div>
        </div>
    );
};

export default Main;
