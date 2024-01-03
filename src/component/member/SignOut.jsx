import React from "react";
import { useNavigate } from "react-router-dom";

const SignOut = (props) => {
    let setIsLogined = props.loginInfo.setIsLogIned;
    let setLogInId = props.loginInfo.setLogInId;

    console.log("SignOut() Called!");
    let navigate = useNavigate();

    const SignOutBntHandler = () => {
        console.log("SignOutBntHandler() Clicked!");

        setIsLogined(false);
        setLogInId("");

        navigate("/");
    };

    const NoSignOutBntHandler = () => {
        console.log("NoSignOutBntHandler() Clicked!");

        navigate("/Privacy");
    };

    return (
        <div id="sign_out" className="sec member">
            <div className="sec_item">
                <h1 className="sec_item_title">로그아웃 하시겠습니까?</h1>

                <div className="btn_wrap">
                    <button className="btn main" onClick={SignOutBntHandler}>예</button>
                    <button className="btn" onClick={NoSignOutBntHandler}>아니오</button>
                </div>
            </div>
        </div>
    );
};

export default SignOut;
