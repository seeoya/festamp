import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        <div id="main_random" className="sec_item">
            <h1 className="sec_item_title">
                <span>이런 축제는 어때?</span>
                <button
                    type="button"
                    className="btn main random_btn"
                    onClick={randomBtnClickHandler}
                >
                    더 추천해줘!
                </button>
            </h1>

            <div className="random_wrap">
                <div className="random_content">
                    <Link to={`/view/${festivalData[resNum].id}`} className="item">
                        <img
                            src={`${festivalData[resNum].img}`}
                            alt={festivalData[resNum].title}
                            className="item_img"
                        />

                        <div>
                            <h2 className="item_title">{festivalData[resNum].title}</h2>

                            <div className="item-info">
                                {festivalData[resNum].date} / {festivalData[resNum].city}
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RandomFestival;
