import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const IdFind = () => {
    console.log("IdFind() !!!!!!!!!");

    const navigate = useNavigate();

    const [uEmail, setUEmail] = useState("");
    const [uPhone, setUPhone] = useState("");

    //로그인 화면 클릭 시
    const [isLoginView, setIsLoginView] = useState(false);

    const inputEmailHandler = (e) => {
        console.log("inputEmailHandler() input");

        setUEmail(e.target.value);
    };

    const inputPhoneHandler = (e) => {
        console.log("inputPasswordHandler() input");

        setUPhone(e.target.value);
    };

    const findIdClickHandler = () => {
        console.log("findIdHandler() Click!!!!!!");

        let StorageDB = localStorage.getItem("memberDB");
        if (StorageDB !== null) {
            let memberInStorage = JSON.parse(StorageDB);
            let memIdObjarr = Object.keys(memberInStorage);

        // console.log(memberInStorage[uId].email);
        // console.log(memberInStorage[uId].pw);

        let flag = false;
        let flagId = "";

        memIdObjarr.map((el) => {
            console.log(el, "요기기!!!!!!!!!!");
            console.log(memberInStorage[el].email, uPhone);

            if (memberInStorage[el].email == uEmail && memberInStorage[el].phone == uPhone) {
                flag = true;
                flagId = el;
            }
        });

        
        if (uEmail !== "" && uPhone !== "") {
            if (uEmail !== null && uEmail !== undefined) {
                if (uPhone !== null && uPhone !== undefined) {
                    if (flag) {
                        alert(`ID : ${flagId}`);
                    } else {
                        alert("없는 정보입니다.");
                    }
                } else {
                    alert("잘못된 Phone 번호 입니다.");
                }
            } else {
                alert("잘못된 E-mail주소 입니다.");
            }
        } else {
            alert("정보를 입력해주세요.");
        }
    } else {
        alert('존재하지 않는 회원입니다.');
    }
    };

    const signInView = () => {
        console.log("signInView() Clicked!!!!");

        setIsLoginView(true);
        navigate("/SignIn");
    };

    return (
        <div id="id_find" className="sec member">
            <div className="sec_item">
                <h1 className="sec_item_title">아이디 찾기</h1>

                <div className="sec_item_content">
                    <div>
                        <label htmlFor="u_email">이메일</label>
                        <input type="text" id="u_email" className="input" value={uEmail} onChange={(e) => inputEmailHandler(e)} placeholder="E-mail을 입력하세요" />
                    </div>

                    <div>
                        <label htmlFor="u_phone">전화번호</label>
                        <input type="text" id="u_phone" className="input" value={uPhone} onChange={(e) => inputPhoneHandler(e)} placeholder="Phone Number를 입력하세요" />
                    </div>

                    <button className="btn main" onClick={findIdClickHandler}>아이디 찾기</button>
                    <button className="btn" value={isLoginView} onClick={signInView}>로그인으로</button>
                </div>
            </div>
        </div>
    );
};

export default IdFind;
