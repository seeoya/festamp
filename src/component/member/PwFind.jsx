import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const PwFind = () => {

    console.log('IdFind() !!!!!!!!!');

    const [uId, setUId] = useState('');
    const [uEmail, setUEmail] = useState('');

    // 네비게이트
    const navigate = useNavigate();

    // 로그인뷰 
    const [isLoginView, setIsLoginView] = useState(false);

    const inputIdHandler = (e) => {
        console.log('inputEmailHandler() input');

        setUId(e.target.value);
    }

    const inputEmailHandler = (e) => {
        console.log('inputPasswordHandler() input');

        setUEmail(e.target.value);
    }

    // 비밀번호 찾기 버튼 클릭시 
    const findPwHandler = () => {
        console.log('findIdHandler() Click!!!!!!');

        let memberInStorage = JSON.parse(localStorage.getItem('memberDB'));
        let memIdObjarr = Object.keys(memberInStorage);
        console.log(memberInStorage);
        console.log(memIdObjarr);
        
        
        // console.log(memberInStorage[uId].email);
        // console.log(memberInStorage[uId].pw);

        
    }
    const signInView = () => {
        console.log('signInView() Clicked!!!!');

        setIsLoginView(true);

        navigate("/SignIn");
    }

  return (
    <div>
         <div>
                <h3>비밀번호 찾기</h3>
                <laber htmlFor="u_id">
                    <p>E-Mail</p> </laber>
                    <input type="text" id='u_id' value={uId} onChange={(e) => inputIdHandler(e)} placeholder='ID를 입력하세요' />
                

                <laber htmlFor="u_email">
                    <p>Phone Number</p>  </laber> 
                    <input type="text" id='u_email' value={uEmail} onChange={(e) => inputEmailHandler(e)} placeholder='Phone Number를 입력하세요' />
               <br />

                <button onClick={findPwHandler}>비밀번호 찾기</button> &nbsp; 
                <button value={isLoginView} onClick={signInView}>로그인 화면</button>

            </div>
    </div>
  )
}

export default PwFind;