import React, { useState } from "react";

const ChangePw = () => {
    console.log("ChangePw() Called !!");

    const [newPw, setNewPw] = useState("");
    const [verifyPw, setVerifyPw] = useState("");

    //정규식
    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;

    // 입력창
    const inputNewPW = (e) => {
        console.log("inputNewPW() Input !!");

        setNewPw(e.target.value);
        console.log(newPw);
    };

    const inputVerifyPw = (e) => {
        console.log("inputVerifyPw() Input !!");

        setVerifyPw(e.target.value);
        console.log(verifyPw);
    };
    // 비밀번호 형식체크
    const formatCheckBtnHandler = () => {
        console.log("formatCheckBtnHandler() Clicked !!");

        if (newPw.match(passwordRegEx) === null) {
            alert("올바른 비밀번호를 입력해주세요.");
        } else {
            alert("사용 가능한 비밀번호 입니다.");
        }
    };

    const pwCheckBtnHandler = () => {
        console.log("pwCheckBtnHandler() Clicked !!");

        if (newPw !== "" && verifyPw !== "") {
            if (verifyPw.match(passwordRegEx) === null) {
                alert("올바른 비밀번호를 입력해주세요.");
            }
            if (newPw === verifyPw) {
                alert("비밀번호가 일치합니다.");
            } else {
                alert("비밀번호가 일치하지 않습니다.");
                setVerifyPw(""); //이거 왜 안날아가지??
                console.log(verifyPw, "여기");
            }
        } else {
            alert("비밀번호를 입력해주세요.");
        }
    };

    // 수정 버튼 핸들러 작업 마저 하기
    const ChangePwBtnHandler = () => {
        console.log("pwChangeBtnHandler() Clicked !!");
    };

    return (
        <div id="change_pw" className="sec">

            <div className="sec_item">
                <h1 className="sec_item_title">비밀번호 변경</h1>

                <div className="sec_item_content">
                    <div>
                        <label htmlFor="new_pw">새로운 비밀번호</label>

                        <div className="btn_wrap">
                            <input type="password" id="new_pw" className="input" defaultValue={(e) => newPw(e)} onChange={inputNewPW} placeholder="새 비밀번호 입력" />
                            <button type="button" className="btn main" onClick={formatCheckBtnHandler}>확인</button>
                        </div>
                        <p>비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요</p>
                    </div>

                    <div>
                        <label htmlFor="verify_pw">VERIFY PASSWORD</label>
                        <input type="password" id="verify_pw" className="input" defaultValue={(e) => verifyPw(e)} onChange={inputVerifyPw} placeholder="새 비밀번호 확인" />
                        <button type="button" className="btn main" onClick={pwCheckBtnHandler}>비밀번호 확인</button>
                    </div>
                    <button type="button" className="btn main" onClick={ChangePwBtnHandler}>비밀번호 수정</button>
                </div>
            </div>
        </div>
    );
};

export default ChangePw;
