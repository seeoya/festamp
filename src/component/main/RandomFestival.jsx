import React, { useState } from "react";
import { customRandom } from "../util/Random";

const RandomFestival = () => {
    const [resNum, setresNum] = useState(0);

    const randomBtnClickHandler = () => {
        let resultNum = customRandom(1, 10);

        setresNum(resultNum);
    };

    return (
        <div className="random">
            <h2>이런 축제는 어때?</h2>

            <div className="random_wrap">
                <button type="button" className="random_btn" onClick={randomBtnClickHandler}>
                    랜덤
                </button>

                <div className="random_content">{resNum}</div>
            </div>
        </div>
    );
};

export default RandomFestival;
