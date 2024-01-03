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
        let memIdObjarr = Object.keys(memberInStorage);
        console.log(memberInStorage[uId].phone);
        console.log(memIdObjarr);
        console.log(uPhone);

        if (uId !== "" && uPhone !== "") {
            if (uId !== null && uId !== undefined) {
                if (uPhone !== null && uPhone !== undefined) {
                    setIsUInfo(true);
                    navigate("/ChangePw");
                }
            } else {
                alert("존재하지 않는 ID입니다.");
            }
        } else {
            alert("정보를 입력해주세요.");
        }
    };
    // 로그인화면 버튼 클릭시 이동
    const signInView = () => {
        console.log("signInView() Clicked!!!!");

        setIsLoginView(true);

        navigate("/SignIn");
    };

    return (
        <div>
            <div>
                <h3>비밀번호 찾기</h3>
                <label htmlFor="u_id">
                    <p>ID</p>{" "}
                </label>
                <input
                    type="text"
                    id="u_id"
                    value={uId}
                    onChange={(e) => inputIdHandler(e)}
                    placeholder="ID를 입력하세요"
                />
                <label htmlFor="u_phone">
                    <p>Phone Number</p>{" "}
                </label>
                <input
                    type="text"
                    id="u_phone"
                    value={uPhone}
                    onChange={(e) => inputphoneHandler(e)}
                    placeholder="Phone Number를 입력하세요"
                />
                <br />
                <button onClick={findPwBtnHandler}>비밀번호 변경</button> &nbsp;
                <button value={isLoginView} onClick={signInView}>
                    로그인 화면
                </button>
                {isUInfo ? <ChangePw /> : null}
            </div>
        </div>
    );
};

export default PwFind;
