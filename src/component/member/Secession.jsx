import React from 'react'

const Secession = (props) => {

  let logiend = props.loginInfo.isLogIned;
  let logiendId = props.loginInfo.logInId;
  
  return (
    <div id="secession" className="sec member">
    <div className="sec_item">
        <h1 className="sec_item_title">탈퇴하시면 스탬프 혜택이 사라집니다. <br />
                                       그래도 탈퇴하시겠습니까? </h1>

        <div className="btn_wrap">
            <button className="btn main" >예</button>
            <button className="btn" >아니오</button>
        </div>
    </div>
</div>
  )
}

export default Secession;
