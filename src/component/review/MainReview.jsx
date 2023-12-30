import ReviewModifyModal from './ReviewModifyModal';
import ReviewWriteModal from './ReviewWriteModal';
import React, {useState, useEffect} from 'react';
import { getLoginedId, setLoginedId } from './session';


const MainReview = (props) => {

  const [isLogined, setIsLogined] = useState(true);
  const [isShowWriteModal, setIsShowWriteModal] = useState(false);
  const [isShowModifyModal, setIsShowModifyModal] = useState(false);
  const [modifyKey, setModifyKey] = useState('');
  const [tempFlag, setTempFlag] = useState(true);
  const [reviewsArr, setReviewsArr] = useState([]);
  const [reviewNo, setReviewNo] = useState(0);
  const [uReview, setUReview] = useState('');
  const [star, setStar] = useState('');
  const [uIdReviewArr, setUIdReviewArr] = useState([]);
  
  const [festivalDataId, setFestivalDataId] = useState('');
  const [festivalTitle, setFestivalTitle] = useState('');
  const [starDataId, setStarDataId] = useState('');
  


  useEffect(() => {
    console.log('useEffect() CALLED!!');

    // setFestivalDataId(props.dataId);
    // setFestivalTitle(props.title);
    
    setFestivalDataId('03');
    setFestivalTitle('산천어축제');
    setStarDataId('****');
      
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
            
            if (reviews.fDataId === festivalDataId){
              if (!isLogined) {     // getLoginedId()
                reviews['key'] = reviewskeys[i];
                console.log('reviewskeys[i]:', reviewskeys[i]);
                     
                tempArr.push(reviews);
              } else if(reviews.uId === uId) {
                reviews['key'] = reviewskeys[i];
                console.log('reviewskeys[i]:', reviewskeys[i]);
                     
                tempArr.push(reviews);
              }
            }
          }
          setReviewsArr(tempArr);
          
     

}, [festivalDataId, festivalTitle, isLogined, tempFlag, isShowWriteModal, isShowModifyModal, isLogined]);



  const mainReviewWriteBtnClickHandler = () => {
    console.log('mainReviewWrite Btn Clicked!');
    
    // logined check
    // if(!checkLogined()) {
    //   alert('로그인이 필요합니다.');

    // } else {

    console.log('reviewsArr: ', reviewsArr);
    let isReviewArr=[];
    let isReview = JSON.stringify(reviewsArr);
    if (isReview.includes(festivalTitle)) {
    // for(let value in reviewsArr){
    //   if(value === festivalTitle){
    //      isReviewArr.push(value);
    //   }
    // }
    // if (isReviewArr.length > 0 ) {
       alert(`${festivalTitle} 리뷰가 존재합니다.`);
    } else {
            // write modal show
         setIsShowWriteModal(true);
    }
    
  }
  
  const mainReviewModifyBtnClickHandler = (e, rNo) => {
    console.log('mainReviewModify Btn Clicked()!');
   
    setModifyKey(rNo);
    console.log('modifykey: ', modifyKey);
    // modify modal show
    setIsShowModifyModal(true);
  }
 
  const mainReviewDelBtnClickHandler = (e, rNo) => {
    console.log('mainReviewDel Btn Clicked!');
           
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

        return reviewDBObjs;
  }

  const checkLogined = () => {
    if(getLoginedId() === undefined || getLoginedId() === '' || getLoginedId() === null) {
      return false;
    } else {
      return true;
    }
  }
  


  return (

    <div className='Main_review_wrap'>

        <div className='review_list_wrap'>
          <div className='review_head_wrap'>
            <ul>
              <li><h2>{festivalTitle} 리뷰 |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{starDataId}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button onClick={mainReviewWriteBtnClickHandler}>리뷰 쓰기</button></h2></li>
            </ul>                               
          
          </div>

          <div className='review_list'>
             {
                 isLogined
                 ?
            <>
            <ul>
                 { reviewsArr.map((reviews, idx) =>
                    
                <>
                <li>{reviews.uId}&nbsp;&nbsp;
                    {reviews.fTitle}&nbsp;&nbsp;
                    {`${[reviews.rDateTime.split('일', 1)]}${'일'}`}&nbsp;&nbsp;
                      {reviews.uReview}&nbsp;&nbsp;
                      {reviews.star}&nbsp;&nbsp;
                      <button onClick={(e) => mainReviewModifyBtnClickHandler(e, reviews.rNo)}>수정</button>&nbsp;&nbsp;
                      <button onClick={(e) => mainReviewDelBtnClickHandler(e, reviews.rNo)}>삭제</button>
                </li>
                </>
                   )}

            </ul>
            </>
                :
            <>
            <ul>
                { reviewsArr.map((reviews, idx) =>
                    
                    <>
                    <li>{reviews.uId}&nbsp;&nbsp;
                        {reviews.fTitle}&nbsp;&nbsp;
                        {`${[reviews.rDateTime.split('일', 1)]}${'일'}`}&nbsp;&nbsp;
                        {reviews.uReview}&nbsp;&nbsp;
                        {reviews.star}
                    </li>
                    </>
                     )}
            </ul>
            </>
            }
            {
              isShowWriteModal
              ?
            <>
              <ReviewWriteModal festivalDataId={festivalDataId} festivalTitle={festivalTitle}
                                setIsShowWriteModal={setIsShowWriteModal}/>
            </> : null  
            }
            {
              isShowModifyModal
              ?
              <>
              <ReviewModifyModal setIsShowModifyModal={setIsShowModifyModal} modifyKey={modifyKey}/>
              </>
              : null
            }
        </div>
      </div>    
    </div>
    
  );
}

export default MainReview;
