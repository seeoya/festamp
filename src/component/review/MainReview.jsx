import ReviewModifyModal from './ReviewModifyModal';
import ReviewWriteModal from './ReviewWriteModal';
import React, {useState, useEffect} from 'react';
import { getLoginedId, setLoginedId } from './session';


const MainReview = (props) => {

  const [isLogined, setIsLogined] = useState(false);
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

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  
  


  useEffect(() => {
    console.log('useEffect() CALLED!!');

    // setFestivalDataId(props.dataId);
    // setFestivalTitle(props.title);
    
    setFestivalDataId(props.festivalDataId);
    setFestivalTitle(props.festivalTitle);
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

            let uId = 'jin';    // 로그인 아이디
            
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
          currentPosts(reviewsArr);
          setReviewsArr(currentPosts);
          
          
          
       


          
}, [festivalDataId, festivalTitle, isLogined, tempFlag, isShowWriteModal, isShowModifyModal, isLogined, currentPage]);

  // 메인리스트 리뷰쓰기 버튼
  const mainReviewWriteBtnClickHandler = () => {
    console.log('mainReviewWrite Btn Clicked!');
    
    // logined check
    // if(!checkLogined()) {
    //   alert('로그인이 필요합니다.');

    // } else {

    console.log('reviewsArr: ', reviewsArr);
    let isReviewArr=[];
    let isReview = JSON.stringify(reviewsArr);
  //  if (isReview.includes(festivalTitle)) {
    
  //     alert(`${festivalTitle} 리뷰가 존재합니다.`);
  //  } else {  
            // write modal show
         setIsShowWriteModal(true);
  //  }
    
  }
  
  // 메인리스트 수정 버튼
  const mainReviewModifyBtnClickHandler = (e, rNo) => {
    console.log('mainReviewModify Btn Clicked()!');
   
    setModifyKey(rNo);
    console.log('modifykey: ', modifyKey);
    // modify modal show
    setIsShowModifyModal(true);
  }
  
  // 메인리스트 삭제 버튼
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

   // 메인리뷰 더보기 클릭핸들러
  const moreViewClickHandler = () => {
    console.log('moreView Clicked!');

    setCurrentPage((prev) => (prev + 1));
    console.log(currentPage);
    setReviewsArr(currentPosts(reviewsArr));
  }

   // 메인리뷰 접기 클릭핸들러
  const moreViewCancleClickHandler = () => {
    console.log('moreViewCancle Clicked!');
    setCurrentPage(1);
    setReviewsArr(currentPosts(reviewsArr));
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

  // 해당 page에 보여줄 리스트 담는 함수
  const currentPosts = (reviewsArr) => {
    console.log('currentPosts() Called');
    
    const indexOfLast = currentPage * postsPerPage;
    //const indexOfFirst = indexOfLast - postsPerPage;
    
    let currentPosts = 0;
    currentPosts = reviewsArr.slice(currentPosts, indexOfLast);
    console.log(currentPosts);
    return currentPosts;

  }
  


  return (

    <div id='review'>

    
          <div className='review_main_header'>
            <ul>
              <li><span>{festivalTitle} 리뷰</span><span>{starDataId}</span>
                  <button onClick={mainReviewWriteBtnClickHandler}>리뷰 쓰기</button>
              </li>
            </ul>                               
          
          </div>

          <div className='review_main_list'>
            
             {
                 isLogined
                 ?
            <>
            <ul>
                 { reviewsArr.map((reviews, idx) =>
                    
                <>
                <li className='full_list'>{reviews.uId}
                      <span>{reviews.fTitle}</span>
                      <span>{`${[reviews.rDateTime.split('일', 1)]}${'일'}`}</span>
                      <span>{reviews.uReview}</span>
                      <span>{reviews.star}</span>
                      <button onClick={(e) => mainReviewModifyBtnClickHandler(e, reviews.rNo)}>수정</button>
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
                    <li className='logined_list'><span>{reviews.uId}</span>
                            <span>{reviews.fTitle}</span>
                            <span>{`${[reviews.rDateTime.split('일', 1)]}${'일'}`}</span>
                            <span>{reviews.uReview}</span>
                            <span>{reviews.star}</span>
                    </li>
                    </>
                     )}
            </ul>
            </> 
            }                      
          </div>

          <div className='more_view_wrap'>
            <a href='#none' onClick={moreViewClickHandler}>+ 더보기</a>
            <a href='#none' onClick={moreViewCancleClickHandler}>접기</a>

          </div>

          <div className='modal_wrap'>
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
    
  );
}

export default MainReview;
