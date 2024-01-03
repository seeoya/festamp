import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import styles from './SignUp.module.css';

const SignUp = () => {
    console.log("SignUp() Called!");

    const navigate = useNavigate();

    // Hook
    const [UName, setUName] = useState("");
    const [UId, setUId] = useState("");
    const [UPw, setUPw] = useState("");
    const [PwSame, setPwSame] = useState("");
    const [UPhone, setUPhone] = useState("");
    const [UEmail, setUEmail] = useState("");
    const [UBirth, setUBirth] = useState("");

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
        console.log(UId);
        let memberDB = JSON.parse(localStorage.getItem("memberDB"));
        let memDbId = Object.keys(memberDB);
        console.log(memDbId.includes(UId));
        console.log(memDbId);

        if (UId !== "" && UId !== null) {
            if (memDbId.includes(UId)) {
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

        if (UPw.match(passwordRegEx) === null) {
            alert("올바른 비밀번호를 입력해주세요.");
        } else {
            alert("사용 가능한 비밀번호 입니다.");
        }
    };

    // 비밀번호 확인 버튼
    const pwSameBntHandler = () => {
        console.log("pwSameBntHandler() Clicked!");

        if (PwSame !== "") {
            if (UPw === PwSame) {
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
            UId !== "" &&
            UName !== "" &&
            UPw !== "" &&
            UPhone !== "" &&
            UEmail !== "" &&
            UBirth !== ""
        ) {
            if (memberInStorage === null) {
                let newMemberDb = {
                    [UId]: {
                        name: UName,
                        pw: UPw,
                        phone: UPhone,
                        email: UEmail,
                        birth: UBirth,
                    },
                };

                let memberStr = JSON.stringify(newMemberDb);
                localStorage.setItem("memberDB", memberStr);
            } else {
                let memberDbObj = JSON.parse(memberInStorage);
                console.log("memberInStorage");

                memberDbObj[UId] = {
                    name: UName,
                    pw: UPw,
                    phone: UPhone,
                    email: UEmail,
                    birth: UBirth,
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
        <div>
            <form>
                <div>
                    <h3>회원가입</h3>
                    <div>
                        <label htmlFor="u_name">
                            <p>이름(닉네임) </p>
                        </label>
                        <input
                            type="text"
                            id="u_name"
                            name="u_name"
                            onChange={(e) => userNameHandler(e)}
                            placeholder="이름(닉네임)"
                        />
                        <br />
                        <label htmlFor="u_id">
                            <p>아이디</p>
                        </label>
                        <input
                            type="text"
                            id="u_id"
                            name="u_id"
                            value={UId}
                            onChange={(e) => userIdHandler(e)}
                            placeholder="아이디"
                        />{" "}
                        &nbsp;
                        <button type="button" name="same" onClick={DuplicateTestBtnHandler}>
                            {" "}
                            중복 확인
                        </button>
                        <br />
                        <label htmlFor="u_pw">
                            <p>비밀번호</p>{" "}
                        </label>
                        <input
                            type="password"
                            id="u_pw"
                            name="u_pw"
                            value={UPw}
                            onChange={(e) => userPwHandler(e)}
                            placeholder="비밀번호 "
                        />{" "}
                        &nbsp;
                        <button type="button" onClick={formatCheckBtnHandler}>
                            확인
                        </button>
                        <p>비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요</p>
                        <label htmlFor="pw_same">
                            <p>비밀번호 확인</p>
                        </label>
                        <input
                            type="password"
                            id="pw_same"
                            name="pw_same"
                            value={PwSame}
                            onChange={(e) => userPwSameHandler(e)}
                            placeholder="비밀번호 확인"
                        />{" "}
                        &nbsp;
                        <button type="button" onClick={pwSameBntHandler}>
                            {" "}
                            비밀번호 확인
                        </button>
                        <br />
                        <label htmlFor="u_phone">
                            <p>연락처</p>
                        </label>
                        <input
                            type="text"
                            id="u_phone"
                            name="u_phone"
                            value={UPhone}
                            onChange={(e) => userPhoneHandler(e)}
                            placeholder="연락처"
                        />
                        <br />
                        <label htmlFor="u_email">
                            <p>이메일</p>
                        </label>
                        <input
                            type="text"
                            id="u_email"
                            name="u_email"
                            value={UEmail}
                            onChange={(e) => userEmailHandler(e)}
                            placeholder="E-mail"
                        />
                        <br />
                        <label htmlFor="u_birth">
                            <p>생년월일</p>
                        </label>
                        <input
                            type="date"
                            id="u_birth"
                            name="u_birth"
                            value={UBirth}
                            onChange={(e) => userBirthHandler(e)}
                            placeholder="생일"
                        />
                        <br />
                    </div>
                    <div>
                        <button type="button" onClick={joinBtn}>
                            회원가입
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUp;
