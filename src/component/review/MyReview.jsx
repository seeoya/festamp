import React, { useEffect, useState } from 'react'
import ReviewModifyModal from './ReviewModifyModal';

const MyReview = (props) => {


    const [myReviewArr, setMyRiviewArr] = useState([]);
    const [tempFlag, setTempFlag] = useState(true);
    const [modifyKey, setModifyKey] = useState('');


    useEffect(( ) => {
      console.log('useEffect() CALLED!!');

    let reviewDBObjs = getReviewDB();
    let myReviewObjs = reviewDBObjs[getLoginedId()];

    let myReviewKeys = [];
    for(let keys in myReviewObjs) {
        myReviewKeys.push(keys);
    }

    let tempArr = [];
    for(let i=0; i < myReviewKeys.length; i++) {
        let myReview = myReviewObjs[myReviewKeys[i]]; //i번째 review 전달
        myReview['key'] = myReviewKeys[i];  // i번째 키값 전달
        tempArr.push(myReview);
         
    }
    setMyRiviewArr(tempArr);
    
  }, [tempFlag, isShowModifyModal]);   

  const myReviewModifyBtnClickHandler = (e, reviewNo) => {
    console.log('reviewModifyBtnClickHandler() Called!');

    setIsShowModifyModal(true);
    setModifyKey(reviewNo);
  }

  const myReviewDelBtnClickHandler = (e, reviewNo) => {
    console.log('reviewDelBtnClickHandler() Called!');
    
    let result = window.confirm('리뷰를 삭제하시겠습니까?');

        if (result) {
          let reviewDBObjs = getReviewDBObjs();  
          let myReviews = reviewDBObjs[getLoginedId()];

            delete myReviews[reviewNo];

            reviewDBObjs[getLoginedId()] = myReviews;
              console.log('reviewDBObjs: ', reviewDBObjs);

          let reviewDBInStorage = JSON.stringify(reviewDBObjs);
            localStorage.setItem('reviewDB', reviewDBInStorage);

              console.log('reviewDBInStorage: ', reviewDBInStorage);

            alert('삭제되었습니다.');

            setTempFlag((pv) => !pv);

        } else {
            alert('취소되었습니다.');

        }
  }

   // reviewDB 가져오는 함수
   const getReviewDBObjs = () => {
    console.log('getReviewDBObjs() Called!');

    let reviewDBinStorage = localStorage.getItem('reviewDB');
    let reviewDBObjs = JSON.parse(reviewDBinStorage);

        return reviewDBObjs;
    }

  return (
    <div className='my_review_wrap'>

        <div className='my_review_list_wrap'>

            <ul>
              <li>===== MY REVIEW =====</li>
                   { myReviewArr.map((myReview, idx) =>
                    
                <>
                <li>
                    {`${[{idx}]}`}&nbsp;&nbsp;
                      {myReview}&nbsp;&nbsp;
                      {myReviewArr.star}&nbsp;&nbsp;
                      <button onClick={(e) => myReviewModifyBtnClickHandler(e, myReviewArr.reviewNo)}>수정</button>&nbsp;&nbsp;
                      <button onClick={(e) => myReviewDelBtnClickHandler(e, myReviewArr.reviewNo)}>삭제</button>
                </li>
                </>
                   )}
            </ul>
            {
              isShowModifyModal
              ?
              <>
              <ReviewModifyModal modifyKey={setModifyKey} />
              </>
              : null
            }
        </div>
    
    </div>
  );
}

export default MyReview;