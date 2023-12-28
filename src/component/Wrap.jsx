import React from "react";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";

import { data } from "../data/festivalData";

const Wrap = () => {
    return (
        <div id="wrap">
            <Header />
            <Container data={data} />
            <Footer />
        </div>
    );
};

export default Wrap;
