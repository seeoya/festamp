import React, { useEffect, useState } from "react";
import "./gradeSelect.css";

const GradeSelect = (props) => {

    const fullStar = <i class="fa-solid fa-star"></i>
    const blacnkStar = <i class="fa-regular fa-star"></i>
    const halfStar = <i class="fa-solid fa-star-half-stroke"></i>

    // hook
    const [star, setStar] = useState('');

    useEffect(() => {
        console.log('useEffect() CALLED');

        if (star === 1.0) {
            console.log('star 1 CALLED');
        } else if (star === 1.5) {
            console.log('star 1.5 CALLED');
        } else if (star === 2.0) {
            console.log('star 2.0 CALLED');
        } else if (star === 2.5) {
            console.log('star 2.5 CALLED');
        } else if (star === 3.0) {
            console.log('star 3.0 CALLED');
        } else if (star === 3.5) {
            console.log('star 3.5 CALLED');
        } else if (star === 4.0) {
            console.log('star 4.0 CALLED');
        } else if (star === 4.5) {
            console.log('star 4.5 CALLED');
        } else if (star === 5.0) {
            console.log('star 5.0 CALLED');
        }
    })

    useEffect(() => {
        console.log('useEffect() CALLED');

        let starDBInStorage = localStorage.getItem('starDB');
        let festivalNum = props.festivalNum ?? 1;
        let reviewNum = props.reviewNum ?? 1;

        if (starDBInStorage === null) {
            let newStarObj = {
                [reviewNum]: {
                    'festivalNum': festivalNum,
                    'star': star
                }
            }
            let newStarStr = JSON.stringify(newStarObj);
            localStorage.setItem('newStarObj', newStarStr);
        }
    }, [star]);

    // handler
    const starClickHandler = (e) => {
        console.log('starClickHandler() CALLED');

        setStar(e.target.value);
    }

    return (
        <>
            <div className="star_wrap">
                <div className="star_rating space-x-4 mx-auto">
                    <input onClick={(e) => starClickHandler(e)} type="radio" id="5_stars" name="rating" value={'5.0'} />
                    <label for="5_stars" className="star pr-4">★</label>
                    <input onClick={(e) => starClickHandler(e)} type="radio" id="4_stars" name="rating" value={'4.0'} />
                    <label for="4_stars" className="star">★</label>
                    <input onClick={(e) => starClickHandler(e)} type="radio" id="3_stars" name="rating" value={'3.0'} />
                    <label for="3_stars" className="star">★</label>
                    <input onClick={(e) => starClickHandler(e)} type="radio" id="2_stars" name="rating" value={'2.0'} />
                    <label for="2_stars" className="star">★</label>
                    <input onClick={(e) => starClickHandler(e)} type="radio" id="1_star" name="rating" value={'1.0'} />
                    <label for="1_star" className="star">★</label>
                </div>
                &nbsp;&nbsp;&nbsp;
                <div className="star_rate">{star}</div>
                <div></div>
            </div>
        </>
    );
}

export default GradeSelect;