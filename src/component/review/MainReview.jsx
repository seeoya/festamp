import React, {useState} from 'react';
import ReviewModifyModal from './ReviewModifyModal';
import ReviewWriteModal from './ReviewWriteModal';
import React, {useState, useEffect} from 'react';
import { getLoginedId } from './session';

const MainReview = (props) => {

  const [isLogined, setLogined] = useState(true);
  const [isShowWriteModal, setIsShowWriteModal] = useState(false);
  const [isShowModifyModal, setIsShowModifyModal] = useState(false);
  const [reviewsArr, setReviewsArr] = useState([]);
  const [tempFlag, setTempFlag] = useState(true);

  useEffect(() => {
    console.log('useEffect() CALLED!!');

    if (!isLogined) {
        let reviewDBObjs = getReviewDBObjs();  
       
        let reviewskeys = [];
        for (let keys in reviewDBObjs) {
            reviewskeys.push(keys);
        }

        let tempArr = [];
        for (let i = 0; i < reviewskeys.length; i++) {
            let reviews = reviewDBObjs[reviewskeys[i]];
               reviews['key'] = reviews.uId;
               reviews['key'] = reviews.uId;
               reviews['key'] = reviews.uReview;
               reviews['key'] = reviews.uReview;

            
            tempArr.push(reviews);

        }
        
        setReviewsArr(tempArr);
    }

}, [tempFlag, isShowWriteModal, isShowModifyModal]);

  const mainReviewWriteBtnClickHandler = () => {
    console.log('reviewWrite Btn Clicked!');
    // logined check  => 
    if(getLoginedId() === undefined || getLoginedId() === '' || getLoginedId() === null) {
      alert('로그인이 필요합니다.');

    } else {
         // write modal show
        setIsShowWriteModal(true);
    }
  }

  const mainReviewModifyBtnClickHandler = () => {
    console.log('reviewModify Btn Clicked()!');
    
    // modify modal show
    setIsShowModifyModal(true);
  }
 
  const mainReviewDelBtnClickHandler = (e, reviewNo) => {
    console.log('reviewDel Btn Clicked!');
           
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

    <div className='Main_review_wrap'>

        <div className='review_list_wrap'>
          <div className='review_head_wrap'>

              <tr>
                  <td>{festivalName} 리 뷰 |&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td>리뷰 {cnt}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                  <td>*****</td>    // 별점 표시
                  <td><button onClick={mainReviewWriteBtnClickHandler}>리뷰 쓰기</button></td>
              </tr>

          </div>

          <div className='review_list_wrap'>
            {
                isLogined
                ?
            <>
            <ul>
            <li>===== MY REVIEW =====</li>
                   { reviewsArr.map((review, idx) =>
                    
                <>
                <li>
                    {`${[{idx}]}`}&nbsp;&nbsp;
                      {review}&nbsp;&nbsp;
                      {reviewsArr.star}&nbsp;&nbsp;
                      <button onClick={(e) => mainReviewModifyBtnClickHandler(e, reviewsArr.reviewNo)}>수정</button>&nbsp;&nbsp;
                      <button onClick={(e) => mainReviewDelBtnClickHandler(e, reviewsArr.reviewNo)}>삭제</button>
                </li>
                </>
                   )}

            </ul>
            </>
                :
            <>
            <ul>  // 로그인 되지 않은 review list
                { reviewsArr.map((review, idx) =>
                    
                    <>
                    <li>
                        {`${[{idx}]}`}&nbsp;&nbsp;
                          {review}&nbsp;&nbsp;
                          {reviewsArr.star}
                    </li>
                    </> )}
            </ul>
            </>
            }
            {
              isShowWriteModal
              ?
            <>
              <ReviewWriteModal />
            </> : null  
            }
            
            {
              isShowModifyModal
              ?
              <>
              <ReviewModifyModal />
              </>
              : null
            }
        </div>
      </div>    
    </div>
    
  );
}

export default MainReview;
