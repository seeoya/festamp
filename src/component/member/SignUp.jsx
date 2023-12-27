import React from "react";



const SignUp = () => {
    console.log('SignUp() Called!');

    // handleer
    const userNameHandler = (e) => {
        console.log('userNameHandler() Called!');

        

    }
    
    const userNickHandler = (e) => {
        console.log('userNickName() Called!' );

    }

    const userPwHandler = (e) => {
        console.log('userPassWord() Called!');

    }

    const userPwSameHandler = (e) => {
        console.log('userPwSameHandler() Called!');

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
            <form >
                <fieldset>
                <legend>회원가입</legend>
                <label htmlFor="u_id"><p>아이디  </p></label>
                <input type="text" id="u_id" name="user_name" onChange={userNameHandler} placeholder="이름" />
                <br />
                <label htmlFor="u_nick"><p>닉네임</p></label>
                <input type="text" id="u_nick" name="user_nick" onChange={userNickHandler} placeholder="닉네임" /> &nbsp;
                <button>중복 확인</button>
                <br />
                <label htmlFor="u_pw"><p>비밀번호</p> </label>
                <input type="password" id="u_pw" name="user_pw" onChange={userPwHandler} placeholder="비밀번호 " />
                <br />
                <label htmlFor="pw_same"><p>비밀번호 확인</p></label>
                <input type="password" id="pw_same" name="pw_same" onChange={userPwSameHandler} placeholder="비밀번호 확인"/> &nbsp;
                <button >확인</button>
                <br />
                <label htmlFor="u_phone"><p>연락처</p></label>
                <input type="text" id="u_phone" name="user_phone" onChange={userPhoneHandler} placeholder="연락처"/>
                <br />
                <label htmlFor="u_email"><p>이메일</p></label>
                <input type="text" id="u_email" name="user_email" onChange={userEmailHandler} placeholder="E-mail"/>
                <br />
                <label htmlFor="u_birth"><p>생년월일</p></label>
                <input type="date" id="u_birth" name="user_birth" onChange={userBirthHandler} placeholder="생일"/>
                <br />
                </fieldset>
                <button >회원가입</button>
            </form>

        </div>
        
    );
}

export default SignUp;