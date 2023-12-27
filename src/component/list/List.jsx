import React from "react";

const List = () => {
    return (
        <div id="list_wrap">
            <div className="search_Wrap">
                <div>
                    <input type="text" placeholder="검색어를 입력해 주세요." name="uSearch"/>
                    <input type="button" value="검색" name="searchBtn"/>
                </div>
            </div>
        </div>
    );
};

export default List;
