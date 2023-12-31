import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const IdFind = () => {
    const navigate = useNavigate();

    const [uEmail, setUEmail] = useState("");
    const [uPhone, setUPhone] = useState("");

    //로그인 화면 클릭 시
    const [isLoginView, setIsLoginView] = useState(false);

    const inputEmailHandler = (e) => {
        setUEmail(e.target.value);
    };

    const inputPhoneHandler = (e) => {
        setUPhone(e.target.value);
    };

    const findIdClickHandler = () => {
        let StorageDB = localStorage.getItem("memberDB");
        if (StorageDB !== null) {
            let memberInStorage = JSON.parse(StorageDB);
            let memIdObjarr = Object.keys(memberInStorage);

            let flag = false;
            let flagId = "";

            memIdObjarr.map((el) => {
                if (memberInStorage[el].email == uEmail && memberInStorage[el].phone == uPhone) {
                    flag = true;
                    flagId = el;
                }
            });


            if (uEmail !== "" && uPhone !== "") {
                if (uEmail !== null && uEmail !== undefined) {
                    if (uPhone !== null && uPhone !== undefined) {
                        if (flag) {
                            alert(`아이디 : ${flagId}`);
                        } else {
                            alert("일치하는 아이디가 없습니다.");
                        }
                    } else {
                        alert("잘못된 전화번호입니다.");
                    }
                } else {
                    alert("잘못된 이메일입니다.");
                }
            } else {
                alert("정보를 입력해 주세요.");
            }
        } else {
            alert("일치하는 아이디가 없습니다.");
        }
    };

    const signInView = () => {
        setIsLoginView(true);
        navigate("/signin");
    };

    return (
        <div id="id_find" className="sec member">
            <div className="sec_item">
                <h1 className="sec_item_title">아이디 찾기</h1>

                <div className="sec_item_content">
                    <div>
                        <label htmlFor="u_email">이메일</label>
                        <input type="text" id="u_email" className="input" value={uEmail} onChange={(e) => inputEmailHandler(e)} placeholder="이메일을 입력해 주세요." />
                    </div>

                    <div>
                        <label htmlFor="u_phone">전화번호</label>
                        <input type="text" id="u_phone" className="input" value={uPhone} onChange={(e) => inputPhoneHandler(e)} placeholder="전화번호를 입력해 주세요" />
                    </div>

                    <button className="btn main" onClick={findIdClickHandler}>아이디 찾기</button>
                    <button className="btn" value={isLoginView} onClick={signInView}>로그인으로</button>
                </div>
            </div>
        </div>
    );
};

export default IdFind;
