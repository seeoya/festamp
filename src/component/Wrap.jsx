import React, { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

import { festivalData } from "../data/festivalData";

const Wrap = () => {
    const [isLogIned, setIsLogIned] = useState(false);
    const [logInId, setLogInId] = useState("");
    const [starMin, setStarMin] = useState(0);
    const [festivalNo, setFestivalNo] = useState('');
    let festivalDataId = festivalData.id;

    useEffect(() => {
        // reviewDB 생성
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
        }

        // starDB 생성
        let starDBInStorage = localStorage.getItem("starDB");

        if (starDBInStorage === null) {
            let newStarObj = [{
                [festivalNo]: {
                    'starMin': starMin,
                    'list': '',
                },
            },];
            starDBInStorage = JSON.stringify(newStarObj);
            localStorage.setItem("starDB", starDBInStorage);

            for (let i = 0; i < festivalData.length; i++) {
                starDBInStorage = localStorage.getItem("starDB");
                let starDBObj = JSON.parse(starDBInStorage);
                starDBObj[i] = {
                    'starMin': starMin,
                    'list': '',
                }

                let addStarObj = JSON.stringify(starDBObj);
                localStorage.setItem("starDB", addStarObj);
            }
        }
        starMinF();
    }, []);


    const starMinF = () => {
        // reviewDB 가져오기
        let reviewDBinStorage = localStorage.getItem("reviewDB");
        let parseReviewDB = JSON.parse(reviewDBinStorage);
        let reviewDBObjs = parseReviewDB;
        let rDataObjs = reviewDBObjs.rData;

        let arr = Object.keys(rDataObjs);
        arr.shift();
        let tempArr = {};

        arr.map((el) => {    // 리뷰DB 키배열을 맵으로 돌림
            let arrFestivalNo = rDataObjs[el].fDataId;

            if (tempArr[arrFestivalNo]) {
                tempArr[arrFestivalNo] = {
                    starMin: "",   // tempArr에 해당리뷰가 있으면 list에 모든 star값 input(누적)
                    list: [...tempArr[arrFestivalNo].list, rDataObjs[el].star]
                }
            } else {
                tempArr[arrFestivalNo] = {
                    starMin: "",    // tempArr에 해당리뷰가 없으면 list에 해당 star값 input
                    list: [rDataObjs[el].star]
                }
            }
        });

        let festivalNo = Object.keys(tempArr);

        festivalNo.map((el) => {
            let listStar = tempArr[el].list;
            let starMinList = tempArr[el].starMin;

            let sum = 0;
            let newList = listStar.filter((n) => {
                return n;
            });

            newList.map((n) => {
                sum += parseFloat(n) || 0;
                let avrStar = sum / listStar.length;
                let dpStar = avrStar.toFixed(1);

                // starList에 dpStar값 넣기
                tempArr[el] = {
                    starMin: dpStar,    // 평점 input
                    list: listStar      // 해당 리스트 값 input
                }
            });
        });

        let festNoArr = Object.keys(tempArr);

        let starDBInStorage = localStorage.getItem("starDB");
        let starDBObj = JSON.parse(starDBInStorage);

        festNoArr.map((el) => {   // festNo 객체 키배열을 맵으로 돌림
            let starObj = tempArr[el].starMin;
            let listStarObj = tempArr[el].list;

            starDBObj[el] = {
                'starMin': starObj,
                'list': listStarObj,
            }

            // starDBObj = starObj;
            let addStarObj = JSON.stringify(starDBObj);
            localStorage.setItem("starDB", addStarObj);
        });
    }

    let loginInfo = {
        isLogIned: isLogIned,
        setIsLogIned: setIsLogIned,
        logInId: logInId,
        setLogInId: setLogInId,
    };

    return (
        <div id="wrap">
            <Header loginInfo={loginInfo} />
            <Container festivalData={festivalData} loginInfo={loginInfo} starMinF={starMinF} />
            <Footer />
        </div>
    );
};

export default Wrap;
