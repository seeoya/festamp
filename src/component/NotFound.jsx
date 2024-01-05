import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div id="notfound" className="sec">
            <div className="sec_item">
                <h1 className="sec_item_title">페이지가 없습니다.</h1>

                <div className="sec_item_content">
                    <h2>다시 확인해주세요!</h2>

                    <Link to="/" className="btn main">메인으로</Link>
                </div>

            </div>
        </div>
    );
};

export default NotFound;
