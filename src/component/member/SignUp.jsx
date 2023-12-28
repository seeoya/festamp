import React, { useState } from "react";



const SignUp = () => {
    console.log('SignUp() Called!');

    // Hook 
    const [UName, setUName] = useState('');
    const [UId, setUId] = useState('');
    const [UPw, setUPw] = useState('');
    const [PwSame, setPwSame] = useState('');
    const [UPhone, setUPhone] = useState('');
    const [UEmail, setUEmail] = useState('');
    const [UBirth, setUBirth] = useState('');
    
    
    
    // handleer
    const userNameHandler = (e) => {
        console.log('userNameHandler() Called!');
        
        setUName(e.target.value);
        
        
    }

    const userIdHandler = (e) => {
        console.log('userIdHandler() Called!');
        
        setUId(e.target.value);
    }
    
    const userPwHandler = (e) => {
        console.log('userPassWord() Called!');
        
        setUPw(e.target.value);
    }

    const userPwSameHandler = (e) => {
        console.log('userPwSameHandler() Called!');
        
        setPwSame(e.target.value);

    }
    
    const userPhoneHandler = (e) => {
        console.log('userPhoneHandler() Called!');
        
        setUPhone(e.target.value);
    }
    
    const userEmailHandler = (e) => {
        console.log('userEmailHandler() Called!');

        setUEmail(e.target.value);
    }

    const userBirthHandler = (e) => {
        console.log('userBirthHandler() Called!');

        setUBirth(e.target.value);
    }
    
    //중복확인
    // const DuplicateTestBtnHandler = (UId) => {
    //     console.log(UId)
        // if(UId !== )
    // }

    // 회원가입 버튼
    const joinBtn = () => {
        console.log('joinBtn() Clicked!');
        
    
        let memberInStorage = localStorage.getItem('memberDb');
        if(memberInStorage=== null){
           
            let newMemberDb = {
                [UId] :
                {name: UName,
                pw: UPw,
                phone: UPhone,
                email: UEmail,
                birth: UBirth } 
            };
            let memberStr = JSON.stringify(newMemberDb);
            localStorage.setItem('memberDB', memberStr);

        } else {

            let memberDbObj = JSON.parse('memberDB');
            console.log([memberDbObj])
            memberDbObj[UId] = {
                name: UName,
                pw: UPw,
                phone: UPhone,
                email: UEmail,
                birth: UBirth

            };
            
            let memberStr = JSON.stringify(memberDbObj);
            localStorage.setItem('memberDb', memberStr);
            
           
          
        };

        alert('회원가입을 축하드립니다.');
       
        
            
    
}

return (

    <div>
            <form >
                <fieldset>
                    <legend>회원가입</legend>
                    <label htmlFor="u_name"><p>이름(닉네임)  </p></label>
                    <input type="text" id="u_name" name="u_name" onChange={(e) => userNameHandler(e)} placeholder="이름(닉네임)" />
                    <br />
                    <label htmlFor="u_id"><p>아이디</p></label>
                    <input type="text" id="u_id" name="u_id" value={UId} onChange={(e) => userIdHandler(e)} placeholder="아이디" /> &nbsp;
                    <button type="button" name="same"> 중복 확인</button>
                    <br />
                    <label htmlFor="u_pw"><p>비밀번호</p> </label>
                    <input type="password" id="u_pw" name="u_pw" value={UPw} onChange={(e)=>userPwHandler(e)} placeholder="비밀번호 " />
                    <br />
                    <label htmlFor="pw_same"><p>비밀번호 확인</p></label>
                    <input type="password" id="pw_same" name="pw_same" value={PwSame} onChange={(e)=>userPwSameHandler(e)} placeholder="비밀번호 확인" /> &nbsp;
                    <button type="button">확인</button>
                    <br />
                    <label htmlFor="u_phone"><p>연락처</p></label>
                    <input type="text" id="u_phone" name="u_phone" value={UPhone} onChange={(e)=>userPhoneHandler(e)} placeholder="연락처" />
                    <br />
                    <label htmlFor="u_email"><p>이메일</p></label>
                    <input type="text" id="u_email" name="u_email" value={UEmail} onChange={(e)=>userEmailHandler(e)} placeholder="E-mail" />
                    <br />
                    <label htmlFor="u_birth"><p>생년월일</p></label>
                    <input type="date" id="u_birth" name="u_birth" value={UBirth} onChange={(e)=>userBirthHandler(e)} placeholder="생일" />
                    <br />
                <button type="button" onClick={joinBtn}>회원가입</button>
                </fieldset>
            </form>

        </div>

    );
}

export default SignUp;