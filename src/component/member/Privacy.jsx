import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Privacy = (props) => {
    console.log("Privacy() Called!!");

    let navigate = useNavigate('');

        // Hook
        const [UName, setUName] = useState("");
        const [UPw, setUPw] = useState("");
        const [PwSame, setPwSame] = useState("");
        const [UPhone, setUPhone] = useState("");
        const [UEmail, setUEmail] = useState("");
        const [UBirth, setUBirth] = useState("");

    const [memberInfo, setMemberInfo] = useState(JSON.parse(localStorage.getItem('memberDB')) ?? "");

    let isLogIned = props.loginInfo.isLogIned;
    let logInId = props.loginInfo.logInId;

    useEffect(() => {
    

        if (!isLogIned) {
            alert('로그인 하세요');
            navigate('/SignIn');
        }
    }, []);


        // Input 입력창 수정 
        const userNameHandler = (e) => {
            console.log('userNameHandler() Write !!');
    
            setUName(e.target.value);
            console.log(UName)
            
        }
    
        const userPwHandler = (e) => {
            console.log('userPwHandler() Write !!');

            setUPw(e.target.value);
            console.log(UPw)
        }
    
        const userPwSameHandler = (e) => {
            console.log('userPwSameHandler() Write !!');

            setPwSame(e.target.value);
            console.log(PwSame)
        }
    
        const userPhoneHandler = (e) => {
            console.log('userPhoneHandler() Write !!');

            setUPhone(e.target.value);
            console.log(UPhone)
        }
        
        const userEmailHandler = (e) => {
            console.log('userEmailHandler() Write !!');

            setUEmail(e.target.value);
            console.log(UEmail)
        }
    
        const userBirthHandler = (e) => {
            console.log('userBirthHandler() Write !!');

            setUBirth(e.target.value);
            console.log(UBirth)
        }
    
        // const changeBtnHandler = () => {
        //     console.log('changeBtnHandler() Clicked !!');

        //     let memberInfo = JSON.parse(localStorage.getitem('memberDB'))
        //     console.log(memberInfo);
        // }
    return (
        <>
            {
                isLogIned ?
                    <form>
                        <div>
                            <h3>개인정보수정</h3>
                            <label htmlFor="u_name">
                                <p>이름(닉네임) </p>
                            </label>
                            <input type="text" id="u_name" name="u_name" value={UName} defaultValue={memberInfo[logInId].name} 
                            onChange={(e) => userNameHandler(e)} placeholder="이름(닉네임)" />
                            <br />
                            <label htmlFor="u_id">
                                <p>아이디</p>
                            </label>
                            <input type="text" readOnly id="u_id" name="u_id"  defaultValue={memberInfo[logInId].name} />
                            <br />
                            <label htmlFor="u_pw">
                                <p>비밀번호</p>
                            </label>
                            <input type="password" id="u_pw" name="u_pw" value={UPw} defaultValue={memberInfo[logInId].pw}
                            onChange={(e) => userPwHandler(e)} placeholder="비밀번호 " /> &nbsp;
                            <button type="button">
                            확인
                            </button>
                            <p>비밀번호는 영문 대소문자, 숫자를 혼합하여 8~20자로 입력해주세요</p>
                            <br />
                            <label htmlFor="pw_same">
                                <p>비밀번호 확인</p>
                            </label>
                            <input
                                type="password"
                                id="pw_same"
                                name="pw_same" defaultValue={memberInfo[logInId].pw}
                                onChange={(e) => userPwSameHandler(e)} value={PwSame} placeholder="비밀번호 확인"
                            /> &nbsp;
                            <button type="button">확인</button>
                            <br />
                            <label htmlFor="u_phone">
                                <p>연락처</p>
                            </label>
                            <input type="text" id="u_phone" name="u_phone" value={UPhone} defaultValue={memberInfo[logInId].phone} 
                            onChange={(e) => userPhoneHandler(e)} placeholder="연락처" />
                            <br />
                            <label htmlFor="u_email">
                                <p>이메일</p>
                            </label>
                            <input type="email" id="u_email" name="u_email" value={UEmail} defaultValue={memberInfo[logInId].email}
                            onChange={(e) => userEmailHandler(e)} placeholder="E-mail" />
                            <br />
                            <label htmlFor="u_birth">
                                <p>생년월일</p>
                            </label>
                            <input type="date" id="u_birth" name="u_birth" value={UBirth} defaultValue={memberInfo[logInId].birth}
                             onChange={(e) => userBirthHandler(e)} placeholder="생일" />
                            <br />
                            <button type="button" >수정</button>
                        </div>
                    </form >
                    : null}
        </>
    );
};

export default Privacy;
