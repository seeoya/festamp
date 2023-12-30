import React, { useState } from 'react'
import SignUp from './SignUp';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  console.log('SignIn() Called!');
  const navigate = useNavigate();

  // 로그인 HOOK 
  const [uId, setUId] = useState('');
  const [uPw, setPw] = useState('');

  // 회원가입 btn Hook
  const [isJoin, setIsJoin] = useState('');

    
  //btn handler
  const loginBtnHandler = () => {
    console.log('loginBtnHandler() Clicked!!');

    let memberInStorage = JSON.parse(localStorage.getItem('memberDB'));
    let memIdObj = Object.keys(memberInStorage);

   if(memberInStorage !== null && memIdObj.includes(uId) && memberInStorage[uId].pw === uPw) {
    alert('FESTAMP에 오신 걸 환영합니다. :)');
    navigate("/Wrap");

   } else {
    alert('회원정보가 없습니다.');
    setUId('');
    setPw('');

   }
   
   

  }


  // onChange handler
  const loginIdHandler = (e) => {
    console.log('loginIdHandler() Changed!');

    setUId(e.target.value);

  }

  const loginPwHandler = (e) => {
    console.log('loginPwHandler() Changed!');

    setPw(e.target.value);
  }

  // joinBtnHandler
  const joinBtnHandler =() =>{
    console.log('joinBtnHandler() Clicked!');
    setIsJoin(true);

    navigate("/signup");
    // "/signup"로 이동시켜줘
  }


  return (
    <div>

      <form >

        <fieldset>
          <legend>로그인</legend>
          <input type="text" value={uId} onChange={loginIdHandler} placeholder='ID를 입력하세요' />
          <br />
          <input type="password" value={uPw} onChange={loginPwHandler} placeholder='PASSWORD를 입력하세요' />
          <br />
          <a href="#none">아이디찾기</a> / <a href="#none">비밀번호찾기</a>
          <br />
          <a href="#none" onClick={joinBtnHandler}>회원가입</a>
          <br />
          <button type='button' onClick={loginBtnHandler}>로그인</button>
        </fieldset>
      </form>

  {  isJoin
  ?
   <SignUp/>
  :
   null
  }

    </div>
  );
}

export default SignIn;