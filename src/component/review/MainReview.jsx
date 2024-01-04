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
    const [rStar, setRStar] = useState("");
    const [festivalDataId, setFestivalDataId] = useState(props.festivalDataId??"");
    const [festivalTitle, setFestivalTitle] = useState(props.festivalTitle??"");
    const [starGrade, setStarGrade] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    
    
    const [memberDBObjs,setMemberDBObjs] = useState("");


    useEffect(() => {
        console.log("useEffect() CALLED!!");
        
        let reviewDBObjs = parseReviewDB();
        let rDataObjs = reviewDBObjs.rData;

        let reviewskeys = [];
        for (let keys in rDataObjs) {
            reviewskeys.push(keys);
        }
        console.log(reviewskeys);

        let tempArr = [];
        let rStarArr = [];
        let fullArr = [];

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
                fullArr.push(reviews);
            }
        }
        console.log(rStarArr);

        setReviewsArr(fullArr);
        currentPosts(reviewsArr);
        setReviewsArr(currentPosts);

        console.log(festivalDataId);

        // let starDBInStorage = localStorage.getItem("starDB");           
        // let starDBObj = JSON.parse(starDBInStorage);
        // let starObj = starDBObj.sData;
        // let starFIdObj = starObj[festivalDataId];
        // let starMinObj = starFIdObj.starMin;
        // // setStarGrade(starMinObj);
        // console.log(starObj);
        // console.log(starMinObj);
        // console.log(starFIdObj.starMin);

        
    }, [festivalDataId, festivalTitle, tempFlag, isShowWriteModal, isShowModifyModal, currentPage]);

    useEffect(() => {
        parseMemberDB()
    },[])

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
                if(isReview.includes(logInId)){
                alert(`${festivalTitle} 리뷰를 이미 작성하셨습니다!`);
                } else {
                // write modal show
                setIsShowWriteModal(true);
                }
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
    const mainReviewDelBtnClickHandler = (e, rNo, fNo) => {
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

    // memberDB 가져오는 함수
    const parseMemberDB = () => {
        console.log("getparseMemberDB() Called!");

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
                             { reviewsArr.length > 0 ? 
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
                                {isLogIned ? (<>
                                    <button className="btn main modify_btn" onClick={(e) =>  mainReviewModifyBtnClickHandler(e, reviews.rNo, reviews.star)}>
                                        수정
                                    </button>
                                    <button className="btn main delete_btn" onClick={(e) => mainReviewDelBtnClickHandler(e, reviews.rNo, reviews.fDataId)}>
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
                    <div className="review_null">
                        현재 작성된 리뷰가 없습니다.
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
                
                {reviewsArr.length > 0 ?

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
