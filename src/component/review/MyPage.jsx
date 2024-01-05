import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stamp from "../stamp/StampPage";
import ReviewModifyModal from "./ReviewModifyModal";
import "./mypage.css";

const MyPage = (props) => {

    let logInId = props.loginInfo.logInId;

    const [myReviewsArr, setMyReviewsArr] = useState([]);
    const [tempFlag, setTempFlag] = useState(true);
    const [modifyKey, setModifyKey] = useState("");
    const [isShowModifyModal, setIsShowModifyModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [rStar, setRStar] = useState("");
    

    // 네비게이터 설정
    let navigate = useNavigate('');

    // 로그인 확인
    useEffect(() => {

        if (!logInId) {
            alert('로그인이 필요한 서비스 입니다');
            navigate('/signin');
        } else {

        }
    }, []);

    useEffect(() => {
        console.log("useEffect() CALLED!!");

        // reviewDB 가져와서 리스트 배열 생성

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


    // MY리뷰 수정 버튼 이벤트 핸들러
    const myReviewModifyBtnClickHandler = (e, rNo, rStar) => {
        console.log("reviewModifyBtnClickHandler() Called!");

        setModifyKey(rNo);
        setRStar(rStar);
        setIsShowModifyModal(true);
    };

    // MY리뷰 삭제 버튼 이벤트 핸들러
    const myReviewDelBtnClickHandler = (e, rNo, fNo, rStar) => {
        console.log("reviewDelBtnClickHandler() Called!");

        let result = window.confirm("리뷰를 삭제하시겠습니까?");

        if (result) {

            // reviewDB에서 해당 리뷰 번호 삭제
            let reviewDBObjs = parseReviewDB();
            let myReviews = reviewDBObjs.rData;

            delete myReviews[rNo];

            reviewDBObjs.rData = myReviews;
            console.log("reviewDBObjs.rData: ", reviewDBObjs.rData);

            let reviewDBInStorage = JSON.stringify(reviewDBObjs);
            localStorage.setItem("reviewDB", reviewDBInStorage);

            console.log("reviewDBInStorage: ", reviewDBInStorage);

            // starDB에서 해당 별점 삭제와 평점 초기화 및 업데이트
            let starDBInStorage = localStorage.getItem("starDB");
            let starDBObj = JSON.parse(starDBInStorage);

                const findNumber = (el) => {
                    if(el === rStar) {
                    return true;
                    }
                }
            let delIdx =  starDBObj[fNo].list.findIndex(findNumber);
            if (delIdx !== null && delIdx !== '' || delIdx !== undefined ) {
                delete starDBObj[fNo].list[delIdx];            
            }
                starDBInStorage = JSON.stringify(starDBObj);
                localStorage.setItem("starDB", starDBInStorage);
            
                
                starDBInStorage = localStorage.getItem("starDB");
                starDBObj = JSON.parse(starDBInStorage);
                
                let starDBList = starDBObj[fNo].list;
                console.log(starDBList);

                starDBObj[fNo] = {
                    'starMin' : 0,
                    'list' : starDBList,
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
    <>
        {logInId
        ?
        <div className="my_page sec">

            <div className="my_stamp ">
                <p className="sec_item_title"><h1>MY STAMP</h1></p>

                <Stamp myReviewsArr={myReviewsArr} logInId={logInId} festivalData={props.festivalData} />
            </div>

            <div id="review_wrap" className="view_review_list sec_item">
                <ul>
                    <li className="sec_item_title"><h1>MY REVIEW</h1></li>
                    {myReviewsArr.map((myReview, idx) => (
                        <li className="full_list">
                            <div className="write_info">
                                <span> {myReview.fTitle}</span>
                                <span>{`${[myReview.rDateTime]}`}</span>
                                <span>★</span>
                                <span>{myReview.star}</span>
                            </div>
                            <div className="review_value">
                                <span>{myReview.uReview}</span>
                                <button className="btn main" onClick={(e) => myReviewModifyBtnClickHandler(e, myReview.rNo, myReview.star)}>
                                    수정
                                </button>
                                <button className="btn alert" onClick={(e) => myReviewDelBtnClickHandler(e, myReview.rNo, myReview.fDataId, myReview.star)}>
                                    삭제
                                </button>
                            </div>

                        </li>
                    ))}
                </ul>

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
            {myReviewsArr.length > 10 ?
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
        :
        null
    }
        
        </>
    );
};

export default MyPage;
