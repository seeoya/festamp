import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
    console.log("SignUp() Called!");

    const navigate = useNavigate();

    // Hook
    const [uName, setUName] = useState("");
    const [uId, setUId] = useState("");
    const [uPw, setUPw] = useState("");
    const [pwSame, setPwSame] = useState("");
    const [uPhone, setUPhone] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [uBirth, setUBirth] = useState("");

    // 비밀번호 정규식
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

    // handleer
    const userNameHandler = (e) => {
        console.log("userNameHandler() Called!");

        setUName(e.target.value);
    };

    const userIdHandler = (e) => {
        console.log("userIdHandler() Called!");

        setUId(e.target.value);
    };

    const userPwHandler = (e) => {
        console.log("userPassWord() Called!");

        setUPw(e.target.value);
    };

    const userPwSameHandler = (e) => {
        console.log("userPwSameHandler() Called!");

        setPwSame(e.target.value);
    };

    const userPhoneHandler = (e) => {
        console.log("userPhoneHandler() Called!");

        setUPhone(e.target.value);
    };

    const userEmailHandler = (e) => {
        console.log("userEmailHandler() Called!");

        setUEmail(e.target.value);
    };

    const userBirthHandler = (e) => {
        console.log("userBirthHandler() Called!");

        setUBirth(e.target.value);
    };

    // 중복확인 버튼
    const DuplicateTestBtnHandler = () => {
        console.log(uId);
        let memberDB = JSON.parse(localStorage.getItem("memberDB"));
        let memDbId = Object.keys(memberDB);
        console.log(memDbId.includes(uId));
        console.log(memDbId);

        if (uId !== "" && uId !== null) {
            if (memDbId.includes(uId)) {
                alert("이미 사용중인 아이디입니다.");
                setUId("");
            } else {
                alert("사용 가능한 아이디입니다.");
            }
        } else {
            alert("아이디를 입력하세요.");
        }
    };

    // 비밀번호 정규식
    const formatCheckBtnHandler = () => {
        console.log("formatCheckBtnHandler() Clicked !!");

        if (uPw.match(passwordRegEx) === null) {
            alert("올바른 비밀번호를 입력해주세요.");
        } else {
            alert("사용 가능한 비밀번호 입니다.");
        }
    };

    // 비밀번호 확인 버튼
    const pwSameBntHandler = () => {
        console.log("pwSameBntHandler() Clicked!");

        if (pwSame !== "") {
            if (uPw === pwSame) {
                alert("비밀번호 일치합니다:)");
            } else {
                alert("비밀번호가 일치하지 않습니다.");
                setPwSame("");
            }
        } else {
            alert("비밀번호를 입력하세요.");
            setPwSame("");
        }
    };

    // 회원가입 버튼
    const joinBtn = () => {
        console.log("joinBtn() Clicked!");

        let memberInStorage = localStorage.getItem("memberDB");

        if (
            uId !== "" &&
            uName !== "" &&
            uPw !== "" &&
            uPhone !== "" &&
            uEmail !== "" &&
            uBirth !== ""
        ) {
            if (memberInStorage === null) {
                let newMemberDb = {
                    [uId]: {
                        name: uName,
                        pw: uPw,
                        phone: uPhone,
                        email: uEmail,
                        birth: uBirth,
                    },
                };

                let memberStr = JSON.stringify(newMemberDb);
                localStorage.setItem("memberDB", memberStr);
            } else {
                let memberDbObj = JSON.parse(memberInStorage);
                console.log("memberInStorage");

                memberDbObj[uId] = {
                    name: uName,
                    pw: uPw,
                    phone: uPhone,
                    email: uEmail,
                    birth: uBirth,
                };

                let memberStr = JSON.stringify(memberDbObj);
                localStorage.setItem("memberDB", memberStr);
            }

            alert("회원가입을 축하드립니다.");

            navigate("/SignIn");
        } else {
            alert("정보를 입력해주세요");
        }
    };

    return (
        <div id="sign_up" className="sec">
            <div className="sec_item">
                <h1 className="sec_item_title">회원가입</h1>

                <div className="sec_item_content">
                    <label htmlFor="u_name">이름(닉네임)</label>
                    <input type="text" id="u_name" className="input" name="u_name" onChange={(e) => userNameHandler(e)} placeholder="이름(닉네임)" />


                    <label htmlFor="u_id">아이디</label>
                    <div>
                        <input type="text" id="u_id" name="u_id" className="input" value={uId} onChange={(e) => userIdHandler(e)} placeholder="아이디" />
                        <button type="button" name="same" className="btn main" onClick={DuplicateTestBtnHandler}>중복 확인</button>
                    </div>

                    <label htmlFor="u_pw">
                        비밀번호
                    </label>
                    <label htmlFor="u_pw">
                        비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요
                    </label>
                    <div>
                        <input type="password" id="u_pw" name="u_pw" className="input" value={UPw} onChange={(e) => userPwHandler(e)} placeholder="비밀번호" />
                        <button type="button" className="btn main" onClick={formatCheckBtnHandler}>확인</button>
                    </div>

                    <label htmlFor="pw_same">비밀번호 확인</label>
                    <div>
                        <input type="password" id="pw_same" name="pw_same" className="input" value={PwSame} onChange={(e) => userPwSameHandler(e)} placeholder="비밀번호 확인" />
                        <button type="button" className="btn main" onClick={pwSameBntHandler}>비밀번호 확인</button>
                    </div>

                    <label htmlFor="u_phone">연락처</label>
                    <input type="text" id="u_phone" name="u_phone" className="input" value={UPhone} onChange={(e) => userPhoneHandler(e)} placeholder="연락처" />

                    <label htmlFor="u_email">이메일</label>
                    <input type="text" id="u_email" name="u_email" className="input" value={UEmail} onChange={(e) => userEmailHandler(e)} placeholder="E-mail" />

                    <label htmlFor="u_birth">생년월일</label>
                    <input type="date" id="u_birth" name="u_birth" className="input" value={UBirth} onChange={(e) => userBirthHandler(e)} placeholder="생년월일" />
                </div>

                <button type="button" className="btn main" onClick={joinBtn}>회원가입</button>
            </div>
        </div >
    );
};

export default SignUp;
