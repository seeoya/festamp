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

        navigate("/");
    };

    return (
        <div>
            로그아웃 하시겠습니까? <br />
            <button onClick={SignOutBntHandler}>&nbsp; 예 &nbsp;</button> &nbsp;
            <button onClick={NoSignOutBntHandler}>아니오</button>
        </div>
    );
};

export default SignOut;
