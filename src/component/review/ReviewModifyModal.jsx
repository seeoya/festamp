import React, { useEffect, useState } from "react";
import { getDateTime } from "./getDateTime";
import "./mypage.css";
// import Star from '';

const ReviewModifyModal = (props) => {
    const [oldFTitle, setOldFTitle] = useState("");
    const [oldRDateTime, setOldRDateTime] = useState("");
    const [uReview, setUReview] = useState("");
    const [oldUReview, setOldUReview] = useState("");
    const [oldStar, setOldStar] = useState("");

    let modifyKey = props.modifyKey;

    useEffect(() => {
        document.getElementById("modify_input").focus();
    }, []);

    useEffect(() => {
        let reviewDBObjs = parseReviewDB();
        let reviewObjs = reviewDBObjs.rData;
        let modifyMyReview = reviewObjs[modifyKey];

        setOldStar(props.rStar);
        setOldFTitle(modifyMyReview.fTitle);
        setOldRDateTime(modifyMyReview.rDateTime);
        setOldUReview(modifyMyReview.uReview);
    }, [oldFTitle, oldRDateTime, oldUReview, oldStar]);

    const uReviewChangeHandler = (e) => {
        setUReview(e.target.value);
    };

    const modifyModalBtnClickHandler = () => {
        let reviewDBinStorage = localStorage.getItem("reviewDB");
        let reviewDBObjs = JSON.parse(reviewDBinStorage);
        let reviewObjs = reviewDBObjs.rData;
        let modifyMyReview = reviewObjs[modifyKey];

        reviewObjs[modifyKey] = {
            'uId': modifyMyReview['uId'],
            'fDataId': modifyMyReview['fDataId'],
            'fTitle': modifyMyReview['fTitle'],
            'rDateTime': getDateTime(),
            'uReview': uReview,
            'rNo': modifyKey,
            'star': props.rStar,
        };

        reviewDBObjs.rData = reviewObjs;

        let modifiedReviewStr = JSON.stringify(reviewDBObjs);
        localStorage.setItem("reviewDB", modifiedReviewStr);

        props.setIsShowModifyModal(false);
    };

    const parseReviewDB = () => {
        let reviewDBinStorage = localStorage.getItem("reviewDB");
        let reviewDBObjs = JSON.parse(reviewDBinStorage);

        return reviewDBObjs;
    };

    return (
        <div id="modify_wrap" className="review_modify_modal full_list">
            <div className="modify_info write_info">
                <span>{oldFTitle}</span><span>{oldRDateTime}</span><span>★</span>&nbsp;<span>{oldStar}</span>
            </div>

            <textarea id="modify_input" className="review_modify_text input"
                name="oldUReview"
                defaultValue={oldUReview}
                value={uReview}
                onChange={uReviewChangeHandler}
                rows="5"
                cols="50"
            />

            <button className="main btn" onClick={modifyModalBtnClickHandler}>수정</button>
        </div>
    );
};

export default ReviewModifyModal;
