import React from "react";
import Map from "../map/Map";
import MainSlide from "./MainSlide";
import Popular from "./Popular";
import RandomFestival from "./RandomFestival";
import "./main.css";

const Main = (props) => {
    let festivalData = props.festivalData;

    return (
        <>
            <div id="main" className="sec">
                <MainSlide festivalData={festivalData} />

                <div className="info">
                    <Popular festivalData={festivalData} />
                    <RandomFestival festivalData={festivalData} />
                </div>
            </div>

            {/* 지도 테스트용. 제거 예정 */}
            <div>
                <Map festivalData={festivalData} />
            </div>
        </>
    );
};

export default Main;
