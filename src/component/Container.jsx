import React from "react";
import { Route, Routes } from "react-router";
import NotFound from "./NotFound";
import StyleGuide from "./StyleGuide";
import List from "./list/List";
import Main from "./main/Main";
import PopularPage from "./main/PopularPage";
import ChangePw from "./member/ChangePw";
import IdFind from "./member/IdFind";
import Privacy from "./member/Privacy";
import PwFind from "./member/PwFind";
import Secession from './member/Secession';
import SignIn from "./member/SignIn";
import SignOut from "./member/SignOut";
import SignUp from "./member/SignUp";
import MyPage from "./review/MyPage";
import ListView from "./view/View";

const Container = (props) => {
    return (
        <div id="container">
            <Routes>
                {/* MAIN */}
                <Route path="/" element={<Main festivalData={props.festivalData} />}></Route>
                {/* LIST */}
                <Route path="/list" element={<List festivalData={props.festivalData} />}></Route>
                {/* VIEW */}
                <Route path="/view/:id" element={<ListView festivalData={props.festivalData} loginInfo={props.loginInfo} starMinF={props.starMinF} />}></Route>
                {/* POPULAR */}
                <Route path="/popular" element={<PopularPage festivalData={props.festivalData} />}></Route>
                {/* SIGN */}
                <Route path="/signin" element={<SignIn loginInfo={props.loginInfo} />}></Route>
                <Route path="/signout" element={<SignOut loginInfo={props.loginInfo} />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/privacy" element={<Privacy loginInfo={props.loginInfo} />}></Route>
                <Route path="/idfind" element={<IdFind />}></Route>
                <Route path="/pwfind" element={<PwFind />}></Route>
                <Route path="/changePw" element={<ChangePw />}></Route>
                <Route path="/secession" element={<Secession loginInfo={props.loginInfo} />}></Route>

                {/* MYPAGE */}
                <Route path="/mypage" element={<MyPage festivalData={props.festivalData} loginInfo={props.loginInfo} starMinF={props.starMinF} />}></Route>

                {/* STYLE GUIDE */}
                <Route path="/styleguide" element={<StyleGuide />}></Route>

                {/* NOT FOUND */}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
    );
};

export default Container;
