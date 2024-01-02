import React, { useEffect, useState } from "react";
import "./gradeSelect.css";

const GradeSelect = (props) => {

    // hook
    const [star, setStar] = useState('');
    const [isRewrite, setIsRewrite] = useState('');
    const [isView, setIsView] = useState('');

    useEffect(() => {
        console.log('useEffect() CALLED');

        let starDBInStorage = localStorage.getItem('newStarObj');
        let curStarDBObj = JSON.parse(starDBInStorage);
        // setMyStarArr(curStarDBObj[getLoginedSessionId()]);

        // 'starDB' > 객체
        // starDB > [리뷰번호] : {별점: 5}
        // starDB[리뷰번호].별점 = 5
    }, [star]);

    useEffect(() => {
        console.log("useEffect() CALLED");

        let starDBInStorage = localStorage.getItem("starDB");
        let festivalNo = props.festivalNo;
        let reviewNo = props.reviewNo;

        if (starDBInStorage === null) {
            let newStarObj = {
                [reviewNo]: {
                    'festivalNo': festivalNo,
                    'star': star
                },
            };
            let newStarStr = JSON.stringify(newStarObj);
            localStorage.setItem("newStarObj", newStarStr);
        } else {

            let starObj = JSON.parse(starDBInStorage);
            starObj[reviewNo] = {
                'festivalNo': festivalNo,
                'star': star
            };

            let newStarStr = JSON.stringify(starObj);
            localStorage.setItem("newStarObj", newStarStr);
        }
    }, [star]);

    // handler
    const starClickHandler = (e) => {
        console.log("starClickHandler() CALLED");

        setStar(e.target.value);
    };

    const inputStar = (e) => {
        console.log("inputStar() CALLED");
        setIsRewrite(true);
    }

    return (
        <>
            <div className="star_wrap">
                {
                    isRewrite
                    ?
                    null
                    :
                    <div className="star_rating space-x-4 mx-auto">
                    <input
                        onClick={(e) => starClickHandler(e)}
                        type="radio"
                        id="5_stars"
                        name="rating"
                        value={"5.0"}
                    />
                    <label for="5_stars" className="star pr-4">
                        ★
                    </label>
                    <input
                        onClick={(e) => starClickHandler(e)}
                        type="radio"
                        id="4_stars"
                        name="rating"
                        value={"4.0"}
                    />
                    <label for="4_stars" className="star">
                        ★
                    </label>
                    <input
                        onClick={(e) => starClickHandler(e)}
                        type="radio"
                        id="3_stars"
                        name="rating"
                        value={"3.0"}
                    />
                    <label for="3_stars" className="star">
                        ★
                    </label>
                    <input
                        onClick={(e) => starClickHandler(e)}
                        type="radio"
                        id="2_stars"
                        name="rating"
                        value={"2.0"}
                    />
                    <label for="2_stars" className="star">
                        ★
                    </label>
                    <input
                        onClick={(e) => starClickHandler(e)}
                        type="radio"
                        id="1_star"
                        name="rating"
                        value={"1.0"}
                    />
                    <label for="1_star" className="star">
                        ★
                    </label>
                </div>
                }
                
                &nbsp;&nbsp;&nbsp;
                <div className="star_rate">{star}</div>
                <button onClick={inputStar} />
                <div className="selected_star">
                    {
                        isRewrite
                        ?
                        `★ ${star}`
                        :
                        null
                    }
                </div>
            </div>
        </>
    );
};

export default GradeSelect;