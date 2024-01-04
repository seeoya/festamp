import React, { useEffect, useState } from "react";
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
    // 길이가 10개인 배열을 만들고 반복문을 돌려 빈 div를 만든다.
    const defaultDiv = Array.from({ length: 10 }).map((_, idx) => (
        <div className="stamp_item" key={idx}>
            <div className="fes_title"></div>
            <div className="stamp_img_wrap"></div>
        </div>
    ));

    const remainStampItems = Array.from({ length: (0, Math.ceil(myStampArr.length / 10) * 10) }).map((el, idx) => {
        if (myStampArr[idx]) {
            return (
                <div className="stamp_item" key={idx}>
                    <div className="fes_title">{myStampArr[idx].fTitle}</div>
                    <div className="stmap_img_wrap">
                        <img className="stmap_img" src={fData[myStampArr[idx].fDataId].img} alt={myStampArr[idx].fTitle} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="stamp_item" key={idx}>
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