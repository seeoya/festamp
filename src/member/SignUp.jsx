import React from "react";

const SignUp = () => {
    console.log('SignUp() Called!');

    // handleer
    const userNameHandler = () => {
        console.log('userNameHandler() Called!');

    }
    
    const userNickNameHandler = () => {
        console.log('userNickName() Called!' );

    }

    const userPassWordHandler = () => {
        console.log('userPassWord() Called!');

    }

    
    return(
        
        <div>
            
            <input type="text" name="userName" onChange={userNameHandler} placeholder="이름" />
            <br />
            <input type="text" name="userNickName" onChange={userNickNameHandler} placeholder="닉네임" /> &nbsp;
            <button>중복 확인</button>
            <br />
            <input type="password" name="userPassWord" onChange={userPassWordHandler} placeholder="비밀번호 " />
            <br />
            <input type="password" name="PassWordAgreeM" placeholder="비밀번호 확인"/> &nbsp;
            <button>확인</button>
            <br />
            <input type="text" name="userPhone" placeholder="연락처"/>
            <br />
            <input type="text" name="userEmail" placeholder="E-mail"/>
            <br />
            <input type="date" name="userBirth" placeholder="생일"/>
            <br />
            <button >회원가입</button>

        </div>
        
    );
}

export default SignUp;