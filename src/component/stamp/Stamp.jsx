import React, { useEffect, useState } from "react";
import "./stamp.css";

// 해야할 일 : 리뷰 데이터를 받는다 -> 리뷰데이터에 있는 축제 번호를 받는다 
//              -> 축제 번호에 해당하는 사진 데이터(스탬프나 축제사진)을 받는다 -> 이미지에 쏴준다 -> 끝
// 스탬프 위치 바꾸는건? switch case 1st (`img${Num}`) = undifined 면 1에 채워지고 아님 2로 넘어가고 
// switch문을 쓰는데 if(reviewNum=1,2,3,...)을 넣어야하는데 너무 길어지는거 아닌가?
// 날짜는 map함수로 받아쓴다

const Stamp = () => {

    // hook
    const [myStampArr, setMyStampArr] = useState([]);

    useEffect(() => {
        console.log('useEffect CALLED');

        let reviewObjInStorage = localStorage.getItem('reviewDB');
        let curReviewDBObj = JSON.parse(reviewObjInStorage);
        // setMyStampArr(curReviewDBObj[u_id]);
    }, []);
    

    // function



    return (
        <>
            <div className="stamp_wrap">
                <div class="stamp_item">Title</div>
                <div class="stamp_item date">A</div>
                <div class="stamp_item date">B</div>
                <div class="stamp_item date">C</div>
                <div class="stamp_item date">D</div>
                <div class="stamp_item date">E</div>
                <div class="stamp_item stamp_img">
                    <img src="#" />
                </div>
                <div class="stamp_item stamp_img">
                    <img src="#" />
                </div>
                <div class="stamp_item stamp_img">
                    <img src="#" />
                </div>
                <div class="stamp_item stamp_img">
                    <img src="#" />
                </div>
                <div class="stamp_item stamp_img">
                    <img src="#" />
                </div>
                <div class="stamp_item date">A</div>
                <div class="stamp_item date">B</div>
                <div class="stamp_item date">C</div>
                <div class="stamp_item date">D</div>
                <div class="stamp_item date">E</div>
                <div class="stamp_item stamp_img">
                    <img src="#" />
                </div>
                <div class="stamp_item stamp_img">
                    <img src="#" />
                </div>
                <div class="stamp_item stamp_img">
                    <img src="#" />
                </div>
                <div class="stamp_item stamp_img">
                    <img src="#" />
                </div>
                <div class="stamp_item stamp_img">
                    <img src="#" />
                </div>
            </div>
        </>
    );
}

export default Stamp;