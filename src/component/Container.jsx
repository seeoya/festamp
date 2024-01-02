import React, { useEffect } from "react";
import { Route, Routes } from "react-router";
import StyleGuide from "./StyleGuide";
import GradeSelect from "./grade_select/GradeSelect";
import List from "./list/List";
import ListView from "./list/ListView";
import Main from "./main/Main";
import Privacy from "./member/Privacy";
import SignIn from "./member/SignIn";
import SignOut from "./member/SignOut";
import SignUp from "./member/SignUp";
import Stamp from "./stamp/Stamp";

import MainReview from "./review/MainReview";
import ReviewModifyModal from "./review/ReviewModifyModal";
import ReviewWriteModal from "./review/ReviewWriteModal";
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
                <Route
                    path="/view/:id"
                    element={<ListView festivalData={props.festivalData} />}
                ></Route>
                <Route path="/signin" element={<SignIn loginInfo={props.loginInfo}/>}></Route>
                <Route path="/signout" element={<SignOut loginInfo={props.loginInfo}/>}></Route>
                <Route path="/signup" element={<SignUp />}></Route>
                <Route path="/privacy" element={<Privacy loginInfo={props.loginInfo}/>}></Route>

                <Route path="/mainreview" element={<MainReview />}></Route>
                <Route path="/myreview" element={<MyReview />}></Route>
                <Route path="/reviewmodifymodal" element={<ReviewModifyModal />}></Route>
                <Route path="/reviewwritemodal" element={<ReviewWriteModal />}></Route>
                
   

                {/* #TODO 테스트용. 제거 예정 */}
                <Route path="/gradeselect" element={<GradeSelect />}></Route>
                <Route path="/stamp" element={<Stamp />}></Route>
                <Route path="/styleguide" element={<StyleGuide />}></Route>
                {/*  */}

                {/* NOT FOUND */}
                <Route path="*" element={<></>}></Route>
            </Routes>
        </div>
    );
};

export default Container;
