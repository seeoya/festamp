import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import styles from './SignIn.module.css';

const SignIn = (props) => {
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
        let StorageDB = localStorage.getItem("memberDB");

        if (StorageDB !== null) {
            let memberInStorage = JSON.parse(StorageDB);
            let memIdObj = Object.keys(memberInStorage);

            if (uId !== "" && uPw !== "") {
                if (memIdObj.includes(uId) && memberInStorage[uId].pw === uPw) {
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
    };

    // onChange handler
    const loginIdHandler = (e) => {
        setUId(e.target.value);
    };

    const loginPwHandler = (e) => {
        setPw(e.target.value);
    };

    // joinBtnHandler
    const joinBtnHandler = () => {
        setIsJoin(true);
        navigate("/signup");
    };

    // 아이디 찾기
    const idFindClickHandler = () => {
        setIsfindIdClick(true);
        navigate("/idfind");
    };

    //비밀번호 찾기
    const fwFindClickHandler = () => {
        setIsFindPwClick(false);
        navigate("/pwfind");
    };

    return (
        <div id="sign_in" className="sec member">
            <div className="sec_item">
                <h1 className="sec_item_title">로그인</h1>

                <div className="sec_item_content">
                    <input type="text" className="input" value={uId} onChange={loginIdHandler} placeholder="ID를 입력하세요" />

                    <input type="password" className="input" value={uPw} onChange={loginPwHandler} placeholder="PASSWORD를 입력하세요" />

                    <div className="links">
                        <Link to="/idfind" value={isfindIdClick} onClick={idFindClickHandler}>- 아이디찾기</Link>
                        <Link to="/pwfind" value={isFindPwClick} onClick={fwFindClickHandler}>- 비밀번호찾기</Link>
                    </div>

                    <button type="button" className="btn main" onClick={(props) => loginBtnHandler(props)}>로그인</button>
                    <Link to="/signup" className="btn" onClick={joinBtnHandler}>회원가입</Link>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
