import React from "react";

const StyleGuide = () => {
    return (
        <div id="styleguide">
            <h1>스타일 가이드</h1>

            <div className="sec">
                <h2>색상</h2>

                <div className="box_wrap">
                    <div className="box main">MAIN</div>
                    <div className="box sub">SUB</div>
                    <div className="box highlight">HIGHLIGHT</div>
                </div>
            </div>

            <div className="sec">
                <h2>헤딩</h2>

                <div>
                    <h1>H1 헤더</h1>
                    <h2>H2 헤더</h2>
                    <h3>H3 헤더</h3>
                    <h4>H4 헤더</h4>
                    <h5>H5 헤더</h5>
                    <h6>H6 헤더</h6>
                </div>
            </div>
            <div className="sec">
                <button type="button" className="btn">
                    버튼 (button.btn)
                </button>
            </div>

            <div className="sec">
                <input type="text" className="input" placeholder="text" />
                <input type="password" className="input" placeholder="password" />
                <input type="email" className="input" placeholder="email" />
                <input type="tel" className="input" placeholder="tel" />
                <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="10"
                    className="input"
                    placeholder="textarea"
                ></textarea>
            </div>
        </div>
    );
};

export default StyleGuide;

// 추후에 스타일 가이드대로 preview 이미지 만들어서 첨부

// 폰트 : 나눔고딕

// 회원가입 폼
// 로그인 폼 둥글기 : 10px
// 로그인 폼 아이디, 비밀번호, 이메일, 핸드폰번호 입력란 둥글기 : 15px
// 회원가입 버튼 둥글기 : 15px

// 메뉴
// 글자 크기 : 18px
// display : flex
// justify-contents : space-between

// 축제 list
// 사진 둥글기 : 15px
// 축제일순 / 리뷰 많은 순 글자 크기 : 11px
// 축제 info
// 축제이름 글자 크기 12px
// 글자 크기 : 11px

// 축제 detail
// 축제 이름 글자크기 : 20px
// 축제 기간 글자크기 : 12px
// 축제 설명 글자 크기 : 14px
// 축제기간/위치/가격/상호명/전화번호 글자 크기 : .9em

// 축제 리뷰
// 축제 사진 테두리 : 1px solid #fffdfd
// 축제 사진 둥글기 : 15px
// 축제 정보 글자 크기 : 1.1em
// 축제 정보 폼 테두리 : 1px solid #fffdfd
// 축제 정보 폼 둥글기 : 15px
// 키워드 및 별점 리뷰 글자 크기 : 1.
// 리뷰 리스트 테두리 : 축제 정보 폼 테두리 : 1px solid #fffdfd
// 리뷰 리스트 둥글기 : 10px
// 리뷰 리스트 글자크기 : 1.1em
// 리뷰 작성 모달 배경색 : rgba(0, 0, 0, .6)
// 리뷰 작성 테두리 : 1px solid #fffdfd
// 리뷰 작성 둥글기 : 10px

// 메인 컬러 :  #47a8d5
// 서브 컬러 : #83c4e3
// 보더 컬러 : #242424
// 하이라이트 컬러 : #1db7ff

// 섹션 색상, 테두리, 보더 둥글기 등
// 헤더 스타일
// 글자 크기 : 32px
// 14px = 1.4rem
// 배경색 : #fafafa
// 글자색 : #1db7ff

// h1 스타일
// 테두리 : 1px solid #242424
// 글자색 : #242424
// 배경색 : #f0f0f0

//  h2 스타일
// 테두리 : 1px solid #242424
// 배경색 : #f0f0f0
// 글자색 : #242424

//  h3 스타일
// border-bottom : 1px solid #242424
// 배경색 : #f0f0f0
// 글자색 : #242424
