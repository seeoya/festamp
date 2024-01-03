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

        // 별 평점
        // reviewDBinStorage = localStorage.getItem("reviewDB");
        // let reviewDBObjs = JSON.parse(reviewDBinStorage);
        // let rDataObjs = reviewDBObjs.rData;
        // console.log(rDataObjs);

        // let reviewskeys = [];
        // for (let keys in rDataObjs) {
        //     reviewskeys.push(keys);
        // }
        // console.log(reviewskeys);

        // let tempArr = [];
        // let starMinArr = [];
        // let starNull;

        // for (let i = 0; i < festivalData.length; i++) {
        //     console.log(festivalData.length);

        //     for (let i = 0; i < reviewskeys.length; i++) {
        //         let reviews = rDataObjs[reviewskeys[i]];
                           
        //       if (reviews.fDataId === festivalData.id[i]) {
        //           tempArr.push(reviews.star);            
        //       } else {
        //         starNull = 0;
        //       }
        //     }

        //     if (starNull === 0){
        //         starMinArr.push(starNull);
        //     } else {
        //     let tempSum = tempArr.reduce((acc, curr) => acc + curr);
        //     let tempMin = Math.ceil((tempSum * 10 / tempArr.length) / 10);
        //     starMinArr.push(tempMin);
        //     }
        // }        
        
        // console.log(starMinArr);
        // console.log(starNull);
        
        
        // let arr = Object.keys(rDataObjs);
        // //  [0 1,2,3,4,5,6,7] = key (리뷰넘버)
        // console.log(arr);
        // // 새로운 객체
        // let tempArr = {};

        // arr.map((el) => {
        //     let arrFestivalNo = rDataObjs[el].fDataId;

        //     if (tempArr[arrFestivalNo]) {
        //         tempArr[arrFestivalNo] = {
        //             star: "",   // 평균 : 모든 star값 더하고 tempArr[arrFestivalNo].list.length로 나눠줌
        //             list: [...tempArr[arrFestivalNo].list, rDataObjs[el].star]
        //         }
        //     } else {
        //         tempArr[arrFestivalNo] = {
        //             star: "",
        //             list: [rDataObjs[el].star]
        //         }
        //     }
        }, []);

    //     let festivalNo = Object.keys(tempArr);
    //     // [0, 2, 26, 22]
    //     // 
    //     // el = festivalNo
    //     festivalNo.map((el) => {
    //         let listStar = tempArr[el].list;
    //         // ["", "5", "4", "3", "", ""]
    //         let starList = tempArr[el].star;
    //         // ""

    //         let sum = 0;
    //         // n = listStar
    //         let newList = listStar.filter((n) => {
    //             if (n !== "") {
    //                 return n;
    //             }
    //         })

    //         newList.map((n) => {
    //             sum += parseFloat(n) || 0;
    //             console.log(sum);

    //             if (n !== "") {
    //                 let avrStar = sum / listStar.length;
    //                 let dpStar = avrStar.toFixed(1);
    //                 // starList에 dpStar값 넣기
    //                 console.log(dpStar);
    //             } else
                
    //             console.log(tempArr);
    //         })
    //     })
    //     console.log(tempArr);
    // }, []);

    let loginInfo = {
        isLogIned: isLogIned,
        setIsLogIned: setIsLogIned,
        logInId: logInId,
        setLogInId: setLogInId,
    };

    // // useEffect(() => {
    // //     평점세팅();
    // // }, [])

    // // function 평점세팅() {
    // //     // db 리뷰 > star > filter > DB(key: 27)
    // //     // setItem("asd")
    // // };

    // // props.평점세팅()
    return (
        <div id="wrap">
            <Header loginInfo={loginInfo} />
            <Container festivalData={festivalData} loginInfo={loginInfo} />
            <Footer />
        </div>
    );
};

export default Wrap;
