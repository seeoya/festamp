import React, { useEffect, useState } from 'react';
import { getLoginedId, setLoginedId } from './session';
import { getDateTime } from './getDateTime';
// import Star from '';


const ReviewModifyModal = (props) => {
  
    
    const [oldFTitle,setOldFTitle] = useState('');
    const [oldRDateTime, setOldRDateTime] = useState('');
    const [uReview, setUReview] = useState('');
    const [oldUReview, setOldUReview] = useState('');
    const [oldStar, setOldStar] = useState('');
    
    let modifyKey = props.modifyKey;
       

    useEffect(() => {
  
      console.log('modifyKey: ', props.modifyKey);

      let reviewDBObjs = parseReviewDB();
      let reviewObjs = reviewDBObjs.rData;
      let modifyMyReview = reviewObjs[modifyKey];
          console.log('modifyMyReview: ', modifyMyReview);
         
      setOldFTitle(modifyMyReview.fTitle);
      setOldRDateTime(modifyMyReview.rDateTime);
      setOldUReview(modifyMyReview.uReview);
      setOldStar(modifyMyReview.star);
   
        
    }, [oldFTitle, oldRDateTime, oldUReview, oldStar]);


    const uReviewChangeHandler = (e) => {
      console.log('uReviewChangeHandler() Called!');
      setUReview(e.target.value);
    }

    const modifyModalBtnClickHandler = () => {
      console.log('modifyModal Btn Clicked!');
      
      
      let reviewDBinStorage = localStorage.getItem('reviewDB');
      let reviewDBObjs = JSON.parse(reviewDBinStorage);
      let reviewObjs = reviewDBObjs.rData;
      let modifyMyReview = reviewObjs[modifyKey];

          console.log('modifyMyReview: ', modifyMyReview);

      // let modifyMyReview = reviewObjs[modifyKey];
          reviewObjs[modifyKey] = {
                    'uId'        : modifyMyReview['uId'],
                    'fDataId'    : modifyMyReview['fDataId'],
                    'fTitle'     : modifyMyReview['fTitle'],
                    'rDateTime'  : getDateTime(),
                    'uReview'    : uReview,
                    'rNo'        : modifyKey,
                    'star'       : modifyMyReview['oldStar'],
                  }
              
            reviewDBObjs.rData = reviewObjs;
        
        let modifiedReviewStr = JSON.stringify(reviewDBObjs);
        localStorage.setItem('reviewDB', modifiedReviewStr);

        console.log('Review modified success!');
        props.setIsShowModifyModal(false);

    }

    const parseReviewDB = () => {
      console.log('getReviewDBObjs() Called!');
  
      let reviewDBinStorage = localStorage.getItem('reviewDB');
      let reviewDBObjs = JSON.parse(reviewDBinStorage);
  
          return reviewDBObjs;
    }


  return (
 


    <div className='review_modify_modal'>

      {/* <Star setStar={setStar} star={star}/> */}
      <span>{`${oldRDateTime} | ${oldFTitle} | ${oldStar}`}</span>
      <br />
      <textarea
        name="oldUReview"
        defaultValue={oldUReview}
        value = {uReview}
        onChange={uReviewChangeHandler}
        rows="5"
        cols="50"
      />
      <br />
      <button onClick={modifyModalBtnClickHandler}>수정</button>
   
    </div>
  );
}

export default ReviewModifyModal;