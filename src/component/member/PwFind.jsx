import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePw from "./ChangePw";

const PwFind = () => {
    console.log("IdFind() !!!!!!!!!");

    const [uId, setUId] = useState("");
    const [uPhone, setUphone] = useState("");

    // change password 화면
    const [isUInfo, setIsUInfo] = useState(false);

    // 네비게이트
    const navigate = useNavigate();

    // 로그인뷰
    const [isLoginView, setIsLoginView] = useState(false);

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
            navigate("/ChangePw");


            return;

        } else {
            alert('회원 ID 또는 전화번호를 확인하세요.');

            return;
        }

        // console.log('memberInStorage[uId]: ', memberInStorage[uId]);

        // console.log('memPhone: ', memPhone);
        // let memberIdStr = memIdObjArr.toString();
        // console.log(memberInStorage);
        // console.log(memIdObjArr,"찍히는거");
        // console.log(uPhone);
        // console.log(!!uId);
        // console.log(!!uPhone);
        // console.log( memIdObjArr.includes(uId));
        

        // if(!!uId && !!uPhone){
        //     if(memIdObjArr.includes(uId) && uPhone !== undefined &&memPhone === uPhone){
        //         alert('회원 ID입니다.');
        //         navigate("/ChangePw")
        //     } else {
        //         alert('존재하지 않는 회원입니다.');
        //     }
        // } else {
        //     alert('정보를 입력해주세요');
        // };

    
        // if (uId !== "" && uPhone !== "") {
        //     if (uId !== null && uId !== undefined) {
        //         if (uPhone !== null && uPhone !== undefined) {
        //             setIsUInfo(true);
        //             navigate("/ChangePw");
        //         }
        //     } else {
        //         alert("존재하지 않는 ID입니다.");
        //     }
        // } else {
        //     alert("정보를 입력해주세요.");
        // }
    };
    // 로그인화면 버튼 클릭시 이동
    const signInView = () => {
        console.log("signInView() Clicked!!!!");

        setIsLoginView(true);

        navigate("/SignIn");
    };

    return (
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
                        <input type="text" id="u_phone" className="input" value={uPhone} onChange={(e) => inputphoneHandler(e)} placeholder="Phone Number를 입력하세요"
                        />
                    </div>

                    <button className="btn main" onClick={findPwBtnHandler}>비밀번호 변경</button>

                    <button className="btn" value={isLoginView} onClick={signInView}>로그인으로</button>
                </div>
            </div>

            {/* #TODO 필요한 내용인가? */}
            {/* {isUInfo ? <ChangePw /> : null} */}
        </div>
    );
};

export default PwFind;
