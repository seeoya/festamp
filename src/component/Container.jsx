import React from "react";
import Main from "./main/Main";
import ListView from "./list/ListView";

const Container = () => {
    return (
        <div id="container">
            {/* 여기에 본문 컴포넌트 삽입 */}
            <Main />
            <ListView />
        </div>
    );
};

export default Container;
