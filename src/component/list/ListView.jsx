import React from "react";

const ListView = () => {
    return (
        <div id="listview_wrap">
            <div className="title">
                <h1>축제 이름</h1>
            </div>

            <div className="date">
                <h1>축제 기간</h1>
            </div>

            <div className="img">
                <img src=""/>
            </div>

            <div className="explan">
                <h1>축제 설명</h1>
            </div>

            <div className="event">
                <h1>행사 내용</h1>
            </div>

            <div className="total">
                <ul>
                    <li><FontAwesomeIcon icon="fa-solid fa-calendar" />축제 기간 : </li>
                    <li><FontAwesomeIcon icon="fa-solid fa-compass" />위치 : </li>
                    <li><FontAwesomeIcon icon="fa-solid fa-copyright" />가격 : </li>
                    <li><FontAwesomeIcon icon="fa-solid fa-tag" />상호명 : </li>
                    <li><FontAwesomeIcon icon="fa-solid fa-phone" />전화번호 : </li>
                </ul>
            </div>

            <div className="review">
                <input type="text" placeholder="리뷰를 입력해 주세요." name="uReview" />
            </div>
        </div>
    );
};

export default List;