import React, { useEffect, useState } from "react";
import ReviewModifyModal from "./ReviewModifyModal";
import ReviewWriteModal from "./ReviewWriteModal";
import { useNavigate, Link } from "react-router-dom";
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
    const [starGrade, setStarGrade] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);


    useEffect(() => {
        console.log("useEffect() CALLED!!");

        setFestivalDataId(props.festivalDataId);
        setFestivalTitle(props.festivalTitle);
        setStarGrade("****");

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
        let rStarArr = [];

        for (let i = 1; i < reviewskeys.length; i++) {
            let reviews = rDataObjs[reviewskeys[i]];

            if (reviews.fDataId === festivalDataId) {
                if (!isLogIned) {
                    // 로그인 상태가 아니라면
                    reviews["key"] = reviewskeys[i];
                    let rStar = reviews.star;
                    console.log("reviewskeys[i]:", reviewskeys[i]);

                    tempArr.push(reviews);
                    rStarArr.push(rStar);
                                       
                } else if (reviews.uId === logInId) {
                    // 로그인 상태라면
                    reviews["key"] = reviewskeys[i];
                    console.log("reviewskeys[i]:", reviewskeys[i]);

                    tempArr.push(reviews);
                }
            }
        }
        console.log(rStarArr);
        const starSum = rStarArr.reduce((prev, cur) => {return prev + cur;
        }, 0) 
        
        let starMin = Math.ceil(((starSum *10) / rStarArr.length)/10);
        console.log(starMin); 
        setStarGrade(starMin);
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
                            <span>{festivalTitle}</span>
                            <span>{starGrade}</span>
                            <button
                                onClick={mainReviewWriteBtnClickHandler}
                                className="write_btn btn highlight"
                            >
                                리뷰 쓰기
                            </button>
                </div>

                <div className="view_review_list">
                { reviewsArr.length > 0 ? 
                    <ul>
                        {reviewsArr.map((reviews, idx) =>
                            <li className="full_list" key={idx}>
                                <div className="write_info">
                                    <span>{reviews.uId}</span>
                                    <span>{`${[
                                        reviews.rDateTime.split("일", 1),
                                        ]}${"일"}`}</span>
                                        <span>★</span>
                                    <span>{reviews.star}</span>
                                    </div>
                                    <div className="review_value">
                                        <span>{reviews.uReview}</span>
                                {isLogIned ? (<>
                                    <button className="btn main modify_btn" onClick={(e) =>  mainReviewModifyBtnClickHandler(e, reviews.rNo)}>
                                        수정
                                    </button>
                                    <button className="btn main" onClick={(e) => mainReviewDelBtnClickHandler(e, reviews.rNo)}>
                                        삭제
                                    </button>
                                </>
                                )
                                : null}
                                </div>
                            </li>
                        )}
                    </ul>
                    :
                    <div>
                        아무것도 없으니까 작성 부탁드려요~~
                    </div>
                }
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
                
                {reviewsArr.length > 0 ?

                <div className="more_view_wrap">
                    <button type="button" className="btn main" onClick={moreViewClickHandler}>
                    + 더보기
                    </button>

                    <button type="button" className="btn main" onClick={moreViewCancleClickHandler}>
                    접기
                    </button>
                </div>
                :
                null}
                
            </div>
        </div>
    );
};

export default MainReview;
