import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePw from "./ChangePw";


const PwFind = () => {
    console.log("IdFind() !!!!!!!!!");

    // 뷰체인지 
    const [isFindPwBtn, setIsFindPwBtn] = useState(false);


    const [uId, setUId] = useState("");
    const [uPhone, setUphone] = useState("");

    // 네비게이트
    const navigate = useNavigate();

    // input 입력값
    const inputIdHandler = (e) => {
        console.log("inputphoneHandler() input");

        setUId(e.target.value);
    };

    const inputphoneHandler = (e) => {
        console.log("inputPasswordHandler() input");

        setUphone(e.target.value);
    };

    // 비밀번호 찾기 버튼 클릭시
    const findPwBtnHandler = () => {
        console.log("findPwBtnHandler() Clicked !!");

        let memberInStorage = JSON.parse(localStorage.getItem("memberDB"));

        let memPhone;
        if (memberInStorage[(uId.trim())] !== undefined && memberInStorage[(uId.trim())].phone === uPhone.trim()) {
            memPhone = memberInStorage[(uId.trim())].phone;

            alert('일치');

            setIsFindPwBtn(true);
            // setIsPwFindShow(false);
            return;

        } else {
            alert('회원 ID 또는 전화번호를 확인하세요.');

            return;
        }

    };


    // 로그인화면 버튼 클릭시 이동
    const signInView = () => {
        console.log("signInView() Clicked!!!!");

        navigate("/SignIn");
    };

    return (
        <>
            {
                isFindPwBtn ?
                    <ChangePw uId={uId} />
                    :
                    <div id="pw_find" className="sec member">
                        <div className="sec_item">
                            <h1 className="sec_item_title">비밀번호 찾기</h1>

                            <div className="sec_item_content">
                                <div>
                                    <label htmlFor="u_id">ID</label>
                                    <input type="text" id="u_id" className="input" value={uId} onChange={(e) => inputIdHandler(e)} placeholder="ID를 입력하세요" />
                                </div>

                                <div>
                                    <label htmlFor="u_phone">전화번호</label>
                                    <input type="password" id="u_phone" className="input" value={uPhone} onChange={(e) => inputphoneHandler(e)} placeholder="Phone Number를 입력하세요"
                                    />
                                </div>

                                <button className="btn main" onClick={findPwBtnHandler}>비밀번호 변경</button>

                                <button className="btn" onClick={signInView}>로그인으로</button>
                            </div>
                        </div>
                    </div>
            }

        </>
    );
};

export default PwFind;
