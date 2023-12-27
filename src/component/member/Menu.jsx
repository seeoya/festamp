import React, { useState } from 'react'

function Menu() {
    console.log('Menu() Called!');
    
    const[isSignUP, setIsSignUp] = useState();
    const[isSignIn, setIsSignIn] = useState();
    const[isPrivacy, setIsPrivacy] = useState();
    const[isSignOut, SetIsSignOut] = useState();

    // handler
    const signUpHandler = () => {
        console.log('signUpHandler() Clicked!');

    }

    const signInHandler = () => {
        console.log('signInHandler() Clicked!');
        
    }

    const privacyRetouchHandler = () => {
        console.log('privacyRetouchHandler() Clicked!');
        
    }

    const signOutHandler = () => {
        console.log('signOutHandler() Clicked!');
        
    }

  return (

    <div>
        <a href="#none" onClick={signUpHandler}>회원가입</a>
        <br />
        <a href="#none" onClick={signInHandler}>로그인</a>
        <br />
        <a href="#none" onClick={privacyRetouchHandler}>개인정보변경</a>
        <br />
        <a href="#none" onClick={signOutHandler}>로그아웃</a>
    </div>
  );
}

export default Menu;