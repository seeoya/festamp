import React, { useEffect, useState } from "react";
import ReviewModifyModal from "./ReviewModifyModal";
import ReviewWriteModal from "./ReviewWriteModal";
import { useNavigate } from "react-router-dom";
import "./viewReview.css";

const MainReview = (props) => {

    const navigate = useNavigate();
    let logInId = props.loginInfo.logInId; // 로그인 아이디
    let isLogIned = props.loginInfo.isLogIned;

    const [isShowWriteModal, setIsShowWriteModal] = useState(false);
    const [isShowModifyModal, setIsShowModifyModal] = useState(false);
    const [modifyKey, setModifyKey] = useState("");
    const [tempFlag, setTempFlag] = useState(true);
    const [reviewsArr, setReviewsArr] = useState([]);
    const [reviewNo, setReviewNo] = useState(0);
    const [uReview, setUReview] = useState("");

    const [festivalDataId, setFestivalDataId] = useState("");
    const [festivalTitle, setFestivalTitle] = useState("");
    const [starGradeDataId, setStarGradeDataId] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    
    useEffect(() => {
        console.log("useEffect() CALLED!!");

        setFestivalDataId(props.festivalDataId);
        setFestivalTitle(props.festivalTitle);
        setStarGradeDataId("****");

        console.log(logInId);
        console.log(isLogIned);

        let reviewDBObjs = parseReviewDB();
        let rDataObjs = reviewDBObjs.rData;

        let reviewskeys = [];
        for (let keys in rDataObjs) {
            reviewskeys.push(keys);
        }
        console.log(reviewskeys);

        let tempArr = [];

        for (let i = 0; i < reviewskeys.length; i++) {
            let reviews = rDataObjs[reviewskeys[i]];

            if (reviews.fDataId === festivalDataId) {
                if (!isLogIned) {
                    // 로그인 상태가 아니라면
                    reviews["key"] = reviewskeys[i];
                    console.log("reviewskeys[i]:", reviewskeys[i]);

                    tempArr.push(reviews);
                } else if (reviews.uId === logInId) {
                    // 로그인 상태라면
                    reviews["key"] = reviewskeys[i];
                    console.log("reviewskeys[i]:", reviewskeys[i]);

                    tempArr.push(reviews);
                }
            }
        }
        setReviewsArr(tempArr);
        currentPosts(reviewsArr);
        setReviewsArr(currentPosts);
    }, [festivalDataId, festivalTitle, tempFlag, isShowWriteModal, isShowModifyModal, currentPage]);

    // 메인리스트 리뷰쓰기 버튼
    const mainReviewWriteBtnClickHandler = () => {
        console.log("mainReviewWrite Btn Clicked!");

        // logined check
        if (!checkLogined()) {
            console.log(checkLogined());
            alert("로그인이 필요합니다.");
            // 로그인 페이지로 이동
            navigate("/signin");
            
        } else {
            
            let isReviewArr = [];
            let isReview = JSON.stringify(reviewsArr);

            if (isReview.includes(festivalTitle)) {
                alert(`${festivalTitle} 리뷰를 이미 작성하셨습니다!`);
            } else {
                // write modal show
                setIsShowWriteModal(true);
            }
        }
    }

        // 메인리스트 수정 버튼
        const mainReviewModifyBtnClickHandler = (e, rNo) => {
            console.log("mainReviewModify Btn Clicked()!");

            setModifyKey(rNo);
            console.log("modifykey: ", modifyKey);
            // modify modal show
            setIsShowModifyModal(true);
        };

        // 메인리스트 삭제 버튼
        const mainReviewDelBtnClickHandler = (e, rNo) => {
            console.log("mainReviewDel Btn Clicked!");

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

                alert("삭제되었습니다.");

                setTempFlag((pv) => !pv);
            } else {
                alert("취소되었습니다.");
            }
        };

        // 메인리뷰 더보기 클릭핸들러
        const moreViewClickHandler = () => {
            console.log("moreView Clicked!");

            setCurrentPage((prev) => prev + 1);
            console.log(currentPage);
            setReviewsArr(currentPosts(reviewsArr));
        };

        // 메인리뷰 접기 클릭핸들러
        const moreViewCancleClickHandler = () => {
            console.log("moreViewCancle Clicked!");
            setCurrentPage(1);
            setReviewsArr(currentPosts(reviewsArr));
        };

        // reviewDB 가져오는 함수
        const parseReviewDB = () => {
            console.log("getReviewDBObjs() Called!");

            let reviewDBinStorage = localStorage.getItem("reviewDB");
            let reviewDBObjs = JSON.parse(reviewDBinStorage);

            return reviewDBObjs;
        };

        const checkLogined = () => {
            if (logInId === undefined || logInId === "" || logInId === null) {
                return false;
            } else {
                return true;
            }
        };

        // 해당 page에 보여줄 리스트 담는 함수
        const currentPosts = (reviewsArr) => {
            console.log("currentPosts() Called");

            const indexOfLast = currentPage * postsPerPage;
            //const indexOfFirst = indexOfLast - postsPerPage;

            let currentPosts = 0;
            currentPosts = reviewsArr.slice(currentPosts, indexOfLast);
            console.log(currentPosts);
            return currentPosts;
        };

        return (
            <div id="review_wrap">
                <div className="view_review">
                    <div className="view_review_header">
                        <ul>
                            <li>
                                <span>{festivalTitle} 리뷰</span>
                                <span>{starGradeDataId}</span>
                                <button
                                    onClick={mainReviewWriteBtnClickHandler}
                                    className="btn highlight"
                                >
                                    리뷰 쓰기
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className="view_review_list">
                        {isLogIned ? (
                            <>
                                <ul>
                                    {reviewsArr.map((reviews, idx) => (
                                        <li className="full_list" key={idx}>
                                            {reviews.uId}
                                            <span>{reviews.fTitle}</span>
                                            <span>{`${[
                                                reviews.rDateTime.split("일", 1),
                                            ]}${"일"}`}</span>
                                            <span>{reviews.uReview}</span>
                                            <span>`★`</span>
                                            <span>{reviews.star}</span>
                                            <button
                                                onClick={(e) =>
                                                    mainReviewModifyBtnClickHandler(e, reviews.rNo)
                                                }
                                            >
                                                수정
                                            </button>
                                            <button
                                                onClick={(e) =>
                                                    mainReviewDelBtnClickHandler(e, reviews.rNo)
                                                }
                                            >
                                                삭제
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <>
                                <ul>
                                    {reviewsArr.map((reviews, idx) => (
                                        <li className="logined_list" key={idx}>
                                            <span>{reviews.uId}</span>
                                            <span>{reviews.fTitle}</span>
                                            <span>{`${[
                                                reviews.rDateTime.split("일", 1),
                                            ]}${"일"}`}</span>
                                            <span>{reviews.uReview}</span>
                                            <span>{reviews.star}</span>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </div>

                    <div className="more_view_wrap">
                        <Link to="#none" onClick={moreViewClickHandler} />
                            + 더보기
                        
                        <Link to="#none" onClick={moreViewCancleClickHandler} />
                            접기
                        
                    </div>

                    <div className="modal_wrap">
                        {isShowWriteModal ? (
                            <>
                                <ReviewWriteModal
                                    festivalDataId={festivalDataId}
                                    festivalTitle={festivalTitle}
                                    setIsShowWriteModal={setIsShowWriteModal}
                                    logInId={props.loginInfo.logInId}
                                />
                            </>
                        ) : null}

                        {isShowModifyModal ? (
                            <>
                                <ReviewModifyModal
                                    setIsShowModifyModal={setIsShowModifyModal}
                                    modifyKey={modifyKey}
                                />
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
        );
    };

    export default MainReview;
