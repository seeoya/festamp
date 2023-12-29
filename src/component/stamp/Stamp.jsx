import React, { useEffect, useState } from "react";
import "./stamp.css";

// 해야할 일 : 리뷰 데이터를 받는다 -> 리뷰데이터에 있는 축제 번호를 받는다 
//              -> 축제 번호에 해당하는 사진 데이터(스탬프나 축제사진)을 받는다 -> 이미지에 쏴준다 -> 끝
// 스탬프 위치 바꾸는건? switch case 1st (`img${Num}`) = undifined 면 1에 채워지고 아님 2로 넘어가고 
// switch문을 쓰는데 if(reviewNum=1,2,3,...)을 넣어야하는데 너무 길어지는거 아닌가?

const Stamp = () => {

    // hook
    const [myStampArr, setMyStampArr] = useState([]);

    useEffect(() => {
        console.log('useEffect CALLED');

        let reviewObjInStorage = localStorage.getItem('reviewDB');
        let curReviewDBObj = JSON.parse(reviewObjInStorage);
        setMyStampArr(curReviewDBObj);
    }, []);
    

    // function

    return (
        <>
            <div className="stamp_wrap">
                <table class="stamp_table">
                    <tbody>
                        <tr>
                            <td colSpan={5} className="stamp_title">
                                보노보노의 경기도 축제 스탬프
                            </td>
                        </tr>
                        <tr>
                            <td className="stamp_date">
                                23.12.31
                            </td>
                            <td className="stamp_date">
                                23.12.31
                            </td>
                            <td className="stamp_date">
                                23.12.31
                            </td>
                            <td className="stamp_date">
                                23.12.31
                            </td>
                            <td className="stamp_date">
                                23.12.31
                            </td>
                        </tr>
                        <tr>
                            <td className="stamp_img_wrap">
                                <div>
                                    <img src="./imgs/festival/img1.jpg" />
                                </div>
                            </td>
                            <td className="stamp_img_wrap">
                                <div>
                                    <img src="./imgs/festival/img20.jpg" />
                                </div>
                            </td>
                            <td className="stamp_img_wrap">
                                <div>
                                    <img src="./imgs/festival/img7.jpg" />
                                </div>
                            </td>
                            <td className="stamp_img_wrap">
                                <div>
                                    <img src="./imgs/festival/img4.jpg" />
                                </div>
                            </td>
                            <td className="stamp_img_wrap">
                                <div>
                                    <img src="./imgs/festival/img16.jpg" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className="stamp_date">
                                23.12.31
                            </td>
                            <td className="stamp_date">
                                23.12.31
                            </td>
                            <td className="stamp_date">
                                23.12.31
                            </td>
                            <td className="stamp_date">
                                23.12.31
                            </td>
                            <td className="stamp_date">
                                23.12.31
                            </td>
                        </tr>
                        <tr>
                            <td className="stamp_img_wrap">
                                <div>
                                    <img src="./imgs/festival/img8.jpg" />
                                </div>
                            </td>
                            <td className="stamp_img_wrap">
                                <div>
                                    <img src="./imgs/festival/img12.jpg" />
                                </div>
                            </td>
                            <td className="stamp_img_wrap">
                                <div>
                                    <img src="./imgs/festival/img23.jpg" />
                                </div>
                            </td>
                            <td className="stamp_img_wrap">
                                <div>
                                    <img src="./imgs/festival/img7.jpg" />
                                </div>
                            </td>
                            <td className="stamp_img_wrap">
                                <div>
                                    <img src="./imgs/festival/img19.jpg" />
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Stamp;