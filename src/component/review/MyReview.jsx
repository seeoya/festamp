import React, { useEffect, useState } from 'react'
import ReviewModifyModal from './ReviewModifyModal';
import { getLoginedId, setLoginedId } from './session';


const MyReview = (props) => {


    const [myReviewArr, setMyRiviewArr] = useState([]);
    const [tempFlag, setTempFlag] = useState(true);
    const [modifyKey, setModifyKey] = useState('');
    const [isShowModifyModal, setIsShowModifyModal] = useState(false);

    

    useEffect(( ) => {
      
      console.log('useEffect() CALLED!!');

      let reviewDBObjs = parseReviewDB();
      let rDataObjs = reviewDBObjs.rData;
                          
      let reviewskeys = [];
      for (let keys in rDataObjs) {
        
          reviewskeys.push(keys);
        
      }
        console.log(reviewskeys);

      
      let tempArr = [];
    
      for (let i = 0; i < reviewskeys.length; i++) {
          let reviews = rDataObjs[reviewskeys[i]];

          let uId = 'aa';    // 로그인 아이디
         
          if(reviews.uId === uId) {    // getLoginedId()
              reviews['key'] = reviewskeys[i];
              console.log('reviewskeys[i]:', reviewskeys[i]);
                  
              tempArr.push(reviews);
            }
          }
        
         setMyRiviewArr(tempArr);
    
  }, [tempFlag, isShowModifyModal]);   

  const myReviewModifyBtnClickHandler = (e, rNo) => {
    console.log('reviewModifyBtnClickHandler() Called!');

    setModifyKey(rNo);
    setIsShowModifyModal(true);
    
  }

  const myReviewDelBtnClickHandler = (e, rNo) => {
    console.log('reviewDelBtnClickHandler() Called!');
    
    let result = window.confirm('리뷰를 삭제하시겠습니까?');

        if (result) {
          let reviewDBObjs = parseReviewDB();  
          let myReviews = reviewDBObjs.rData;

            delete myReviews[rNo];

            reviewDBObjs.rData = myReviews;
              console.log('reviewDBObjs.rData: ', reviewDBObjs.rData);

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
   const parseReviewDB = () => {
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
                      {`${[myReview.rDateTime]}`}&nbsp;&nbsp;
                      {myReview.fTitle}&nbsp;&nbsp;
                      {myReview.uReview}&nbsp;&nbsp;
                      {myReview.star}&nbsp;&nbsp;
                      <button onClick={(e) => myReviewModifyBtnClickHandler(e, myReview.rNo)}>수정</button>&nbsp;&nbsp;
                      <button onClick={(e) => myReviewDelBtnClickHandler(e, myReview.rNo)}>삭제</button>
                </li>
                </>
                   )}
            </ul>
            {
              isShowModifyModal
              ?
              <>
              <ReviewModifyModal setIsShowModifyModal={setIsShowModifyModal} modifyKey={modifyKey} />
              </>
              : null
            }
        </div>
    
    </div>
  );
}

export default MyReview;