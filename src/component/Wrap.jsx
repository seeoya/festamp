import React from "react";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

import { festivalData } from "../data/festivalData";

const Wrap = () => {
    return (
        <div id="wrap">
            <Header />
            <Container festivalData={festivalData} />
            <Footer />
        </div>
    );
};

export default Wrap;
