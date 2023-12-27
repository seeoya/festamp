import React from "react";



const SignUp = () => {
    console.log('SignUp() Called!');

    // handleer
    const userNameHandler = (e) => {
        console.log('userNameHandler() Called!');

        e.target.value

    }
    
    const userNickHandler = (e) => {
        console.log('userNickName() Called!' );

    }

    const userPwHandler = (e) => {
        console.log('userPassWord() Called!');

    }

    const userPwAcdHandler = (e) => {
        console.log('userPwAcdHandler() Called!');

    }

    const userPhoneHandler = (e) => {
        console.log('userPhoneHandler() Called!');

    }

    const userEmailHandler = (e) => {
        console.log('userEmailHandler() Called!');

    }

    const userBirthHandler = (e) => {
        console.log('userBirthHandler() Called!');

    }

    
    return(
        
        <div>
            
            <input type="text" name="user_name" onChange={userNameHandler} placeholder="이름" />
            <br />
            <input type="text" name="user_nick" onChange={userNickHandler} placeholder="닉네임" /> &nbsp;
            <button>중복 확인</button>
            <br />
            <input type="password" name="user_pw" onChange={userPwHandler} placeholder="비밀번호 " />
            <br />
            <input type="password" name="pw_accordance" onChange={userPwAcdHandler} placeholder="비밀번호 확인"/> &nbsp;
            <button >확인</button>
            <br />
            <input type="text" name="user_phone" onChange={userPhoneHandler} placeholder="연락처"/>
            <br />
            <input type="text" name="user_email" onChange={userEmailHandler} placeholder="E-mail"/>
            <br />
            <input type="date" name="user_birth" onChange={userBirthHandler} placeholder="생일"/>
            <br />
            <button >회원가입</button>

        </div>
        
    );
}

export default SignUp;