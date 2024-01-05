import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Secession = (props) => {

    let islogiend = props.loginInfo.isLogIned;
    let logiend = props.loginInfo.setIsLogIned;
    let logiendId = props.loginInfo.logInId;

    let navigate = useNavigate();

    useEffect(() => {
        if (!islogiend) {
            alert('로그인 하세요');
            navigate('/signin');
        }
    }, []);

    const deleteInfoHandeler = () => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            alert("이용해주셔서 감사합니다.");
            let storageMem = JSON.parse(localStorage.getItem("memberDB"));

            let changeInfo = delete storageMem[logiendId];

            let newmemInfo = JSON.stringify(storageMem)
            localStorage.setItem("memberDB", newmemInfo);
            logiend(false);
            navigate("/");
        } else {
            alert("메인으로 돌아갑니다");
            navigate("/");
        }
    }

    const showMainHandelr = () => {
        navigate("/")
    }

    return (
        <>
            {
                islogiend ?
                    <div id="secession" className="sec member">
                        < div className="sec_item" >
                            <h1 className="sec_item_title">회원 탈퇴</h1>

                            <div className='sec_item_content'>
                                탈퇴하시면 스탬프 혜택이 사라집니다.<br />
                                그래도 탈퇴하시겠습니까?
                            </div>

                            <div className="btn_wrap">
                                <button onClick={deleteInfoHandeler} className="btn main" >예</button>
                                <button onClick={showMainHandelr} className="btn" >아니오</button>
                            </div>
                        </div >
                    </div >
                    : null}</>
    )
}

export default Secession;
