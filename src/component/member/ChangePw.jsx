import React, { useState } from 'react'


const ChangePw = () => {
  console.log('ChangePw() Called !!');

  const [newPw,setNewPw] = useState('');
  const [verifyPw,setVerifyPw] = useState('');

  //정규식
  const passwordRegEx = /^[A-Za-z0-9]{8,20}$/
  
  
  // 입력창 
 const inputNewPW = (e) => {
  console.log('inputNewPW() Input !!');

  setNewPw(e.target.value);
  console.log(newPw);
  }

  const inputVerifyPw = (e) => {
    console.log('inputVerifyPw() Input !!');

    setVerifyPw(e.target.value);
    console.log(verifyPw);
  }
  // 비밀번호 형식체크
  const formatCheckBtnHandler = () => {
    console.log('formatCheckBtnHandler() Clicked !!');

    if(newPw.match(passwordRegEx) === null){
      
      alert('비밀번호 형식을 확인해주세요.');
    } else {
      alert('비밀번호 확인 입력해주세요.');
    }
  }

  const pwCheckBtnHandler = () => {
    console.log('pwCheckBtnHandler() Clicked !!');

    
    if(newPw !== "" && verifyPw !== ""){
    if(newPw === verifyPw) {
      alert ('비밀번호가 일치합니다.');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
      setVerifyPw('');        //이거 왜 안날아가지??
      console.log(verifyPw, "여기");
    }
  } else {
    alert('비밀번호를 입력해주세요.');
  }
  }

  return (
    <div>
      <div>
        <h3>비밀번호 변경</h3>

        <div>
          <label htmlFor="new_pw"><p>NEW PASSWORD</p></label> 
          <input type="password" id='new_pw' defaultValue={(e) => newPw(e)} onChange={inputNewPW} placeholder='새 비밀번호 입력'/> &nbsp;
          <button onClick={formatCheckBtnHandler}>확인</button><br />
          <p>비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요</p>
          <label htmlFor="verify_pw"><p>VERIFY PASSWORD</p></label>
          <input type="password" id='verify_pw' defaultValue={(e) => verifyPw(e)} onChange={inputVerifyPw} placeholder='새 비밀번호 확인'/> &nbsp;
          <button onClick={pwCheckBtnHandler}>비밀번호 확인</button>

        </div>
        
        <button>비밀번호 수정</button>
      </div>
    </div>
  )
}

export default ChangePw;
