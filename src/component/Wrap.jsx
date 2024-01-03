import React, { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

import { festivalData } from "../data/festivalData";

const Wrap = () => {
    const [isLogIned, setIsLogIned] = useState(false);
    const [logInId, setLogInId] = useState("");

    // 별점 평균 구하기
    // let parseReviewDB = JSON.parse(localStorage.getItem('reviewDB'));
    // let idReviewDB = localStorage.getItem('idReviewDB');
    // localStorage.setItem('idReviewDB', '')

    useEffect(() => {
        console.log("useEffect() CALLED");

        let reviewNo = 0;
        let reviewDBinStorage = localStorage.getItem("reviewDB");
        if (reviewDBinStorage === null) {
            let reviewNo = 0;
            let newDBObj = {
                ["count"]: reviewNo,
                ["rData"]: {
                    [reviewNo]: {
                        uId: "",
                        fDataId: "",
                        fTitle: "",
                        rDateTime: "",
                        uReview: "",
                        rNo: "",
                        star: "",
                    },
                },
            };

            reviewDBinStorage = JSON.stringify(newDBObj);
            localStorage.setItem("reviewDB", reviewDBinStorage);
        }

        //     // let reviewDBObjs = parseReviewDB();
        //     // let rDataObjs = reviewDBObjs.rData;

        //     // console.log(rDataObjs);
        //     let arr = Object.keys(rDataObjs);
        //     //  [0 1,2,3,4,5,6,7] = key (리뷰넘버)

        //     // 새로운 객체
        //     let tempArr = {};

        //     arr.map((el) => {
        //         let arrFestivalNo = rDataObjs[el].fDataId;

        //         if (tempArr[arrFestivalNo]) {
        //             tempArr[arrFestivalNo] = {
        //                 star: '',   // 평균 : 모든 star값 더하고 tempArr[arrFestivalNo].list.length로 나눠줌
        //                 list: [...tempArr[arrFestivalNo].list, rDataObjs[el].star]
        //             }
        //         } else {
        //             tempArr[arrFestivalNo] = {
        //                 star: "",
        //                 list: [rDataObjs[el].star]
        //             }
        //         }
        //     });

        //     // let averageStar = tempArr[rDataObjs[el].fDataId].list

        //     console.log("111111111111111", Object.keys(tempArr));
        //     // console.log(tempArr);

        //     // localStorage.setItem('idReviewDB', JSON.stringify(tempArr));
        //     // console.log(idReviewDB);
    }, []);

    let loginInfo = {
        isLogIned: isLogIned,
        setIsLogIned: setIsLogIned,
        logInId: logInId,
        setLogInId: setLogInId,
    };

    // useEffect(() => {
    //     평점세팅();
    // }, [])

    // function 평점세팅() {
    //     // db 리뷰 > star > filter > DB(key: 27)
    //     // setItem("asd")
    // };

    // props.평점세팅()
    return (
        <div id="wrap">
            <Header loginInfo={loginInfo} />
            <Container festivalData={festivalData} loginInfo={loginInfo} />
            <Footer />
        </div>
    );
};

export default Wrap;
