import React, { useEffect, useState } from "react";
import { getDateTime } from "./getDateTime";
// import Star from '';

const ReviewModifyModal = (props) => {
    const [oldFTitle, setOldFTitle] = useState("");
    const [oldRDateTime, setOldRDateTime] = useState("");
    const [uReview, setUReview] = useState("");
    const [oldUReview, setOldUReview] = useState("");
    const [oldStar, setOldStar] = useState("");

    let modifyKey = props.modifyKey;

    useEffect(() => {
        console.log("modifyKey: ", props.modifyKey);

        let reviewDBObjs = parseReviewDB();
        let reviewObjs = reviewDBObjs.rData;
        let modifyMyReview = reviewObjs[modifyKey];
        console.log("modifyMyReview: ", modifyMyReview);

        setOldFTitle(modifyMyReview.fTitle);
        setOldRDateTime(modifyMyReview.rDateTime);
        setOldUReview(modifyMyReview.uReview);
        setOldStar(modifyMyReview.star);
    }, [oldFTitle, oldRDateTime, oldUReview, oldStar]);

    const uReviewChangeHandler = (e) => {
        console.log("uReviewChangeHandler() Called!");
        setUReview(e.target.value);
    };

    const modifyModalBtnClickHandler = () => {
        console.log("modifyModal Btn Clicked!");

        let reviewDBinStorage = localStorage.getItem("reviewDB");
        let reviewDBObjs = JSON.parse(reviewDBinStorage);
        let reviewObjs = reviewDBObjs.rData;
        let modifyMyReview = reviewObjs[modifyKey];

        console.log("modifyMyReview: ", modifyMyReview);

        // let modifyMyReview = reviewObjs[modifyKey];
        reviewObjs[modifyKey] = {
            uId: modifyMyReview["uId"],
            fDataId: modifyMyReview["fDataId"],
            fTitle: modifyMyReview["fTitle"],
            rDateTime: getDateTime(),
            uReview: uReview,
            rNo: modifyKey,
            star: modifyMyReview["oldStar"],
        };

        reviewDBObjs.rData = reviewObjs;

        let modifiedReviewStr = JSON.stringify(reviewDBObjs);
        localStorage.setItem("reviewDB", modifiedReviewStr);

        console.log("Review modified success!");
        props.setIsShowModifyModal(false);
    };

    const parseReviewDB = () => {
        console.log("getReviewDBObjs() Called!");

        let reviewDBinStorage = localStorage.getItem("reviewDB");
        let reviewDBObjs = JSON.parse(reviewDBinStorage);

        return reviewDBObjs;
    };

    return (
        <div className="review_modify_modal">
            <div className="modify_info">
                <span>{oldFTitle}</span><span>{oldRDateTime}</span>★&nbsp;<span>{oldStar}</span>
            </div>
            <textarea className="review_modify_text input"
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
