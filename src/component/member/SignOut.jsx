import React from 'react'
import { useNavigate } from 'react-router-dom';

function SignOut() {
    console.log('SignOut() Called!');
    let navigate = useNavigate();

    const SignOutBntHandler = () => {
      console.log('SignOutBntHandler() Clicked!');

      navigate("/Main");
    }

    const NoSignOutBntHandler = () => {
      console.log('NoSignOutBntHandler() Clicked!');

      navigate("/Privacy");
    }

  return (
    <div>
      로그아웃 하시겠습니까? <br />
      <button  onClick={SignOutBntHandler} >&nbsp; 예 &nbsp;</button> &nbsp;
      <button onClick={NoSignOutBntHandler}>아니오</button>


    </div>
  );
}

export default SignOut;