import React, { useEffect } from "react";
import Main from "./main/Main";

const Container = (props) => {
    useEffect(() => {
        // 데이터 가져오는 법
        console.log(props.data);
        console.log(props.data[0].title);
    }, []);

    return (
        <div id="container">
            {/* 여기에 본문 컴포넌트 삽입 */}
            <Main data={props.data} />
        </div>
    );
};

export default Container;
