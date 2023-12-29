import React, { useEffect, useState } from 'react';
import { getLoginedId, setLoginedId } from './session';
import { getDateTime } from './getDateTime';
// import Star from '';


const ReviewModifyModal = (props) => {

   
    const [isShowModifyModal, setIsShowModifyModal] =useState(false);
    const [reviewNo, setReviewNo] = useState(0);
    const [rDateTime, setRDateTime] = useState('');
    const [uReview, setUReview] = useState('');
   
    const [festivalDataId, setFestivalDataId] = useState('');
    const [festivalTitle, setFestivalTitle] = useState('');
    const [star, setStar] = useState('');    
    const [uId, setUId] = useState('');

    useEffect(() => {
    
    let reviewDBObjs = parseReviewDB();
    let myReviewObjs = reviewDBObjs[getLoginedId()];
    let modifyMyReview = myReviewObjs[props.modifyKey];
        console.log('myReviewObjs: ', modifyMyReview);

      setFestivalDataId('01');
      setFestivalTitle('빙어축제');
      setLoginedId('aa');
      setStar('*****');
      
        setUReview(modifyMyReview.uReview);
        // setStar(modifyMyReview.star);
        setRDateTime(getDateTime());

        
    }, []);


    const uReviewChangeHandler = (e) => {
      console.log('uReviewChangeHandler() Called!');
      setUReview(e.target.value);
  }

    const modifyModalBtnClickHandler = () => {
      console.log('modifyModal Btn Clicked!');
    
      // let reviewDBinStorage = localStorage.getItem('reviewDB');
      // let reviewDBObjs = JSON.parse(reviewDBinStorage);
      // let myReviewObjs = reviewDBObjs[getLoginedId()];
      //     console.log('myReviewObjs: ', myReviewObjs);
      //     modifyMyReview = myReviewObjs[props.modifyKey];
      //     modifyMyReview[props.modifyKey] = {
      //               'dataId'    : modifyMyReview[dataId],
      //               'title'     : modifyMyReview[title],
      //               'rDateTime' : getDateTime(),
      //               'uReview'   : uReview,
      //               'star'      : star,
      //             }
   
            
      //   myReviewObjs[getLoginedId()] = modifyMyReview;
      //   let modifiedReviewStr = JSON.stringify(myReviewObjs);
      //   localStorage.setItem('reviewDB', modifiedReviewStr);

      //   console.log('Review modified success!');
        props.setIsShowModifyModal(false);

    }
  
// reviewDB 가져오는 함수
const parseReviewDB = () => {
  console.log('reviewDBObjs() Called!');

  let reviewDBinStorage = localStorage.getItem('reviewDB');
  if (reviewDBinStorage === null) {
    let uId = 'aa';
    let newDBObj = {
      [count] : reviewNo,
      [rData] : {
              'uId' : uId,
              'dataId': festivalDataId,
              'title' : festivalTitle,
              'rDateTime' : getDateTime(),
              'uReview' : uReview,
              'rNo' : reviewNo,
              'star' : star,
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
{/*   
      <textarea cols="40" rows="5" vlaue={uReview} onChange={uReviewChangeHandler}>
        {`${rDateTime} | ${title} | ${uReview} | ${star}`}
      </textarea>
      <br />
       */}
      <button onClick={modifyModalBtnClickHandler}>수정</button>
   
    </div>
  );
}

export default ReviewModifyModal;