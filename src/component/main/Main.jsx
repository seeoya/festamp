import React from "react";
import Map from "../map/Map";
import MainSlide from "./MainSlide";
import Popular from "./Popular";
import RandomFestival from "./RandomFestival";
import "./main.css";

const Main = (props) => {
    let data = props.data;

    return (
        <>
            <div id="main" className="sec">
                <MainSlide data={data} />
                <Popular data={data} />
                <RandomFestival data={data} />
            </div>

            {/* 지도 테스트용. 제거 예정 */}
            <div>
                <Map />
            </div>
        </>
    );
};

export default Main;
