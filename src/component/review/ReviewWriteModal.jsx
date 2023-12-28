import React, { useEffect, useState } from 'react';
import { getLoginedId } from './session';
import { getDateTime } from './getDateTime';
// import Star from '';


const ReviewWriteModal = (props) => {

    
    const [reviewNo, setReviewNo] = useState(0);
    const [rDateTime, setRDateTime] = useState('');
    const [uReview, setUReview] = useState('');
    const [star, setStar] = useState('');
    const [festivalDataId, setFestivalDataId] = useState('');
    const [festivalTitle, setFestivalTitle] = useState('');
    
    
    const uReviewChangeHandler = (e) => {
        console.log('uReviewChangeHandler() Called!');
        setUReview(e.target.value);
    }

    const writeModalBtnClickHandler = () => {
        console.log('writeModalWrite Btn Clicked!');

        setReviewNo(reviewNo+1);
        setFestivalDataId(props.festivalDataId);
        setFestivalTitle(props.festivalTitle);

       
        let reviewDBObjs = getReviewDBObjs();
        let myReviewObjs = reviewDBObjs[getLoginedId()];
            console.log('myReviewObjs: ', myReviewObjs);
        
            myReviewObjs[reviewNo] = {
                  'dataId'    : festivalDataId,
                  'title'     : festivalTitle,
                  'rDateTime' : getDateTime(),
                  'uReview'   : uReview,
                  'star'      : star,
                }
            
        reviewDBObjs[getLoginedId()] = myReviewObjs;
        let addReviewStr = JSON.stringify(reviewDBObjs);
        localStorage.setItem('reviewDB', addReviewStr);

        console.log('Review write success!');
        props.isShowWriteModal(false);

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

      <Star setStar={setStar} star={star}/>
      <textarea cols="80" rows="5" vlaue={uReview} onChange={uReviewChangeHandler}></textarea>
      <br />
       
      <button onClick={writeModalBtnClickHandler}>저장</button>
      
    </div>
  );
}

export default ReviewWriteModal;