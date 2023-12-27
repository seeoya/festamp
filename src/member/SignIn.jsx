import React from 'react'

function SignIn() {
    console.log('SignIn() Called!');
    
  return (
    <div>
        <h2>로그인</h2>
        <input type="text" placeholder='ID를 입력하세요' />
        <br />
        <input type="text" placeholder='PASSWORD를 입력하세요' />
        <br />
        <a href="#none">아이디찾기</a> / <a href="#none">비밀번호찾기</a>
        <br />
        <button>로그인</button>
    </div>
  );
}

export default SignIn;