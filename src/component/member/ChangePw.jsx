import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ChangePw = (props) => {
    const [newPw, setNewPw] = useState("");
    const [verifyPw, setVerifyPw] = useState("");

    //정규식
    const passwordRegEx = /^(?=.*[a-z])((?=.*\d)|(?=.*\W)).{6,12}$/;

    const navigate = useNavigate();

    // 입력창
    const inputNewPW = (e) => {
        setNewPw(e.target.value);
    };

    const inputVerifyPw = (e) => {
        setVerifyPw(e.target.value);
    };

    // 수정 버튼 핸들러 작업 마저 하기
    const ChangePwBtnHandler = () => {
        let StorageDB = localStorage.getItem("memberDB");
        if (StorageDB !== null) {
            let memberInStorage = JSON.parse(StorageDB);

            if (newPw !== "" && verifyPw !== "") {
                if (newPw.match(passwordRegEx) !== null) {
                    if (newPw === verifyPw) {
                        memberInStorage[props.uId].pw = newPw;
                        localStorage.setItem('memberDB', JSON.stringify(memberInStorage));

                        alert('비밀번호가 변경되었습니다.');
                        navigate('/signin');
                    } else {
                        alert('비밀번호가 일치하지 않습니다.')
                    }
                } else {
                    alert('올바른 비밀번호를 입력해주세요.');
                }
            } else {
                alert('비밀번호를 입력해주세요.');
            }
        }
    };

    return (
        <div id="change_pw" className="sec member">
            <div className="sec_item">
                <h1 className="sec_item_title">비밀번호 변경 </h1>

                <div className="sec_item_content">
                    <div>
                        <label htmlFor="new_pw">새로운 비밀번호</label>

                        <div className="btn_wrap">
                            <input type="password" id="new_pw" className="input" defaultValue={(e) => newPw(e)} onChange={inputNewPW} placeholder="새 비밀번호 입력" />
                        </div>
                        <p>비밀번호는 영어 소문자,  최소 1개 이상의 숫자 혹은 특수문자를 혼합하여 6~12자로 입력해주세요.</p>
                    </div>

                    <div>
                        <label htmlFor="verify_pw">비밀번호 확인</label>
                        <div className="btn_wrap">
                            <input type="password" id="verify_pw" className="input" defaultValue={(e) => verifyPw(e)} onChange={inputVerifyPw} placeholder="새 비밀번호 확인" />
                        </div>
                    </div>

                    <button type="button" className="btn" onClick={ChangePwBtnHandler}>비밀번호 수정</button>
                </div>
            </div>
        </div>
    );
};

export default ChangePw;
