import React, { useState } from "react";
import Privacy from "./Privacy";
import SignIn from "./SignIn";
import SignOut from "./SignOut";
import SignUp from "./SignUp";

function Menu() {
    console.log("Menu() Called!");

    const [isSignUp, setIsSignUp] = useState(true);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isPrivacy, setIsPrivacy] = useState(false);
    const [isSignOut, SetIsSignOut] = useState(false);

    // handler
    const signUpHandler = () => {
        console.log("signUpHandler() Clicked!");

        setIsSignUp(true);
        setIsSignIn(false);
        setIsPrivacy(false);
        SetIsSignOut(false);
    };

    const signInHandler = () => {
        console.log("signInHandler() Clicked!");

        setIsSignUp(false);
        setIsSignIn(true);
        setIsPrivacy(false);
        SetIsSignOut(false);
    };

    const privacyRetouchHandler = () => {
        console.log("privacyRetouchHandler() Clicked!");

        setIsSignUp(false);
        setIsSignIn(false);
        setIsPrivacy(true);
        SetIsSignOut(false);
    };

    const signOutHandler = () => {
        console.log("signOutHandler() Clicked!");

        setIsSignUp(false);
        setIsSignIn(false);
        setIsPrivacy(false);
        SetIsSignOut(true);
    };

    return (
        <>
            <div>
                <a href="#none" onClick={signUpHandler}>
                    회원가입
                </a>
                <br />
                <a href="#none" onClick={signInHandler}>
                    로그인
                </a>
                <br />
                <a href="#none" onClick={privacyRetouchHandler}>
                    개인정보변경
                </a>
                <br />
                <a href="#none" onClick={signOutHandler}>
                    로그아웃
                </a>
            </div>

            {isSignUp ? (
                <SignUp
                    signupscreen={setIsSignUp}
                    signinscreen={setIsSignIn}
                    privacyscreen={setIsPrivacy}
                    signoutscreen={SetIsSignOut}
                />
            ) : null}

            {isSignIn ? (
                <SignIn
                    signupscreen={setIsSignUp}
                    signinscreen={setIsSignIn}
                    privacyscreen={setIsPrivacy}
                    signoutscreen={SetIsSignOut}
                />
            ) : null}
            {isPrivacy ? (
                <Privacy
                    signupscreen={setIsSignUp}
                    signinscreen={setIsSignIn}
                    privacyscreen={setIsPrivacy}
                    signoutscreen={SetIsSignOut}
                />
            ) : null}
            {isSignOut ? (
                <SignOut
                    signupscreen={setIsSignUp}
                    signinscreen={setIsSignIn}
                    privacyscreen={setIsPrivacy}
                    signoutscreen={SetIsSignOut}
                />
            ) : null}
        </>
    );
}

export default Menu;
