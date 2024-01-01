import React, { useEffect, useState } from 'react';
import { setLoginedId, getLoginedId } from './session';
import { getDateTime } from './getDateTime';

// import Star from '';


const ReviewWriteModal = (props) => {
  const [reviewNo, setReviewNo] = useState(0);
  const [rDateTime, setRDateTime] = useState('');
  const [uReview, setUReview] = useState('');
  

  const [star, setStar] = useState('');
  const [festivalDataId, setFestivalDataId] = useState('');
  const [festivalTitle, setFestivalTitle] = useState('');


  useEffect(() => {
    console.log('useEffect() CALLED!!');

    // setFestivalDataId(props.dataId);
    // setFestivalTitle(props.title);
    
    setFestivalDataId(props.festivalDataId);
    setFestivalTitle(props.festivalTitle);
    setStar('***');
    // setLoginedId('aa');
    
    
  }, [setFestivalDataId, setFestivalTitle]);

  // star onChange handler = () => {}

  const uReviewChangeHandler = (e) => {
    console.log('uReviewChangeHandler() Called!');
    setUReview(e.target.value);
  }

  const writeModalBtnClickHandler = () => {
    console.log('writeModalWrite Btn Clicked!');
  
    let uId = 'jin';
  
    let reviewDBObjs = parseReviewDB();
    let reviewObjs = reviewDBObjs.rData;
    let reviewCnt = reviewDBObjs.count+1;
    console.log('reviewObjs: ', reviewObjs);

    reviewObjs[reviewCnt] = {      
              'uId' : uId,
              'fDataId': festivalDataId,
              'fTitle' : festivalTitle,
              'rDateTime' : getDateTime(),
              'uReview' : uReview,
              'rNo' : reviewCnt,
              'star' : star,
      }
     
    reviewDBObjs['rData'] = reviewObjs;
    reviewDBObjs['count'] = reviewCnt;
    let addReviewStr = JSON.stringify(reviewDBObjs);
    localStorage.setItem('reviewDB', addReviewStr);
  
    console.log('Review write success!');
    props.setIsShowWriteModal(false);

  }
  
  // reviewDB 가져오는 함수
  const parseReviewDB = () => {
    console.log('parseReviewDB() Called!');

    let reviewDBinStorage = localStorage.getItem('reviewDB');
    if (reviewDBinStorage === null) {
      
      let newDBObj = {
        ['count'] : reviewNo,
        ['rData'] : {
            [reviewNo] : {
              'uId' : '',
              'fDataId': '',
              'fTitle' : '',
              'rDateTime' : '',
              'uReview' : '',
              'rNo' : '',
              'star' : '',
        }
      }
    }
      reviewDBinStorage = JSON.stringify(newDBObj);
      localStorage.setItem('reviewDB', reviewDBinStorage);
      reviewDBinStorage = localStorage.getItem('reviewDB');
    }

    let reviewDBObjs = JSON.parse(reviewDBinStorage);
    
    console.log('reviewDBObjs: ', reviewDBObjs);
    return reviewDBObjs;
  }


  return (

    <div className='review_write_modal'>

      {/* <Star setStar={setStar} star={star}/> */}
      <textarea cols="50" rows="5" vlaue={uReview} onChange={(e) => uReviewChangeHandler(e)}></textarea>
      <br />

      <button onClick={writeModalBtnClickHandler}>저장</button>

    </div>
  );
}

export default ReviewWriteModal;