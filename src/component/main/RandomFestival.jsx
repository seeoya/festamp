import React, { useEffect, useState } from "react";
import { customRandom } from "../util/Random";

const RandomFestival = (props) => {
    const [resNum, setResNum] = useState(0);
    let data = props.data;

    useEffect(() => {
        setRandomResNum();
    }, []);
    const setRandomResNum = () => {
        let resultNum = customRandom(0, data.length);

        setResNum(resultNum);
    };

    const randomBtnClickHandler = () => {
        setRandomResNum();
    };

    return (
        <div className="random">
            <h2>이런 축제는 어때?</h2>

            <div className="random_wrap">
                <button type="button" className="random_btn" onClick={randomBtnClickHandler}>
                    랜덤
                </button>

                <div className="random_content">
                    <div className="item">
                        <div className="item_title">{data[resNum].title}</div>
                        <div className="item_date">{data[resNum].date}</div>
                        <div className="item_city">{data[resNum].city}</div>
                        <div className="item_explan">{data[resNum].explain}</div>
                        <div className="item_location">{data[resNum].location}</div>
                        <div className="item_price">{data[resNum].price}</div>
                        <div className="item_name">{data[resNum].name}</div>
                        <div className="item_tel">{data[resNum].tel}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RandomFestival;
