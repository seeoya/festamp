import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header>
            <div>Logo</div>

            <ul className="nav">
                <li>
                    <Link to="/">HOME</Link>
                </li>
                <li>
                    <Link to="/list">LIST</Link>
                </li>
                <li>
                    <Link to="/view/1">VIEW(1)</Link>
                </li>
                <li>
                    <Link to="/view/11">VIEW(11)</Link>
                </li>
                <li>
                    <Link to="/signin">SIGN IN</Link>
                </li>
                <li>
                    <Link to="/signout">SIGN OUT</Link>
                </li>
                <li>
                    <Link to="/signup">SIGN UP</Link>
                </li>

                {/* #TODO 테스트용. 제거 예정. */}
                <li>
                    <Link to="/gradeselect">*GRADE SELECT</Link>
                </li>
                <li>
                    <Link to="/styleguide">STYLE GUIDE</Link>
                </li>
                {/*  */}
            </ul>
        </header>
    );
};

export default Header;
