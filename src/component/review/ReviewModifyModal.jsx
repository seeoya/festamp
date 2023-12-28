import React, { useEffect, useState } from 'react';
import { getLoginedId } from './session';
import { getDateTime } from './getDateTime';
// import Star from '';


const ReviewModifyModal = (props) => {

   
    const [isShowModifyModal, setIsShowModifyModal] =useState(false);
    const [reviewNo, setReviewNo] = useState(0);
    const [rDateTime, setRDateTime] = useState('');
    const [uReview, setUReview] = useState('');
    const [festivalTitle, setFestivalTitle] = useState('');
    const [star, setStar] = useState('');    


    useEffect(() => {
    let reviewDBinStorage = localStorage.getItem('reviewDB');
    let reviewDBObjs = JSON.parse(reviewDBinStorage);
    let myReviewObjs = reviewDBObjs[getLoginedId()];
    let modifyMyReview = myReviewObjs[props.modifyKey];
        console.log('myReviewObjs: ', modifyMyReview);

        setDataTitle(props.festivalData[modifyMyReview.dataId].title);
        setUReview(modifyMyReview.uReview);
        // setStar(modifyMyReview.star);
        setRDateTime(getReviewDateTime());

        
    }, []);


    const uReviewChangeHandler = (e) => {
      console.log('uReviewChangeHandler() Called!');
      setUReview(e.target.value);
  }

    const modifyModalBtnClickHandler = () => {
      console.log('writeModalWrite Btn Clicked!');
    
      let reviewDBinStorage = localStorage.getItem('reviewDB');
      let reviewDBObjs = JSON.parse(reviewDBinStorage);
      let myReviewObjs = reviewDBObjs[getLoginedId()];
          console.log('myReviewObjs: ', myReviewObjs);
          modifyMyReview = myReviewObjs[props.modifyKey];
          modifyMyReview[props.modifyKey] = {
                    'dataId'    : modifyMyReview[dataId],
                    'rDateTime' : getReviewDateTime(),
                    'uReview'   : uReview,
                    'star'      : star,
                  }
   
            
        myReviewObjs[getLoginedId()] = modifyMyReview;
        let modifiedReviewStr = JSON.stringify(myReviewObjs);
        localStorage.setItem('reviewDB', modifiedReviewStr);

        console.log('Review modified success!');
        props.setIsShowModifyModal(false);

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
  
      <textarea cols="40" rows="5" vlaue={uReview} onChange={uReviewChangeHandler}>
        {`${rDateTime} | ${dataTitle} | ${uReview} | ${star}`}
      </textarea>
      <br />
      
      <button onClick={modifyModalBtnClickHandler}>수정</button>
   
    </div>
  );
}

export default ReviewModifyModal;