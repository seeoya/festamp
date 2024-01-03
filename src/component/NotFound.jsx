import React from "react";

const NotFound = () => {
    return (
        <div>
            <h5>
                <strong>404 Error</strong>에러가 발생하였습니다.
            </h5>
            <br />
            <h5>
                요청하신 URL을 서버에서 찾을 수 없습니다. 다른 원인은
                <br />
                확인할 수 없습니다.
            </h5>
        </div>
    );
};

export default NotFound;
