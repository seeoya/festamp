import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ChangePw from "./ChangePw";

const PwFind = () => {
    // 뷰체인지 
    const [isFindPwBtn, setIsFindPwBtn] = useState(false);

    const [uId, setUId] = useState("");
    const [uPhone, setUphone] = useState("");

    // 네비게이트
    const navigate = useNavigate();

    // input 입력값
    const inputIdHandler = (e) => {
        setUId(e.target.value);
    };

    const inputphoneHandler = (e) => {
        setUphone(e.target.value);
    };

    // 비밀번호 찾기 버튼 클릭시
    const findPwBtnHandler = () => {
        let StorageDB = localStorage.getItem("memberDB");
        if (StorageDB !== null) {
            let memberInStorage = JSON.parse(StorageDB);

            let memPhone;
            if (memberInStorage[(uId.trim())] !== undefined && memberInStorage[(uId.trim())].phone === uPhone.trim()) {
                memPhone = memberInStorage[(uId.trim())].phone;

                alert('비밀번호 변경 페이지로 이동합니다.');

                setIsFindPwBtn(true);
                return;

            } else {
                alert('정확한 정보를 입력해주세요.');
                return;
            }
        } else {
            alert('정보를 입력해주세요.');
        }
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

                                <Link to="/signin" className="btn">로그인으로</Link>
                            </div>
                        </div>
                    </div>
            }

        </>
    );
};

export default PwFind;
