import React from "react";
import './listStyle.css';

const ListView = () => {
    
    let calendar = <i class="fa-regular fa-calendar-days"></i>
    let place = <i class="fa-solid fa-compass"></i>
    let price = <i class="fa-solid fa-copyright"></i>
    let name = <i class="fa-solid fa-building"></i>
    let tel = <i class="fa-solid fa-phone-volume"></i>


    return (

        <div id="listview_wrap">
            <div className="title">
                <h1>축제 이름</h1>
            </div>

            <div className="date">
                <h1>축제 기간</h1>
            </div>

            <div className="img">
                <img src="imgs/dummy/img1.jpg"/>
            </div>

            <div className="explan">
                <h1>축제 설명</h1>
            </div>
            <div className="middle">
                <div className="event">
                    <h1>행사 내용</h1>
                </div>

                <div className="total">
                    <ul>
                        <li>{calendar} &nbsp;축제 기간 : </li>
                        <li>{place} &nbsp;위치 : </li>
                        <li>{price} &nbsp;가격 : </li>
                        <li>{name} &nbsp;상호명 : </li>
                        <li>{tel} &nbsp;전화번호 : </li>
                    </ul>
                </div>
            </div>
            <div className="review">
                <input type="text" placeholder="리뷰를 입력해 주세요." name="user_eview" />
                <input type="button" value="리뷰 작성" name="review_btn" />
            </div>
        </div>
    );
};

export default ListView;