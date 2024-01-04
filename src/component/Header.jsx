import React from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
    let { isLogIned, setIsLogIned, logInId, setLogInId } = props.loginInfo;

    return (
        <header>
            <Link to="/" className="logo link">
                FESTAMP
            </Link>

            <ul className="nav">
                <li>
                    <Link to="/list" className="link">
                        LIST
                    </Link>
                </li>
                <li>
                    <Link to="/popular" className="link">
                        RANKING
                    </Link>
                </li>
                {isLogIned ? (
                    <>
                        <li>
                            <Link to="/privacy" className="link">
                                PRIVACY
                            </Link>
                        </li>
                        <li>
                            <Link to="/signout" className="link">
                                SIGN OUT
                            </Link>
                        </li>
                        <li>
                            <Link to="/myreview" className="link">
                                {logInId}님
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/signup" className="link">
                                SIGN UP
                            </Link>
                        </li>
                        <li>
                            <Link to="/signin" className="link">
                                SIGN IN
                            </Link>
                        </li>
                    </>
                )}

                {/* #TODO 테스트용. 제거 예정. */}
                <li>
                    <Link to="/styleguide">STYLE GUIDE</Link>
                </li>
                {/*  */}
            </ul>
        </header>
    );
};

export default Header;
