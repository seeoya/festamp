import React, { useEffect, useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

import { festivalData } from "../data/festivalData";

const Wrap = () => {
    const [isLogIned, setIsLogIned] = useState(false);
    const [logInId, setLogInId] = useState("");
    let festivalDataId = festivalData.id;

    useEffect(() => {
        console.log("useEffect() CALLED");

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
            let festivalNo = 0;
            let newStarObj = {
                ['sData'] : {
                [festivalNo]: {
                    'starMin': '',
                    },
                },
            };
            console.log(festivalNo);
            let starDBInStorage = JSON.stringify(newStarObj);
            localStorage.setItem("starDB", starDBInStorage);
           
        }
        

        // reviewDB 가져오기
        let parseReviewDB = JSON.parse(reviewDBinStorage);
        let reviewDBObjs = parseReviewDB;
        let rDataObjs = reviewDBObjs.rData;
        console.log(rDataObjs);

        // 별 평점 (리뷰 키맵 생성)
        let arr = Object.keys(rDataObjs);
        arr.shift();
        //  [0 1,2,3,4,5,6,7] = key (리뷰넘버)
        console.log(arr);
        // 새로운 객체
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
        console.log(tempArr);

        //리뷰DB의 festivalNo 객체 키맵 생성
        let festivalNo = Object.keys(tempArr);
        // [0, 2, 26, 22]

        // el = festivalNo
        festivalNo.map((el) => {   // festivalNo 객체 키배열을 맵으로 돌림
            let listStar = tempArr[el].list;
            // ["", "5", "4", "3", "", ""]
            let starMinList = tempArr[el].starMin;
            // ""
            console.log('listStar: ', listStar);
            console.log('starMinList: ', starMinList);


            // 축제No별 별점 리스트 맵
            let sum = 0;
            // n = listStar
            let newList = listStar.filter((n) => {
                                return n;
            });
            console.log(newList);

                newList.map((n) => {
            
                    sum += parseFloat(n) || 0;  // 리스트의 모든 값을 더해줌
                    console.log(sum);

                        // 평균 구하고 소숫점 1자리까지 표현
                        let avrStar = sum / listStar.length;
                        let dpStar = avrStar.toFixed(1);
                        console.log(dpStar);

                        // starList에 dpStar값 넣기
                        tempArr[el] = {
                        starMin: dpStar,    // 평점 input
                        list: [listStar]      // 해당 리스트 값 input
                        }
                   
                }); 
        });
        console.log(tempArr);

        // 평점을 starDB에 저장
       
        let festNoArr = Object.keys(tempArr);
        console.log(festNoArr);
        
        starDBInStorage = localStorage.getItem("starDB");        
        let starDBObj = JSON.parse(starDBInStorage);
        let starObj = starDBObj.sData;
        console.log('starObj: ', starObj);
        
        festNoArr.map((el) => {   // festNo 객체 키배열을 맵으로 돌림
            
            let starMinObj = tempArr[el].starMin;
            console.log('starMinObj: ', starMinObj);
                         
            starObj[el] = {
                'starMin': starMinObj            
                }
            
            starDBObj['sData'] = starObj;
            let addStarObj = JSON.stringify(starObj);
            localStorage.setItem("starDB", addStarObj);
        });
       

    }, []);

    let loginInfo = {
        isLogIned: isLogIned,
        setIsLogIned: setIsLogIned,
        logInId: logInId,
        setLogInId: setLogInId,
    };

    
    return (
        <div id="wrap">
            <Header loginInfo={loginInfo} />
            <Container festivalData={festivalData} loginInfo={loginInfo} />
            <Footer />
        </div>
    );
};

export default Wrap;
