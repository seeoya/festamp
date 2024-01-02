import React, { useState } from "react";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

import { festivalData } from "../data/festivalData";

const Wrap = () => {

    const [isLogIned, setIsLogIned] = useState(false);
    const [logInId, setLogInId] = useState('');

    let loginInfo = { isLogIned: isLogIned, setIsLogIned: setIsLogIned, logInId: logInId, setLogInId: setLogInId };

    return (
        <div id="wrap">
            <Header />
            <Container festivalData={festivalData} loginInfo={loginInfo} />
            <Footer />
        </div>
    );
};

export default Wrap;
