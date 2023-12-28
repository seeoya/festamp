import React, { useEffect, useState } from "react";
import { customRandom } from "../util/Random";

const RandomFestival = (props) => {
    const [resNum, setResNum] = useState(0);
    let festivalData = props.festivalData;

    useEffect(() => {
        setRandomResNum();
    }, []);

    const setRandomResNum = () => {
        let resultNum = customRandom(0, festivalData.length);

        setResNum(resultNum);
    };

    const randomBtnClickHandler = () => {
        setRandomResNum();
    };

    return (
        <div className="random">
            <h1>이런 축제는 어때?</h1>

            <div className="random_wrap">
                <button type="button" className="random_btn" onClick={randomBtnClickHandler}>
                    추천해줘!
                </button>

                <div className="random_content">
                    <div className="item">
                        <a href={"#" + festivalData[resNum].id}>
                            <div className="item_title">{festivalData[resNum].title}</div>
                            <div className="item_date">{festivalData[resNum].date}</div>
                            <div className="item_city">{festivalData[resNum].city}</div>
                            <div className="item_explan">{festivalData[resNum].explain}</div>
                            <div className="item_location">{festivalData[resNum].location}</div>
                            <div className="item_price">{festivalData[resNum].price}</div>
                            <div className="item_name">{festivalData[resNum].name}</div>
                            <div className="item_tel">{festivalData[resNum].tel}</div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RandomFestival;
