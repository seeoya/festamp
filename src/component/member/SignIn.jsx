import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styles from './SignIn.module.css';

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

        let StorageDB = localStorage.getItem("memberDB");
        if (StorageDB !== null) {
            let memberInStorage = JSON.parse(StorageDB);
            let memIdObj = Object.keys(memberInStorage);

            if ( uId !== "" && uPw !== "") {
            
                if (
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
                alert("정확한 정보를 입력해주세요.");
                
            }

        } else {
            alert("정확한 정보를 입력해주세요.");
        }

        // let memberInStorage = JSON.parse(localStorage.getItem("memberDB"));      DB가 없으니까 파싱자체를 못해와서 오류가 남. 
        // let memIdObj = Object.keys(memberInStorage);
        // console.log(memberInStorage[uId]);
        
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
        <div id="sign_in" className="sec member">
            <div className="sec_item">
                <h1 className="sec_item_title">로그인</h1>

                <div className="sec_item_content">
                    <div>
                        <input type="text" className="input" value={uId} onChange={loginIdHandler} placeholder="ID를 입력하세요" />
                    </div>

                    <div>
                        <input type="password" className="input" value={uPw} onChange={loginPwHandler} placeholder="PASSWORD를 입력하세요" />
                    </div>

                    <div className="links">
                        <Link to="/idfind" value={isfindIdClick} onClick={idFindClickHandler}>- 아이디찾기</Link>
                        <Link to="/pwfind" value={isFindPwClick} onClick={fwFindClickHandler}>- 비밀번호찾기</Link>
                    </div>

                    <button type="button" className="btn main" onClick={(props) => loginBtnHandler(props)}>로그인</button>
                    <Link to="/signup" className="btn" onClick={joinBtnHandler}>회원가입</Link>
                </div>
            </div>

            {/* {isJoin ? <SignUp /> : null}
            {isfindIdClick ? <IdFind /> : null}
            {isFindPwClick ? <PwFind /> : null} */}
        </div>
    );
};

export default SignIn;
