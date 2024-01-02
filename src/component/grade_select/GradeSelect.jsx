import React, { useEffect, useState } from "react";
import "./gradeSelect.css";

const GradeSelect = (props) => {

    // hook
    const [curStar, setCurStar] = useState('');
    const [isRewrite, setIsRewrite] = useState('');

    // 리뷰 데이터 목록에 점수 넣기
    useEffect(() => {
        console.log('useEffect() CALLED');

        // let reviewDBObjs = props.parseReviewDB();
        // let rDataObjs = reviewDBObjs.rData;
        // let reviewStar = rDataObjs.reviewNo.star;

        // if (reviewStar === null) {
        //     // 'star': curStar
        // }
        // 'starDB' > 객체
        // starDB > [리뷰번호] : {별점: 5}
        // starDB[리뷰번호].별점 = 5
    }, [curStar]);

    // 별점 DB에 따로 넣어놓기
    useEffect(() => {
        console.log("useEffect() CALLED");

        let starDBInStorage = localStorage.getItem("starDB");
        let festivalNo = props.festivalNo;
        let reviewNo = props.reviewNo;

        if (starDBInStorage === null) {
            let newStarObj = {
                [reviewNo]: {
                    'festivalNo': festivalNo,
                    'star': curStar
                },
            };
            let newStarStr = JSON.stringify(newStarObj);
            localStorage.setItem("newStarObj", newStarStr);
        } else {

            let starObj = JSON.parse(starDBInStorage);
            starObj[reviewNo] = {
                'festivalNo': festivalNo,
                'star': curStar
            };

            let newStarStr = JSON.stringify(starObj);
            localStorage.setItem("newStarObj", newStarStr);
        }
    }, [curStar]);

    // handler
    const starClickHandler = (e) => {
        console.log("starClickHandler() CALLED");

        setCurStar(e.target.value);
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
                
                {
                    isRewrite
                    ?
                    null
                    :
                    <>
                        <div className="star_rate">{curStar}</div>
                        &nbsp;&nbsp;&nbsp;
                        <button className="input_star" onClick={inputStar} >별점 입력</button>
                    </>
                    
                }
                
                <div className="selected_star">
                    {
                        isRewrite
                        ?
                        `★ ${curStar}`
                        :
                        null
                    }
                </div>
            </div>
        </>
    );
};

export default GradeSelect;