import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Secession from "./Secession";
import './SignUp.css';

const Privacy = (props) => {
    let navigate = useNavigate('');

    let isLogIned = props.loginInfo.isLogIned;
    let logInId = props.loginInfo.logInId;

    // Hook
    const [memberInfo, setMemberInfo] = useState(JSON.parse(localStorage.getItem('memberDB')) ?? "");
    const [uName, setUName] = useState(memberInfo[logInId].name ?? "");
    const [uPw, setUPw] = useState(memberInfo[logInId].pw ?? "");
    const [pwSame, setPwSame] = useState(memberInfo[logInId].pw ?? "");
    const [uPhone, setUPhone] = useState(memberInfo[logInId].phone ?? "");
    const [uEmail, setUEmail] = useState(memberInfo[logInId].email ?? "");
    const [uBirth, setUBirth] = useState(memberInfo[logInId].birth ?? "");

    const passwordRegEx = /^(?=.*[a-z])((?=.*\d)|(?=.*\W)).{6,12}$/;

    const [isSecession, setIsSecession] = useState(false);

    useEffect(() => {
        if (!isLogIned) {
            alert('로그인 해주세요.');
            navigate('/signin');
        }
    }, []);

    const nickChageHandler = (e) => {
        setUName(e.target.value);
    }

    const pwChangeHadler = (e) => {
        setUPw(e.target.value);
    }

    const pwSameChangeHadler = (e) => {
        setPwSame(e.target.value);
    }

    const phoneChangeHandler = (e) => {
        setUPhone(e.target.value);
    }

    const eMailChangeHandler = (e) => {
        setUEmail(e.target.value);
    }

    const birthChangeHandler = (e) => {
        setUBirth(e.target.value);
    }


    //정보수정 버튼
    const changeBtnHandler = () => {
        if (uName !== "" && uPw !== "" && uPhone !== "" && uEmail !== "" && uBirth !== "") {
            if (uPw.match(passwordRegEx) !== null) {
                if (pwSame !== "" && uPw === pwSame) {
                    memberInfo[logInId] = {
                        name: uName,
                        pw: uPw,
                        phone: uPhone,
                        email: uEmail,
                        birth: uBirth
                    };

                    let memberStr = JSON.stringify(memberInfo);
                    localStorage.setItem("memberDB", memberStr);

                    alert('개인정보가 변경되었습니다.');
                    navigate("/");
                } else {
                    alert('비밀번호가 일치하지 않습니다.');
                }
            } else {
                alert('비밀번호를 다시 확인해 주세요.');
            }
        } else {
            alert("정보를 입력해 주세요.");
        }
    };

    const secessinoViewHandler = () => {
        setIsSecession(true);
    }

    return (
        <>
            {isLogIned ?
                isSecession
                    ?
                    <Secession loginInfo={props.loginInfo} />
                    :

                    <div id="sign_up" className="sec member" >
                        <div className="sec_item">
                            <h1 className="sec_item_title">개인정보 수정</h1>

                            <div className="sec_item_content">
                                <div>
                                    <label htmlFor="u_name">닉네임</label>
                                    <input type="text" id="u_name" name="u_name" className="input" defaultValue={memberInfo[logInId].name}
                                        onChange={nickChageHandler} placeholder="닉네임을 입력해 주세요." />
                                </div>
                                <div>
                                    <label htmlFor="u_id">아이디</label>
                                    <input type="text" readOnly id="u_id" name="u_id" className="input" defaultValue={logInId} />
                                </div>
                                <div>
                                    <label htmlFor="u_pw">
                                        비밀번호
                                    </label>
                                    <div className="btn_wrap" >
                                        <input type="password" id="u_pw" name="u_pw" className="input" defaultValue={memberInfo[logInId].pw}
                                            onChange={pwChangeHadler} placeholder="비밀번호를 입력해 주세요." />

                                    </div>
                                    <label htmlFor="u_pw" className="desc">비밀번호는 영어 소문자, 최소 1개 이상의 숫자 혹은 특수문자를 혼합하여 6~12자로 입력해 주세요.</label>
                                </div>
                                <div>
                                    <label htmlFor="pw_same">비밀번호 확인</label>
                                    <div className="btn_wrap">
                                        <input
                                            type="password"
                                            id="pw_same"
                                            name="pw_same" className="input" defaultValue={memberInfo[logInId].pw}
                                            onChange={pwSameChangeHadler} placeholder="비밀번호를 다시 입력해 주세요."
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="u_phone">전화번호</label>
                                    <input type="text" id="u_phone" name="u_phone" className="input" defaultValue={memberInfo[logInId].phone}
                                        onChange={phoneChangeHandler} placeholder="전화번호를 입력해 주세요." />
                                </div>
                                <div>
                                    <label htmlFor="u_email">이메일</label>
                                    <input type="email" id="u_email" name="u_email" className="input" defaultValue={memberInfo[logInId].email}
                                        onChange={eMailChangeHandler} placeholder="이메일을 입력해 주세요." />
                                </div>
                                <div>
                                    <label htmlFor="u_birth">생년월일</label>
                                    <input type="date" id="u_birth" name="u_birth" className="input" defaultValue={memberInfo[logInId].birth}
                                        onChange={birthChangeHandler} placeholder="생년월일을 입력해 주세요." />
                                </div>
                                <button type="button" className="btn main" onClick={changeBtnHandler}>정보 수정</button>
                                <button type="button" className="btn" onClick={secessinoViewHandler}>회원 탈퇴</button>
                            </div>
                        </div>
                    </div >
                : null}
        </>
    );
};

export default Privacy;
