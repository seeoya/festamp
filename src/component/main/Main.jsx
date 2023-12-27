import React from "react";
import Map from "../map/Map";
import MainSlide from "./MainSlide";
import RandomFestival from "./RandomFestival";
import "./main.css";

const Main = () => {
    return (
        <div id="main" className="sec">
            <div>
                <Map />
            </div>

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

            <div>
                <RandomFestival />
            </div>
        </div>
    );
};

export default Main;
