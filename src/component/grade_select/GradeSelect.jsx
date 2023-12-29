import React, { useEffect, useState } from "react";
import "./gradeSelect.css";

const GradeSelect = (props) => {

    // hook
    const [star, setStar] = useState('');
    
    useEffect(() => {
        console.log('useEffect() CALLED');

        let starDBInStorage = localStorage.getItem('starDB');
        let curStarDBObj = JSON.parse(starDBInStorage);
    
        const starArr = [
            '★',
            `★★`,
            `★★★`,
            `★★★★`,
            `★★★★★`
        ];

        let curStarArr = '';
        // 'starDB' > 객체
        // starDB > [리뷰번호] : {별점: 5}
        // starDB[리뷰번호].별점 = 5
        
        if (star === 1.0) {
            console.log("star 1 CALLED");
        
            curStarArr = starArr[0]
        } else if (star === 2.0) {
            console.log("star 2.0 CALLED");

            curStarArr = starArr[1]
        } else if (star === 3.0) {
            console.log("star 3.0 CALLED");

            curStarArr = starArr[2]
        } else if (star === 4.0) {
            console.log("star 4.0 CALLED");

            curStarArr = starArr[3]
        } else if (star === 5.0) {
            console.log("star 5.0 CALLED");
            
            curStarArr = starArr[4]
        }
    });

    useEffect(() => {
        console.log("useEffect() CALLED");

        let starDBInStorage = localStorage.getItem("starDB");
        let festivalNum = props.festivalNum ?? 1;
        let reviewNum = props.reviewNum ?? 1;

        if (starDBInStorage === null) {
            let newStarObj = {
                [reviewNum]: {
                    'festivalNum': festivalNum,
                    'star': star
                },
            };
            let newStarStr = JSON.stringify(newStarObj);
            localStorage.setItem("newStarObj", newStarStr);
        } else {

            let starObj = JSON.parse(starDBInStorage);
            starObj[reviewNum] = {
                'festivalNum': festivalNum,
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

    return (
        <>
            <div className="star_wrap">
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
                &nbsp;&nbsp;&nbsp;
                <div className="star_rate">{star}</div>
                <div cur_star_wrap>
                    <p>curStarArr</p>
                </div>
            </div>
        </>
    );
};

export default GradeSelect;