import ReviewModifyModal from './ReviewModifyModal';
import ReviewWriteModal from './ReviewWriteModal';
import React, {useState, useEffect} from 'react';
import { getLoginedId, setLoginedId } from './session';
import { getDateTime } from './getDateTime';


const MainReview = (props) => {

  const [isLogined, setLogined] = useState(false);
  const [isShowWriteModal, setIsShowWriteModal] = useState(false);
  const [isShowModifyModal, setIsShowModifyModal] = useState(false);
  const [reviewsArr, setReviewsArr] = useState([]);
  const [tempFlag, setTempFlag] = useState(true);
  const [festivalDataId, setFestivalDataId] = useState('');
  const [festivalTitle, setFestivalTitle] = useState('');
  
  const [starDataId, setStarDataId] = useState('');
  const [reviewNo, setReviewNo] = useState(0);


  useEffect(() => {
    console.log('useEffect() CALLED!!');

    // setFestivalDataId(props.dataId);
    // setFestivalTitle(props.title);
    
    setFestivalDataId('02');
    setFestivalTitle('빙어축제');
    setStarDataId('******');
    
    

    // if (!isLogined) {
        let reviewDBObjs = parseReviewDB();
        let dataIdReviews = reviewDBObjs[festivalDataId]; 
               
        let reviewskeys = [];
        for (let keys in dataIdReviews) {
          
            reviewskeys.push(keys);
          
        }
          console.log(reviewskeys);

        let tempArr = [];
        for (let i = 0; i < reviewskeys.length; i++) {
            let reviews = dataIdReviews[reviewskeys[i]];
            
            // if (reviews.dataId === festivalDataId){
                reviews['key'] = reviewskeys[i];
                console.log('reviewskeys[i]:', reviewskeys[i]);
                     
                tempArr.push(reviews);

            // }
          setReviewsArr(tempArr);
        }
     // }

}, [tempFlag, isShowWriteModal, isShowModifyModal]);



  const mainReviewWriteBtnClickHandler = () => {
    console.log('reviewWrite Btn Clicked!');
    // logined check  => 
    // if(getLoginedId() === undefined || getLoginedId() === '' || getLoginedId() === null) {
    //   alert('로그인이 필요합니다.');

    // } else {
    //      // write modal show
        setIsShowWriteModal(true);
    // }
   }
  
  const mainReviewModifyBtnClickHandler = (e, reviewNo) => {
    console.log('mainReviewModify Btn Clicked()!');

    
    
    // modify modal show
    setIsShowModifyModal(true);
  }
 
  const mainReviewDelBtnClickHandler = (e, reviewNo) => {
    console.log('mainReviewDel Btn Clicked!');
           
    let result = window.confirm('리뷰를 삭제하시겠습니까?');

        if (result) {
          let reviewDBObjs = parseReviewDB();  
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
  const parseReviewDB = () => {
    console.log('getReviewDBObjs() Called!');

    let reviewDBinStorage = localStorage.getItem('reviewDB');
    if (reviewDBinStorage === null) {
      let uId = 'aa';
      let newDBObj = {
        'count' : reviewNo,
        'rData' : {
                'uId' : uId,
                'fDataId': festivalDataId,
                'fTitle' : festivalTitle,
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

        return reviewDBObjs;
    
  }
  


  return (

    <div className='Main_review_wrap'>

        <div className='review_list_wrap'>
          <div className='review_head_wrap'>
            <ul>
              <li>{festivalTitle} 리 뷰 |&nbsp;&nbsp;&nbsp;&nbsp;{starDataId}&nbsp;&nbsp;&nbsp;&nbsp;
                  <button onClick={mainReviewWriteBtnClickHandler}>리뷰 쓰기</button></li>
            </ul>                               
          
          </div>

          <div className='review_list_wrap'>
             {
                 isLogined
                 ?
            <>
            <ul>
                 { reviewsArr.map((reviews, idx) =>
                    
                <>
                <li>
                    {reviews.title}&nbsp;&nbsp;
                    {`${[reviews.rDateTime]}`}&nbsp;&nbsp;
                      {reviews.rReview}&nbsp;&nbsp;
                      {reviews.star}&nbsp;&nbsp;
                      <button onClick={(e) => mainReviewModifyBtnClickHandler(e, reviews.reviewNo)}>수정</button>&nbsp;&nbsp;
                      <button onClick={(e) => mainReviewDelBtnClickHandler(e, reviews.reviewNo)}>삭제</button>
                </li>
                </>
                   )}

            </ul>
            </>
                :
            <>
            <ul>  // 로그인 되지 않은 review list
                { reviewsArr.map((reviews, idx) =>
                    
                    <>
                    <li>{reviews.uId}&nbsp;&nbsp;
                        {reviews.title}&nbsp;&nbsp;
                        {`${[reviews.rDateTime]}`}&nbsp;&nbsp;
                        {reviews.rReview}&nbsp;&nbsp;
                        {reviews.star}
                    </li>
                    </> )}
            </ul>
            </>
            }
            {
              isShowWriteModal
              ?
            <>
              <ReviewWriteModal setFestivalDataId={setFestivalDataId} setFestivalTitle={setFestivalTitle}
                                setIsShowWriteModal={setIsShowWriteModal}/>
            </> : null  
            }
            {
              isShowModifyModal
              ?
              <>
              <ReviewModifyModal setIsShowModifyModal={setIsShowModifyModal}/>
              </>
              : null
            }
        </div>
      </div>    
    </div>
    
  );
}

export default MainReview;
