import React from "react";

const StyleGuide = () => {
    return (<>

        <div id="styleguide" className="sec">
            <h1>스타일 가이드</h1>


            <h2>기본 구조</h2>
            <div className="sec">
                <h1>섹션 (.sec)</h1>

                <div className="sec_item">
                    <h1>섹션 아이템 (.sec_item)</h1>
                    <h1 className="sec_item_title">섹션 아이템 타이틀 (.sec_item_title)</h1>
                    <div className="sec_item_content">섹션 본문 (.sec_item_content)</div>
                </div>
            </div>

            <h2>스타일 요소</h2>
            <div className="sec_item">
                <h2 className="sec_item_title">색상</h2>

                <div className="sec_item_content">
                    <div className="box main">MAIN</div>
                    <div className="box sub">SUB</div>
                    <div className="box highlight">HIGHLIGHT</div>
                    <div className="box alert">ALERT</div>
                </div>
            </div>

            <div className="sec_item">
                <h2 className="sec_item_title">헤딩</h2>

                <div>
                    <h1>H1 헤더</h1>
                    <h2>H2 헤더</h2>
                    <h3>H3 헤더</h3>
                    <h4>H4 헤더</h4>
                    <h5>H5 헤더</h5>
                    <h6>H6 헤더</h6>
                </div>
            </div>


            <div className="sec_item">
                <h2 className="sec_item_title">버튼</h2>

                <div className="sec_item_content">
                    <button type="button" className="btn">
                        버튼 (button.btn)
                    </button>
                    <button type="button" className="btn main">
                        메인 버튼 (button.btn.main)
                    </button>
                    <button type="button" className="btn highlight">
                        하이라이트 버튼 (button.btn.highlight)
                    </button>
                    <button type="button" className="btn alert">
                        알림 버튼 (button.btn.alert)
                    </button>
                </div>
            </div>

            <div className="sec_item">
                <h2 className="sec_item_title">인풋</h2>

                <div className="sec_item_content">
                    <div>
                        <input type="text" className="input" placeholder="text" />
                        <input type="password" className="input" placeholder="password" />
                    </div>
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
        </div>
    </>
    );
};

export default StyleGuide;
