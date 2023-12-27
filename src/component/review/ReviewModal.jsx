import React, { useState } from 'react';


const ReviewModal = () => {

    const [isWrite, setIsWrite] = useState(true);


    
  const reviewModalWriteBtnClickHandler = () => {
    console.log('reviewWriteBtnClickHandler() Called!');


  }

  const reviewModalModifyBtnClickHandler = (e) => {
    console.log('reviewModifyBtnClickHandler() Called!');


  }

  
  
  return (
 


    <div className='review_modal_wrap'>
   
      <textarea cols="40" rows="5"></textarea>
      <br />
    {
      isWrite
      ?
      <>
      <button /*value={}*/ onClick={reviewModalWriteBtnClickHandler} >저장</button>
      </>
      :
      <>
      <button /*value={}*/ onClick={reviewModalModifyBtnClickHandler}>수정</button>
      </>
    }

    </div>
  );
}

export default ReviewModal;