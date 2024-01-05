import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReviewModifyModal from "./ReviewModifyModal";
import ReviewWriteModal from "./ReviewWriteModal";
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
    const [rStar, setRStar] = useState("");
    const [festivalDataId, setFestivalDataId] = useState(props.festivalDataId ?? "");
    const [festivalTitle, setFestivalTitle] = useState(props.festivalTitle ?? "");
    const [starGrade, setStarGrade] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);

    const [memberDBObjs, setMemberDBObjs] = useState("");

    let reviewsCheck;
    let festData = props.festData;

    useEffect(() => {
        console.log("useEffect() CALLED!!");
        let paseMemDB = parseMemberDB();
        setMemberDBObjs(paseMemDB);

        console.log(memberDBObjs);

        // reviewDB에서 리스트 가져오기
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

            if (reviews.fDataId === festivalDataId) {
                reviews["key"] = reviewskeys[i];

                console.log("reviewskeys[i]:", reviewskeys[i]);

                tempArr.push(reviews);

            }
        }
        setReviewsArr(tempArr);
        console.log(reviewsArr);
        console.log(tempArr);

        currentPosts(reviewsArr);
        setReviewsArr(currentPosts);

        // 별평점 함수 호출해서 set
        let temp = getStarGrade(festivalDataId);
        setStarGrade(temp);

    }, [tempFlag, isShowWriteModal, isShowModifyModal, currentPage, starGrade]);

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
                if (isReview.includes(logInId)) {
                    alert(`${festivalTitle} 리뷰를 이미 작성하셨습니다!`);
                } else {
                    setIsShowWriteModal(true);
                }
            } else {
                setIsShowWriteModal(true);
            }
        }
    }

    // 메인리스트 수정 버튼
    const mainReviewModifyBtnClickHandler = (e, rNo, rStar) => {
        console.log("mainReviewModify Btn Clicked()!");
        setModifyKey(rNo);
        setRStar(rStar);
        console.log("modifykey: ", modifyKey);
        console.log("rStar: ", rStar);
        // modify modal show
        setIsShowModifyModal(true);
    };

    // 메인리스트 삭제 버튼
    const mainReviewDelBtnClickHandler = (e, rNo, fNo, rStar) => {
        console.log("mainReviewDel Btn Clicked!");

        let result = window.confirm("리뷰를 삭제하시겠습니까?");

        if (result) {
            let reviewDBObjs = parseReviewDB();
            let myReviews = reviewDBObjs.rData;

            delete myReviews[rNo];

            reviewDBObjs.rData = myReviews;
            console.log("reviewDBObjs.rData: ", reviewDBObjs.rData);
            // reviewDB 업데이트
            let reviewDBInStorage = JSON.stringify(reviewDBObjs);
            localStorage.setItem("reviewDB", reviewDBInStorage);

            console.log("reviewDBInStorage: ", reviewDBInStorage);

            // starDB 업데이트
            let starDBInStorage = localStorage.getItem("starDB");
            let starDBObj = JSON.parse(starDBInStorage);

            const findNumber = (el) => {
                if (el === rStar) {
                    return true;
                }
            }
            let delIdx = starDBObj[fNo].list.findIndex(findNumber);
            if (delIdx !== null) {
                delete starDBObj[fNo].list[delIdx];
            }

            starDBInStorage = JSON.stringify(starDBObj);
            localStorage.setItem("starDB", starDBInStorage);
            starDBInStorage = localStorage.getItem("starDB");
            starDBObj = JSON.parse(starDBInStorage);
            let starDBList = starDBObj[fNo].list;
            console.log(starDBList);

            starDBObj[fNo] = {
                'starMin': 0,
                'list': starDBList,
            }

            starDBInStorage = JSON.stringify(starDBObj);
            localStorage.setItem("starDB", starDBInStorage);
            props.starMinF();

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

    // starDB에서 별평점 가져오는 함수
    const getStarGrade = (fId) => {
        let starDBInStorage = localStorage.getItem("starDB");
        if (starDBInStorage !== null) {
            let starDBObj = JSON.parse(starDBInStorage);
            let starFIdObj = starDBObj[fId];
            let starMinObj = starFIdObj.starMin;
            console.log(starMinObj);
            console.log(starFIdObj.starMin);
            return starMinObj;
        } else {
            let festivalNo = '';
            let newStarObj = [{
                [festivalNo]: {
                    'starMin': '',
                    'list': '',
                },
            },
            ];

            starDBInStorage = JSON.stringify(newStarObj);
            localStorage.setItem("starDB", starDBInStorage);

            for (let i = 0; i < festData.length; i++) {
                starDBInStorage = localStorage.getItem("starDB");
                let starDBObj = JSON.parse(starDBInStorage);
                starDBObj[i] = {
                    'starMin': 0,
                    'list': '',
                }

                let addStarObj = JSON.stringify(starDBObj);
                localStorage.setItem("starDB", addStarObj);
            }
        }
    }

    // reviewDB 가져오는 함수
    const parseReviewDB = () => {
        console.log("getReviewDBObjs() Called!");

        let reviewDBinStorage = localStorage.getItem("reviewDB");
        if (reviewDBinStorage === null) {
            let reviewNo = 0;
            let newDBObj = {
                ["count"]: reviewNo,
                ["rData"]: {
                    [reviewNo]: {
                        "uId": "",
                        "fDataId": "",
                        "fTitle": "",
                        "rDateTime": "",
                        "uReview": "",
                        "rNo": "",
                        "star": "",
                    },
                },
            };

            reviewDBinStorage = JSON.stringify(newDBObj);
            localStorage.setItem("reviewDB", reviewDBinStorage);
            reviewDBinStorage = localStorage.getItem("reviewDB");
            let reviewDBObjs = JSON.parse(reviewDBinStorage);
            return reviewDBObjs;
        } else {
            let reviewDBObjs = JSON.parse(reviewDBinStorage);
            return reviewDBObjs;
        }
    };

    // memberDB 가져오는 함수
    const parseMemberDB = () => {
        console.log("parseMemberDB() Called!");

        let reviewDBinStorage = localStorage.getItem("memberDB");
        let memberDBObjs = JSON.parse(reviewDBinStorage);
        setMemberDBObjs(memberDBObjs);
        return memberDBObjs;
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
                    {reviewsArr.length > 0 ?
                        <>
                            <ul>
                                {reviewsArr.map((reviews, idx) =>
                                    <li className="full_list" key={idx}>
                                        <div className="write_info">
                                            <span>{memberDBObjs[reviews.uId].name}</span>
                                            <span>{`${[reviews.rDateTime.split("일", 1),]}${"일"}`}</span>
                                            <span>★</span>
                                            <span>{reviews.star}</span>
                                        </div>
                                        <div className="review_value">
                                            <span>{reviews.uReview}</span>

                                            {reviews.uId == logInId
                                                ?
                                                <>
                                                    <button className="btn main modify_btn" onClick={(e) => mainReviewModifyBtnClickHandler(e, reviews.rNo, reviews.star)}>
                                                        수정
                                                    </button>
                                                    <button className="btn alert delete_btn" onClick={(e) =>
                                                        mainReviewDelBtnClickHandler(e, reviews.rNo, reviews.fDataId, reviews.star)}>
                                                        삭제
                                                    </button>
                                                </>
                                                : null}
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </>
                        :
                        <>
                            <div className="review_null">
                                현재 작성된 리뷰가 없습니다.
                            </div>
                        </>
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
                                starMinF={props.starMinF}
                            />
                        </>
                    ) : null}

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

                {reviewsArr.length > 10 ?
                    <div className="more_view_wrap">
                        <button type="button" className="more_btn" onClick={moreViewClickHandler}>
                            + 더보기
                        </button>

                        <button type="button" className="hide_btn" onClick={moreViewCancleClickHandler}>
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
