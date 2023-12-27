import React, { useEffect } from "react";
import Main from "./main/Main";

const Container = (props) => {
    useEffect(() => {
        console.log(props.data);
    }, []);
    return (
        <div id="container">
            {props.data[0].title}
            {/* 여기에 본문 컴포넌트 삽입 */}
            <Main />
        </div>
    );
};

export default Container;
