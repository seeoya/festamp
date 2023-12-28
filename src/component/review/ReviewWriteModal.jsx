import React, { useEffect, useState } from 'react';
import { getLoginedId } from './session';
// import Star from '';


const ReviewWriteModal = (props) => {

    const [isShowWriteModal, setIsShowWriteModal] = useState(false);
    const [isShowModifyModal, setIsShowModifyModal] =useState(false);
    const [reviewNo, setReviewNo] = useState(0);
    const [rDateTime, setRDateTime] = useState('');
    const [uReview, setUReview] = useState('');
    const [starInput, setStarInput] = useState('');
    const [dataId, setDataId] = useState('');    
    
    
    
    const uReviewChangeHandler = (e) => {
        console.log('uReviewChangeHandler() Called!');
        setUReview(e.target.value);
    }

    const writeModalBtnClickHandler = () => {
        console.log('writeModalWrite Btn Clicked!');
        setReviewNo(++1);
        setDataId(props.dataId);

    let reviewDBinStorage = localStorage.getItem('reviewDB');
    let reviewDBObjs = JSON.parse(reviewDBinStorage);
    let myReviewObjs = reviewDBObjs[getLoginedId()];
        console.log('myReviewObjs: ', myReviewObjs);
    
        myReviewObjs[reviewNo] = {
                  'dataId'    : dataId,
                  'rDateTime' : getReviewDateTime(),
                  'uReview'   : uReview,
                  'star'      : starInput,
                }
            
        reviewDBObjs[getLoginedId()] = myReviewObjs;
        let addReviewStr = JSON.stringify(reviewDBObjs);
        localStorage.setItem('reviewDB', addReviewStr);

        console.log('Review write success!');
        props.setIsShowWriteModal(false);

    }

    const modifyModalBtnClickHandler = () => {
      console.log('writeModalWrite Btn Clicked!');
    
    





    
            
        reviewDBObjs[getLoginedId()] = myReviewObjs;
        let addReviewStr = JSON.stringify(reviewDBObjs);
        localStorage.setItem('reviewDB', addReviewStr);

        console.log('Review write success!');
        props.setIsShowWriteModal(false);

    }
  



  // reviewDB 가져오는 함수
  const getReviewDBObjs = () => {
    console.log('getReviewDBObjs() Called!');

    let reviewDBinStorage = localStorage.getItem('reviewDB');
    let reviewDBObjs = JSON.parse(reviewDBinStorage);

        return reviewDBObjs;
}


  
  return (
 


    <div className='review_modal_wrap'>

      <Star setStarInput={setStarInput} starInput={starInput}/>
      <textarea cols="40" rows="5" vlaue={uReview} onChange={uReviewChangeHandler}></textarea>
      <br />
   
      {
        isShowWriteModal
        ?
      <>
      <button onClick={writeModalBtnClickHandler}>저장</button>
      </>
      : null
      }
      {
        isShowModifyModal
        ?
      <>
      <button onClick={modifyModalBtnClickHandler}>수정</button>
      </>
      : null
      }
   
    </div>
  );
}

export default ReviewWriteModal;