import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import StyleGuide from "./StyleGuide";
import GradeSelect from "./grade_select/GradeSelect";
import List from "./list/List";
import Main from "./main/Main";
import ChangePw from "./member/ChangePw";
import IdFind from "./member/IdFind";
import Privacy from "./member/Privacy";
import PwFind from "./member/PwFind";
import SignIn from "./member/SignIn";
import SignOut from "./member/SignOut";
import SignUp from "./member/SignUp";
import Secession from './member/Secession'
import Stamp from "./stamp/StampPage";
import ListView from "./view/View";

import NotFound from "./NotFound";
import PopularPage from "./main/PopularPage";
import MyReview from "./review/MyReview";

const Container = (props) => {
    useEffect(() => {
        // 데이터 가져오는 법
        console.log(props.festivalData);
        console.log(props.festivalData[0].title);
    }, []);

    return (
        <div id="container">
            {/* 여기에 본문 컴포넌트 삽입 */}
            <Routes>
                {/* MAIN */}
                <Route path="/" element={<Main festivalData={props.festivalData} />}></Route>
                <Route path="/list" element={<List festivalData={props.festivalData} />}></Route>
                <Route path="/view/:id" element={<ListView festivalData={props.festivalData}
                                                           loginInfo={props.loginInfo} starMinF={props.starMinF} />}></Route>
                <Route path="/popular" element={<PopularPage festivalData={props.festivalData} />}></Route>
                <Route path="/signin" element={<SignIn loginInfo={props.loginInfo} />}></Route>
                <Route path="/signout" element={<SignOut loginInfo={props.loginInfo} />}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/privacy" element={<Privacy loginInfo={props.loginInfo} />}></Route>
                <Route path="/idfind" element={<IdFind />}></Route>
                <Route path="/pwfind" element={<PwFind />}></Route>
                <Route path="/changePw" element={<ChangePw />}></Route>
                <Route path="/secession" element={<Secession loginInfo={props.loginInfo} />}></Route>

                <Route path="/myreview" element={<MyReview festivalData={props.festivalData} loginInfo={props.loginInfo} />}></Route>

                {/* #TODO 테스트용. 제거 예정 */}
                <Route path="/gradeselect" element={<GradeSelect />}></Route>
                <Route path="/stamp" element={<Stamp />}></Route>
                <Route path="/styleguide" element={<StyleGuide />}></Route>
                {/*  */}

                {/* NOT FOUND */}
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </div>
    );
};

export default Container;
