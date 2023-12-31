import React, { useEffect, useState } from "react";
import GradeSelect from "../grade_select/GradeSelect";
import { getDateTime } from "./getDateTime";


const ReviewWriteModal = (props) => {
    const [reviewNo, setReviewNo] = useState(0);
    const [uReview, setUReview] = useState("");
    const [star, setStar] = useState('');
    const [festivalDataId, setFestivalDataId] = useState("");
    const [festivalTitle, setFestivalTitle] = useState("");

    let logInId = props.logInId;

    useEffect(() => {
        document.getElementById("write_input").focus();
    }, []);

    useEffect(() => {
        setFestivalDataId(props.festivalDataId);
        setFestivalTitle(props.festivalTitle);
    }, [festivalDataId, festivalTitle, star]);

    const uReviewChangeHandler = (e) => {
        setUReview(e.target.value);
    };

    const writeModalBtnClickHandler = () => {
        let uId = logInId; // 로그인한 아이디

        let reviewDBObjs = parseReviewDB();
        let reviewObjs = reviewDBObjs.rData;
        let reviewCnt = reviewDBObjs.count + 1;

        reviewObjs[reviewCnt] = {
            "uId": uId,
            "fDataId": festivalDataId,
            "fTitle": festivalTitle,
            "rDateTime": getDateTime(),
            "uReview": uReview,
            "rNo": reviewCnt,
            "star": star,
        };

        reviewDBObjs["rData"] = reviewObjs;
        reviewDBObjs["count"] = reviewCnt;

        let nullCheck = reviewDBObjs.rData[reviewCnt];

        if (nullCheck.star === null || nullCheck.star === "") {
            alert("별점을 선택해 주세요!");
        } else {
            if (nullCheck.uReview === null || nullCheck.uReview === "") {
                alert("리뷰를 작성해 주세요!");
            } else {
                let addReviewStr = JSON.stringify(reviewDBObjs);
                localStorage.setItem("reviewDB", addReviewStr);

                alert('리뷰가 저장되었습니다!');
                props.setIsShowWriteModal(false);
                props.starMinF();
            }
        }
    };

    // reviewDB 가져오는 함수
    const parseReviewDB = () => {
        let reviewDBinStorage = localStorage.getItem("reviewDB");
        let reviewDBObjs = JSON.parse(reviewDBinStorage);

        return reviewDBObjs;
    };

    return (
        <div className="review_write_modal">
            <GradeSelect setStar={setStar} parseReviewDB={parseReviewDB} festivalNo={festivalDataId} />

            <div className="write_bottom">
                <textarea className="review_text input"
                    cols="50"
                    rows="5"
                    id="write_input"
                    vlaue={uReview}
                    onChange={(e) => uReviewChangeHandler(e)}
                ></textarea>

                <br />

                <button className="btn main" onClick={writeModalBtnClickHandler}>저장</button>
            </div>
        </div>
    );
};

export default ReviewWriteModal;
