import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Stamp from "../stamp/StampPage";
import ReviewModifyModal from "./ReviewModifyModal";

const MyReview = (props) => {

    let logInId = props.loginInfo.logInId;

    const [myReviewsArr, setMyReviewsArr] = useState([]);
    const [tempFlag, setTempFlag] = useState(true);
    const [modifyKey, setModifyKey] = useState("");
    const [isShowModifyModal, setIsShowModifyModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [rStar, setRStar] = useState("");

    useEffect(() => {
        console.log("useEffect() CALLED!!");

        console.log(props.loginInfo);

        console.log(logInId);

        let reviewDBObjs = parseReviewDB();
        let rDataObjs = reviewDBObjs.rData;

        let reviewskeys = [];
        for (let keys in rDataObjs) {
            reviewskeys.push(keys);
        }
        console.log(reviewskeys);

        let tempArr = [];

        for (let i = 1; i < reviewskeys.length; i++) {
            let reviews = rDataObjs[reviewskeys[i]];
            console.log(reviews);
            console.log(reviews.uId);

            // let uId = props.loginInfo.logInId;

            if (reviews.uId === logInId) {
                reviews["key"] = reviewskeys[i];
                console.log("reviewskeys[i]:", reviewskeys[i]);

                tempArr.push(reviews);
            }
        }
        setMyReviewsArr(tempArr);
        currentPosts(myReviewsArr);
        setMyReviewsArr(currentPosts);

    }, [tempFlag, isShowModifyModal, currentPage]);

    const myReviewModifyBtnClickHandler = (e, rNo, rStar) => {
        console.log("reviewModifyBtnClickHandler() Called!");

        setModifyKey(rNo);
        setRStar(rStar);
        setIsShowModifyModal(true);
    };

    const myReviewDelBtnClickHandler = (e, rNo, fNo) => {
        console.log("reviewDelBtnClickHandler() Called!");

        let result = window.confirm("리뷰를 삭제하시겠습니까?");

        if (result) {
            let reviewDBObjs = parseReviewDB();
            let myReviews = reviewDBObjs.rData;

            delete myReviews[rNo];

            reviewDBObjs.rData = myReviews;
            console.log("reviewDBObjs.rData: ", reviewDBObjs.rData);

            let reviewDBInStorage = JSON.stringify(reviewDBObjs);
            localStorage.setItem("reviewDB", reviewDBInStorage);

            console.log("reviewDBInStorage: ", reviewDBInStorage);

             // starDB 업데이트
             let starDBInStorage = localStorage.getItem("starDB");           
             let starDBObj = JSON.parse(starDBInStorage);
             let starObj = starDBObj.sData;
             
             delete starObj[fNo];
 
             starDBObj.sData = starObj;
             starDBInStorage = JSON.stringify(starDBObj);
             localStorage.setItem("starDB", starDBInStorage);
             props.starMinF();

            alert("삭제되었습니다.");

            setTempFlag((pv) => !pv);
        } else {
            alert("취소되었습니다.");
        }
    };

    // MY리뷰 더보기 클릭핸들러
    const moreViewClickHandler = () => {
        console.log("moreView Clicked!");

        setCurrentPage((prev) => prev + 1);
        console.log(currentPage);
        setMyReviewsArr(currentPosts(myReviewsArr));
    };

    // MY리뷰 접기 클릭핸들러
    const moreViewCancleClickHandler = () => {
        console.log("moreViewCancle Clicked!");
        setCurrentPage(1);
        setMyReviewsArr(currentPosts(myReviewsArr));
    };

    // reviewDB 가져오는 함수
    const parseReviewDB = () => {
        console.log("getReviewDBObjs() Called!");

        let reviewDBinStorage = localStorage.getItem("reviewDB");
        let reviewDBObjs = JSON.parse(reviewDBinStorage);

        return reviewDBObjs;
    };

    // 해당 page에 보여줄 리스트 담는 함수
    const currentPosts = (myReviewsArr) => {
        console.log("currentPosts() Called");

        const indexOfLast = currentPage * postsPerPage;

        let currentPosts = 0;
        currentPosts = myReviewsArr.slice(currentPosts, indexOfLast);
        console.log(currentPosts);
        return currentPosts;
    };

    return (
        <div className="my_page">

            <div className="my_stamp">
                <p className="sec_item_title"><h2>MY STAMP</h2></p>

                <Stamp myReviewsArr={myReviewsArr} logInId={logInId} festivalData={props.festivalData} />
            </div>

            <div className="my_review">
                <ul>
                    <li className="sec_item_title"><h2>MY REVIEW</h2></li>
                    {myReviewsArr.map((myReview, idx) => (
                        <li className="my_full_list">
                            <span>{`${[myReview.rDateTime]}`}</span>
                            <span>{myReview.fTitle}</span>
                            <span>{myReview.uReview}</span>
                            <span>★</span>
                            <span>{myReview.star}</span>
                            <button onClick={(e) => myReviewModifyBtnClickHandler(e, myReview.rNo, myReview.star)}>
                                수정
                            </button>
                            <button onClick={(e) => myReviewDelBtnClickHandler(e, myReview.rNo, myReview.fDataId)}>
                                삭제
                            </button>
                        </li>

                    ))}
                </ul>

            </div>

            <div className="more_view_wrap">
                <Link to="#none" onClick={moreViewClickHandler}>+ 더보기 </Link>
                <Link to="#none" onClick={moreViewCancleClickHandler}>접기</Link>
            </div>

            <div>
                {isShowModifyModal ? (
                    <>
                        <ReviewModifyModal
                            setIsShowModifyModal={setIsShowModifyModal}
                            modifyKey={modifyKey}
                            rStar={rStar}
                        />
                    </>
                ) : null}
            </div>
        </div>

    );
};

export default MyReview;
