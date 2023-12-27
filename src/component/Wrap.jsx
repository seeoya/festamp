import React from "react";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

const Wrap = () => {
    return (
        <div id="wrap">
            <Header />
            <Container />
            <Footer />
        </div>
    );
};

export default Wrap;
