import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
    let { isLogIned, setIsLogIned, logInId, setLogInId } = props.loginInfo;
    const [memberData, setMemberData] = useState("");
    const [isLoginState, setIsLoginState] = useState(isLogIned);

    useEffect(() => {
        changeHeadName();
    }, [])

    useEffect(() => {
        changeHeadName();
    }, [isLoginState])

    const changeHeadName = () => {
        let memberDB = localStorage.getItem("memberDB");
        if (memberDB) {
            memberDB = JSON.parse(localStorage.getItem("memberDB"));
            if (memberDB[logInId]) {
                setMemberData(memberDB[logInId]);
            }
        }
    }

    return (
        <header>
            <div className="header_wrap">
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
                                <Link to="/mypage" className="link">
                                    {memberData ? `${memberData.name}님` : `${logInId}님`}
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
                </ul>
            </div>
        </header>
    );
};

export default Header;
