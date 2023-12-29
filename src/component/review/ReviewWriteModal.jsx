import React, { useEffect, useState } from 'react';
import { setLoginedId, getLoginedId } from './session';
import { getDateTime } from './getDateTime';
import { ObjectHTMLAttributes } from 'react';
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

    setFestivalDataId('02');
    setFestivalTitle('빙어축제');
    setStar('*****');
    setLoginedId('aa');
    setReviewNo(reviewNoIncrease());
    
  }, [setReviewNo]);

  const uReviewChangeHandler = (e) => {
    console.log('uReviewChangeHandler() Called!');
    setUReview(e.target.value);
  }

  const writeModalBtnClickHandler = () => {
    console.log('writeModalWrite Btn Clicked!');

   
    // setFestivalDataId(props.dataId);
    // setFestivalTitle(props.title);

    console.log('No: ', reviewNo);

    let uId = 'aa';
    let reviewDBObjs = parseReviewDB();
    let reviewObjs = reviewDBObjs.rData;
    let reviewCnt = reviewDBObjs.count+1;
    console.log('myReviewObjs: ', reviewObjs);

    reviewObjs[reviewCnt] = {      
              'uId' : uId,
              'fDataId': festivalDataId,
              'fTitle' : festivalTitle,
              'rDateTime' : getDateTime(),
              'uReview' : uReview,
              'rNo' : reviewNo,
              'star' : star,
      }
    reviewCnt = {reviewNo};
    
    reviewDBObjs['rData'] = reviewObjs;
    reviewDBObjs['count'] = reviewCnt;
    let addReviewStr = JSON.stringify(reviewDBObjs);
   
    localStorage.setItem('reviewDB', addReviewStr);
   

    console.log('Review write success!');
    props.setIsShowWriteModal(false);

  }
  // reviewNo 1씩 증가시키는 함수
  const reviewNoIncrease = () => {
    console.log('reviewNoIncrease() Called!');
    
    let reviewDBObjs = parseReviewDB();
        
        let reviewskeys = [];
        for (let keys in reviewDBObjs) {
          
            reviewskeys.push(keys);          
        }
     let reviewNum = reviewskeys.length;
        console.log('no:', reviewNum);
        return reviewNum;
  }


  // reviewDB 가져오는 함수
  const parseReviewDB = () => {
    console.log('parseReviewDB() Called!');

    let reviewDBinStorage = localStorage.getItem('reviewDB');
    if (reviewDBinStorage === null) {
      let uId = 'aa';
      let newDBObj = {
        [count] : reviewNo,
        [rData] :{
          [reviewNo]:
         {
                'uId' : uId,
                'dataId': festivalDataId,
                'title' : festivalTitle,
                'rDateTime' : getDateTime(),
                'uReview' : uReview,
                'rNo' : reviewNo,
                'star' : star,
        }
      }
    }
      reviewDBinStorage = JSON.stringify(newDBObj);
      localStorage.setItem('reviewDB', reviewDBinStorage);
      reviewDBinStorage = localStorage.getItem('reviewDB');

    }
    let reviewDBObjs = JSON.parse(reviewDBinStorage);
    console.log('reviewDBinStorage: ', reviewDBinStorage);
    console.log('reviewDBObjs: ', reviewDBObjs);
    return reviewDBObjs;

  }


  return (

    <div className='review_modal_wrap'>

      {/* <Star setStar={setStar} star={star}/> */}
      <textarea cols="80" rows="5" vlaue={uReview} onChange={(e) => uReviewChangeHandler(e)}></textarea>
      <br />

      <button onClick={writeModalBtnClickHandler}>저장</button>

    </div>
  );
}

export default ReviewWriteModal;