import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./stamp.css";

const Stamp = (props) => {
    // hook
    const [myStampArr, setMyStampArr] = useState([]);

    let myReviewsArr = props.myReviewsArr;
    let logInId = props.logInId;
    let fData = props.festivalData;

    useEffect(() => {
        console.log("useEffect CALLED");

        let reviewObjInStorage = localStorage.getItem("reviewDB");
        let curReviewDBObj = JSON.parse(reviewObjInStorage);
        let rDataObjs = curReviewDBObj.rData;

        let reviewskeys = [];
        for (let keys in rDataObjs) {
            reviewskeys.push(keys);
        }

        let tempArr = [];

        for (let i = 1; i < reviewskeys.length; i++) {
            let reviews = rDataObjs[reviewskeys[i]];

            if (reviews.uId === logInId) {     // 로그인 아이디와 일치하면
                reviews["key"] = reviewskeys[i];
                console.log("reviewskeys[i]:", reviewskeys[i]);

                tempArr.push(reviews);
            }
        }
        setMyStampArr(tempArr);
    }, []);

    // function
    // 길이가 10개인 빈 배열을 만들고 반복문을 돌려 빈 스탬프 칸을 만든다.
    const defaultDiv = Array.from({ length: 10 }).map((_, idx) => (
        <div className="stamp_item" key={idx}>
            <div className="fes_title"></div>
            <div className="stamp_img_wrap"></div>
        </div>
    ));
    // 리뷰 배열에 일의 자리수를 올림하여 10, 20, 30,... 빈 배열을 생성한다.
    const remainStampItems = Array.from({ length: (0, Math.ceil(myStampArr.length / 10) * 10) }).map((el, idx) => {
        const isMultipleOfTen = (idx + 1) % 10 === 0;
        // const isTenthImage = idx === 9;
        // if (isMultipleOfTen) {
        //     alert("스탬프 10개를를 채우셨습니다. 가까운 주민센터에 가셔서 물품을 받으세요!");
        // }
        if (myStampArr[idx]) {
            return (
                <div className={`stamp_item ${isMultipleOfTen ? 'black_background' : ''}`} key={idx}>
                    <Link to={`/view/${myStampArr[idx].fDataId}`}>
                        <div className="fes_title">{myStampArr[idx].fTitle}</div>
                        <div className="stamp_img_wrap">
                            <img className="stmap_img" src={fData[myStampArr[idx].fDataId].img} alt={myStampArr[idx].fTitle} />
                        </div>
                    </Link>
                    {/* {isTenthImage && alert('축하합니다!')} */}
                </div>
            );
        } else {
            return (
                <div className={`stamp_item ${isMultipleOfTen ? 'black_background' : ''}`} key={idx}>
                    <div className="fes_title"></div>
                    <div className="stamp_img_wrap"></div>
                </div>
            );
        }
    });

    return (
        <>
            <div className="stamp_wrap">
                <div className="stamp_item">{logInId}님의 스탬프</div>
                {myStampArr.length > 0
                    ?
                    remainStampItems
                    :
                    defaultDiv
                }
            </div>
        </>
    );
};

export default Stamp;