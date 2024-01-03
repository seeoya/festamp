import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';

const Privacy = (props) => {
    console.log("Privacy() Called!!");

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

    const passwordRegEx = /^[A-Za-z0-9]{8,20}$/;


    useEffect(() => {
        if (!isLogIned) {
            alert('로그인 하세요');
            navigate('/SignIn');
        } else {
            console.log(memberInfo);
        }
    }, []);

    const nickChageHandler = (e) => {
        console.log('nickChageHandler() Changed!!');

        setUName(e.target.value);
        console.log(e.target.value);
    }

    const pwChangeHadler = (e) => {
        console.log('pwChangeHadler() Changed!!');

        setUPw(e.target.value);
        console.log(uPw);
    }

    const pwSameChangeHadler = (e) => {
        console.log('pwSameChangeHadler() Changed!!');

        setPwSame(e.target.value);
        console.log(pwSame);
    }

    const phoneChangeHandler = (e) => {
        console.log('phoneChangeHandler() Changed!!');

        setUPhone(e.target.value);
        console.log(uPhone);
    }

    const eMailChangeHandler = (e) => {
        console.log('eMailChangeHandler() Changed!!');

        setUEmail(e.target.value);
        console.log(uEmail);
    }

    const birthChangeHandler = (e) => {
        console.log('birthChangeHandler() Changed!!');

        setUBirth(e.target.value);
        console.log(uBirth);
    }

    const changeBtnHandler = () => {
        console.log('changeBtnHandler() Clicked!!');
        console.log(logInId, '얘는 아이디');
        console.log(memberInfo, '정보');
        console.log(memberInfo[logInId], "얘는 뭐야야야야야 ");

        let currentMemInfo = memberInfo;

        console.log(currentMemInfo, '이거 머야야야야야양');
        console.log(uName, uPw, uPhone, uEmail, uBirth);

        if (uName !== "" && uPw !== "" && uPhone !== "" && uEmail !== "" && uBirth !== "") {
           if(uPw === pwSame){
            currentMemInfo[logInId] = {
                name: uName,
                pw: uPw,
                phone: uPhone,
                email: uEmail,
                birth: uBirth
            };

            let memberStr = JSON.stringify(currentMemInfo);
            localStorage.setItem("memberDB", memberStr);

            alert('개인정보 변경 완료 !');
            navigate("/");
        } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        } else {
            alert ("정보를 입력해주세요.");
        }


    }
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

    const formatCheckBtnHandler = () => {
        console.log("formatCheckBtnHandler() Clicked !!");

        if (uPw.match(passwordRegEx) === null) {
            alert("올바른 비밀번호를 입력해주세요.");
        } else {
            alert("사용 가능한 비밀번호 입니다.");
        }
    };

    return (
        <>
            {
                isLogIned ?
                    <div id="sign_up" className="sec member" > 
                        <div className="sec_item">
                            <h1 className="sec_item_title">개인정보수정</h1>

                            <div className="sec_item_content">
                              <div>
                                <label htmlFor="u_name">이름(닉네임) </label>
                                <input type="text" id="u_name" name="u_name" className="input"  defaultValue={memberInfo[logInId].name}
                                    onChange={nickChageHandler} placeholder="이름(닉네임)" />
                              </div>
                              <div>
                                <label htmlFor="u_id">아이디</label>
                                <input type="text" readOnly id="u_id" name="u_id" className="input"  defaultValue={memberInfo[logInId].name} />
                              </div>
                              <div>
                                <label htmlFor="u_pw">
                                    비밀번호
                                </label>
                                <div className="btn_wrap" >
                                  <input type="password" id="u_pw" name="u_pw" className="input"  defaultValue={memberInfo[logInId].pw}
                                      onChange={pwChangeHadler} placeholder="비밀번호 " />
                                  <button type="button" className="btn main"  onClick={formatCheckBtnHandler}>
                                      확인
                                  </button>
                                </div>
                                <label htmlFor="u_pw" className="desc">비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요</label>
                              </div>
                              <div>
                                <label htmlFor="pw_same">비밀번호 확인</label>
                                <div className="btn_wrap">
                                  <input
                                      type="password"
                                      id="pw_same"
                                      name="pw_same" className="input"  defaultValue={memberInfo[logInId].pw}
                                      onChange={pwSameChangeHadler} placeholder="비밀번호 확인"
                                  />
                                  <button type="button" className="btn main"  onClick={pwSameBntHandler}>비밀번호 확인</button>
                                </div>
                              </div>
                              <div>
                                <label htmlFor="u_phone">연락처</label>
                                <input type="text" id="u_phone" name="u_phone" className="input"  defaultValue={memberInfo[logInId].phone}
                                    onChange={phoneChangeHandler} placeholder="연락처" />
                              </div>
                              <div>
                                <label htmlFor="u_email">이메일</label>
                                <input type="email" id="u_email" name="u_email" className="input"  defaultValue={memberInfo[logInId].email}
                                    onChange={eMailChangeHandler} placeholder="E-mail" />
                              </div>
                              <div>
                                <label htmlFor="u_birth">생년월일</label>
                                <input type="date" id="u_birth" name="u_birth" className="input"  defaultValue={memberInfo[logInId].birth}
                                    onChange={birthChangeHandler} placeholder="생일" />
                              </div>
                              <button type="button" className="btn"  onClick={changeBtnHandler}>수정</button>
                                                      </div>
                            </div>
                    </div >
                    : null}
        </>
    );
};

export default Privacy;
