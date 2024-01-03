import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignUp from "./SignUp";
// import styles from './SignIn.module.css';
import IdFind from "./IdFind";
import PwFind from "./PwFind";

const SignIn = (props) => {
    console.log("SignIn() Called!");

    //props 변수 할당
    let setIsLogined = props.loginInfo.setIsLogIned;
    let setLogInId = props.loginInfo.setLogInId;

    const navigate = useNavigate();

    // 로그인 HOOK
    const [uId, setUId] = useState("");
    const [uPw, setPw] = useState("");

    // 로그인 btn Hook
    const [isJoin, setIsJoin] = useState("");

    //아이디 찾기 , 비밀번호 찾기
    const [isfindIdClick, setIsfindIdClick] = useState(false);
    const [isFindPwClick, setIsFindPwClick] = useState(false);

    //btn handler
    const loginBtnHandler = () => {
        console.log("loginBtnHandler() Clicked!!");

        let memberInStorage = JSON.parse(localStorage.getItem("memberDB"));
        let memIdObj = Object.keys(memberInStorage);
        console.log(memberInStorage[uId]);

        if (uId !== "" && uPw !== "") {
            if (
                memberInStorage !== null &&
                memIdObj.includes(uId) &&
                memberInStorage[uId].pw === uPw
            ) {
                alert("FESTAMP에 오신 걸 환영합니다. :)");
                navigate("/");
                setIsLogined(true);
                setLogInId(uId);
               

            } else {
                alert("회원정보가 없습니다.");
                setUId("");
                setPw("");
            }
        } else {
            alert("정보를 입력해주세요.");
        }
    };

    // onChange handler
    const loginIdHandler = (e) => {
        console.log("loginIdHandler() Changed!");

        setUId(e.target.value);
    };

    const loginPwHandler = (e) => {
        console.log("loginPwHandler() Changed!");

        setPw(e.target.value);
    };

    // joinBtnHandler
    const joinBtnHandler = () => {
        console.log("joinBtnHandler() Clicked!");
        setIsJoin(true);

        navigate("/signup");
        // "/signup"로 이동시켜줘
    };

    // 아이디 찾기
    const idFindClickHandler = () => {
        console.log("idFindHandler() Clicked!");

        setIsfindIdClick(true);
        console.log("isfindIdClick()", "이거거거거거거");

        navigate("/IdFind");
    };

    //비밀번호 찾기
    const fwFindClickHandler = () => {
        console.log("fwFindClickHandler() Clicked!!! 야ㅑㅑㅑ");

        setIsFindPwClick(false);

        navigate("/PwFind");
    };

    return (
        <div>
            <>
                <div>
                    <div>
                        <h3>로그인</h3>
                        <input
                            type="text"
                            value={uId}
                            onChange={loginIdHandler}
                            placeholder="ID를 입력하세요"
                        />
                        <br />
                        <input
                            type="password"
                            value={uPw}
                            onChange={loginPwHandler}
                            placeholder="PASSWORD를 입력하세요"
                        />
                        <br />
                        <a href="#none" value={isfindIdClick} onClick={idFindClickHandler}>
                            아이디찾기
                        </a>{" "}
                        /{" "}
                        <a href="#none" value={isFindPwClick} onClick={fwFindClickHandler}>
                            비밀번호찾기
                        </a>
                        <br />
                        <a href="#none" onClick={joinBtnHandler}>
                            회원가입
                        </a>
                        <br />
                        <button type="button" onClick={(props) => loginBtnHandler(props)}>
                            로그인
                        </button>
                    </div>
                </div>
            </>

            {isJoin ? <SignUp /> : null}
            {isfindIdClick ? <IdFind /> : null}
            {isFindPwClick ? <PwFind /> : null}
        </div>
    );
};

export default SignIn;
