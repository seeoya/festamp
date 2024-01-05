import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';
import Secession from "./Secession";
import SignIn from "./SignIn";

const Privacy = (props) => {
    console.log("Privacy() Called!!");
    // console.log(logInId);
    

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

    const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    const [isPass, setIsPass] = useState(false);
    const [isFormat, setIsFormat] = useState(false);

    const [isSecession, setIsSecession] = useState(false);

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

      // 비밀번호 정규식
      const formatCheck = () => {
        console.log("formatCheckBtnHandler() Clicked !!");

        if (uPw.match(passwordRegEx) !== null) {
            setIsFormat(true);
        }
    };

    // 비밀번호 확인 버튼
    const pwSameCheck = () => {
        console.log("pwSameBntHandler() Clicked!");

        if (pwSame !== "" && uPw === pwSame) {
            setIsPass(true);
        }

    };

    //정보수정 버튼
    const changeBtnHandler = () => {
        console.log('changeBtnHandler() Clicked!!');

        pwSameCheck();
        formatCheck();
        
        if (uName !== "" && uPw !== "" && uPhone !== "" && uEmail !== "" && uBirth !== "") {
            if (isPass && isFormat){
                memberInfo[logInId] = {
                name: uName,
                pw: uPw,
                phone: uPhone,
                email: uEmail,
                birth: uBirth
            };

            let memberStr = JSON.stringify(memberInfo);
            localStorage.setItem("memberDB", memberStr);

            alert('개인정보 변경 완료 !');
            navigate("/");
        } else {
            alert('정확한 정보를 입력해주세요.');
        }
       
        } else {
            alert ("정보를 입력해주세요.");
        }


    };
   
    const secessinoViewHandler = () =>{
        console.log('secessinoViewHandler() Clicked!!');
        
        setIsSecession(true);
    }

    return (
        <>
            {isLogIned?
            
                    
                        isSecession
                        ?
                        <Secession loginInfo={props.loginInfo} />
                        :
                        
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
                            <input type="text" readOnly id="u_id" name="u_id" className="input"  defaultValue={logInId} />
                          </div>
                          <div>
                            <label htmlFor="u_pw">
                                비밀번호
                            </label>
                            <div className="btn_wrap" >
                              <input type="password" id="u_pw" name="u_pw" className="input"  defaultValue={memberInfo[logInId].pw}
                                  onChange={pwChangeHadler} placeholder="비밀번호 " />
                              
                            </div>
                            <label htmlFor="u_pw" className="desc">비밀번호는 영문 대소문자, 숫자, 특수문자를 혼합하여 8~20자로 입력해주세요</label>
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
                          <button type="button" className="btn"  onClick={changeBtnHandler}>정보수정</button>
                          <button type="button" className="btn"  onClick={ secessinoViewHandler}>회원탈퇴</button>

                                                  </div>
                        </div>
                </div >
                
                    
                    :null}
        </>
    );
};

export default Privacy;
