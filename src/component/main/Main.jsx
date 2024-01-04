import React from "react";
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
                    <Popular festivalData={festivalData} count={5} />
                    <RandomFestival festivalData={festivalData} />
                </div>
            </div>
        </>
    );
};

export default Main;
