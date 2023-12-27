import React, { useState } from 'react'

const MyReview = () => {

  const [isLogined, setLogined] = useState(false);


  const myReviewModifyBtnClickHandler = (e) => {
    console.log('reviewModifyBtnClickHandler() Called!');


  }

  const myReviewDelBtnClickHandler = (e) => {
    console.log('reviewDelBtnClickHandler() Called!');


  }

  return (
    <div className='my_review_wrap'>

        <div className='my_review_list_wrap'>

            <ul>
                   {/* reviewDBArr.map((review, idx) => { */}
                <li>
                    <tr>
                        <td className='review'>review</td>
                        <td><button /*value={}*/ onClick={myReviewModifyBtnClickHandler}>수정</button></td>
                        <td><button /*value={}*/ onClick={myReviewDelBtnClickHandler}>삭제</button></td>
                    </tr>
                </li>
               
                  {/* }); */}
            </ul>
        </div>
    
    </div>
  )
}

export default MyReview;