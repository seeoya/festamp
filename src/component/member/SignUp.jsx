import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const SignUp = () => {
    const navigate = useNavigate();

    // Hook
    const [uName, setUName] = useState("");
    const [uId, setUId] = useState("");
    const [uPw, setUPw] = useState("");
    const [pwSame, setPwSame] = useState("");
    const [uPhone, setUPhone] = useState("");
    const [uEmail, setUEmail] = useState("");
    const [uBirth, setUBirth] = useState("");

    const [isCheck, setIsCheck] = useState(false);
    const [isemptyValue, setIsemptyValue] = useState(false);

    // 비밀번호 정규식
    const passwordRegEx = /^(?=.*[a-z])((?=.*\d)|(?=.*\W)).{6,12}$/;

    // handleer
    const userNameHandler = (e) => {
        setUName(e.target.value);
    };

    const userIdHandler = (e) => {
        setUId(e.target.value);
    };

    const userPwHandler = (e) => {
        setUPw(e.target.value);
    };

    const userPwSameHandler = (e) => {
        setPwSame(e.target.value);
    };

    const userPhoneHandler = (e) => {
        setUPhone(e.target.value);
    };

    const userEmailHandler = (e) => {
        setUEmail(e.target.value);
    };

    const userBirthHandler = (e) => {
        setUBirth(e.target.value);
    };

    // 중복확인 버튼
    const DuplicateTestBtnHandler = () => {
        let StorageDB = localStorage.getItem("memberDB");

        if (StorageDB !== null) {
            let memberInStorage = JSON.parse(StorageDB);
            let memDbId = Object.keys(memberInStorage);

            if (uId !== "" && uId !== null) {
                if (memDbId.includes(uId)) {
                    alert("이미 사용중인 아이디입니다.");
                    setUId("");
                } else {
                    alert("사용 가능한 아이디입니다.");
                    setIsCheck(true);
                }
            } else {
                alert("아이디를 입력해 주세요.");
            }
        } else {
            alert('사용 가능한 아이디입니다.');
            setIsCheck(true);
        }
    };

    // 회원 가입 버튼
    const joinBtn = () => {
        let memberInStorage = localStorage.getItem("memberDB");
        let emptyValue = (uId !== "" && uName !== "" && uPw !== "" && uPhone !== "" && uEmail !== "" && uBirth !== "");

        if (emptyValue) {
            if (isCheck) {
                if (uPw.match(passwordRegEx) !== null) {
                    if (!!pwSame && uPw === pwSame) {
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

                        alert("회원 가입을 축하드립니다.");
                        navigate("/signin");
                    } else {
                        alert('같은 비밀번호를 입력해 주세요.');
                    }
                } else {
                    alert('올바른 비밀번호를 입력해 주세요.');
                }
            } else {
                alert('아이디 중복체크를 해주세요.');
            }
        } else {
            alert("정보를 입력해주세요");
        }
    };

    const togglePassword = () => {
        let inputPw = document.getElementById("u_pw");
        let inputType = inputPw.getAttribute("type");
        if (inputType == "text") {
            inputPw.setAttribute("type", "password");
        } else {
            inputPw.setAttribute("type", "text");
        }
    }

    return (
        <div id="sign_up" className="sec member">
            <div className="sec_item">
                <h1 className="sec_item_title">회원 가입</h1>

                <div className="sec_item_content">
                    <div>
                        <label htmlFor="u_name">닉네임</label>
                        <input type="text" id="u_name" className="input" name="u_name" onChange={(e) => userNameHandler(e)} placeholder="닉네임을 입력해 주세요." />
                    </div>

                    <div>
                        <label htmlFor="u_id">아이디</label>
                        <div className="btn_wrap">
                            <input type="text" id="u_id" name="u_id" className="input" value={uId} onChange={(e) => userIdHandler(e)} placeholder="아이디를 입력해 주세요." />
                            <button type="button" name="same" className="btn main" onClick={DuplicateTestBtnHandler}>중복 확인</button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="u_pw">비밀번호</label>
                        <div className="btn_wrap">
                            <input type="password" id="u_pw" name="u_pw" className="input" value={uPw} onChange={(e) => userPwHandler(e)} placeholder="비밀번호를 입력해 주세요." />
                            <button type="button" className="eye" onClick={togglePassword}><i class="fa-regular fa-eye"></i></button>
                        </div>
                        <label htmlFor="u_pw" className="desc">비밀번호는 영어 소문자, 최소 1개 이상의 숫자 혹은 특수문자를 혼합하여 6~12자로 입력해 주세요.</label>
                    </div>

                    <div>
                        <label htmlFor="pw_same">비밀번호 확인</label>
                        <div className="btn_wrap">
                            <input type="password" id="pw_same" name="pw_same" className="input" value={pwSame} onChange={(e) => userPwSameHandler(e)} placeholder="비밀번호를 다시 입력해 주세요." />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="u_phone">전화번호</label>
                        <input type="text" id="u_phone" name="u_phone" className="input" value={uPhone} onChange={(e) => userPhoneHandler(e)} placeholder="전화번호를 입력해 주세요." />
                    </div>

                    <div>
                        <label htmlFor="u_email">이메일</label>
                        <input type="text" id="u_email" name="u_email" className="input" value={uEmail} onChange={(e) => userEmailHandler(e)} placeholder="이메일을 입력해 주세요." />
                    </div>

                    <div>
                        <label htmlFor="u_birth">생년월일</label>
                        <input type="date" id="u_birth" name="u_birth" className="input" value={uBirth} onChange={(e) => userBirthHandler(e)} placeholder="생년월일을 입력해 주세요." />
                    </div>

                    <button type="button" className="btn" onClick={joinBtn}>회원 가입</button>
                </div>

            </div>
        </div >
    );
};

export default SignUp;
