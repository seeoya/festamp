import React, { useState } from "react";
import './listStyle.css';


const List = (props) => {
    const [visibleItems, setVisibleItems] = useState(6); 
    const [searchTerm, setSearchTerm] = useState("");

    const loadMoreHandler = () => {
        console.log("loadMoreHandler Clicked!!");
        setVisibleItems(load => load + 6);
    };
    
    const festivalData = props.festivalData.filter((festival) => {
        return !searchTerm || festival.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div id="list_wrap">
            <div className="festival_container">
                <div className="search_wrap">
                    <div>
                        <input
                            type="text"
                            placeholder="검색어를 입력해 주세요."
                            name="uSearch"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <br></br>
                        <div className="filter_wrap">
                            <a href="#none">축제일순&nbsp;|</a>
                            <a href="#none">&nbsp;리뷰 많은순</a>
                        </div>
                    </div>
                </div>
                    <div className="festival_wrap">
                        {festivalData.slice(0, visibleItems).map((festival, index) => (
                            <div className="festival_item" key={index}>
                                <div>
                                    <a href="">
                                    <img src={festival.img} />
                                    <h3>{festival.title}</h3>
                                    <h5>{festival.date}</h5>
                                    <h5>{festival.city}</h5>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                {visibleItems < festivalData.length && (
                    <div className="load_more">
                        <button onClick={loadMoreHandler}>더 보기</button>
                    </div>
                )}
                
                    <div className="map">
                        {/* 지도 자리 */}
                        <img src="imgs/dummy/map.jpg" /> 
                    </div>
                    <div className="stamp">
                        {/* 스탬프 이미지 자리 */}
                        <img src="imgs/dummy/stamp.jpg" />
                    </div>
                
            </div>
        </div>
    );
};

export default List;