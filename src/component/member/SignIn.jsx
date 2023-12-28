import React from 'react'

function SignIn() {
    console.log('SignIn() Called!');

    // handler
    const loginIdHandler = () => {
      console.log('loginIdHandler() Called!');

    }

    const loginPwHandler = () => {
      console.log('loginPwHandler() Called!');

    }
    
  return (
    <div>
        
        <form >

          <fieldset>
            <legend>로그인</legend>
            <input type="text" onChange={loginIdHandler} placeholder='ID를 입력하세요' />
            <br />
            <input type="text" onChange={loginPwHandler} placeholder='PASSWORD를 입력하세요' />
            <br />
            <a href="#none">아이디찾기</a> / <a href="#none">비밀번호찾기</a>
            <br />
            <button>로그인</button>
          </fieldset>
        </form>
    </div>
  );
}

export default SignIn;