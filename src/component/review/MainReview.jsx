import React, {useState} from 'react';

const MainReview = () => {

  const [isLogined, setLogined] = useState(false);


  const reviewWriteBtnClickHandler = () => {
    console.log('reviewWriteBtnClickHandler() Called!');


  }

  const reviewModifyBtnClickHandler = (e) => {
    console.log('reviewModifyBtnClickHandler() Called!');


  }

  const reviewDelBtnClickHandler = (e) => {
    console.log('reviewDelBtnClickHandler() Called!');


  }


  return (

    <div className='Main_review_wrap'>

        <div className='review_list_wrap'>
          <div className='review_head_wrap'>

              <tr>
                  <td>리 뷰</td>
                  <td><button onClick={reviewWriteBtnClickHandler}>리뷰 쓰기</button></td>
              </tr>

          </div>

          <div className='review_list_wrap'>
            {
                isLogined
                ?
            <>
            <ul>
                   {/* reviewDBArr.map((review, idx) => { */}
                <li>
                    <tr>
                        <td className='review'>{} review</td>
                        <td><button /*value={}*/ onClick={reviewModifyBtnClickHandler}>수정</button></td>
                        <td><button /*value={}*/ onClick={reviewDelBtnClickHandler}>삭제</button></td>
                    </tr>
                </li>
               
                  {/* }); */}

            </ul>
            </>
                :
            <>
            <ul>
                   {/* reviewDBArr.map((review, idx) => { */}
                <li>
                    <tr>
                        <td className='review'>{} review</td>                     
                    </tr>
                </li>
               
                  {/* }); */}

            </ul>
            </>
            }
        </div>
      </div>    
    </div>
    
  );
}

export default MainReview;
