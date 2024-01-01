import React, { useState } from "react";

const Privacy = () => {
  console.log('Privacy() Called!!');

  const [uIdFix, setUIdFix] = useState('');
  
 
  
  
  return(
    <>
      <form >
        <div>
          <h3>개인정보수정</h3>
      <label htmlFor="u_name">
      <p>이름(닉네임)  </p></label>
      <input type="text" id="u_name" name="u_name" placeholder="이름(닉네임)" />
      <br />
      <label htmlFor="u_id" ><p>아이디</p></label>
      <input type="text" readOnly value={uIdFix} id="u_id" name="u_id"/> &nbsp;
      <br />
      <label htmlFor="u_pw"><p>비밀번호</p> </label>
      <input type="password" id="u_pw" name="u_pw" placeholder="비밀번호 " />
      <br />
      <label htmlFor="pw_same"><p>비밀번호 확인</p></label>
      <input type="password" id="pw_same" name="pw_same" placeholder="비밀번호 확인" /> &nbsp;
      <button type="button" >확인</button>
      <br />
      <label htmlFor="u_phone"><p>연락처</p></label>
      <input type="text" id="u_phone" name="u_phone"placeholder="연락처" />
      <br />
      <label htmlFor="u_email"><p>이메일</p></label>
      <input type="email" id="u_email" name="u_email" placeholder="E-mail" />
      <br />
      <label htmlFor="u_birth"><p>생년월일</p></label>
      <input type="date" id="u_birth" name="u_birth" placeholder="생일" />
      <br />
      <button type="button">수정</button>
      </div>
      </form>
    
    </>

  );
  

}

export default Privacy;