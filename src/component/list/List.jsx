import React, { useState } from "react";
import './listStyle.css';
import { data } from "../../data/festivalData";

const List = () => {
    const [visibleItems, setVisibleItems] = useState(6); 

    const loadMoreHandler = () => {
        console.log("loadMoreHandler Clicked!!");
        setVisibleItems(load => load + 4);
    };


    return (
        <div id="list_wrap">
            <div className="festival_container">
                <div className="search_wrap">
                    <div>
                        <input type="text" placeholder="검색어를 입력해 주세요." name="uSearch"/>
                        <input type="button" value="검색" name="searchBtn"/>
                        <br></br>
                        <a href="#none">축제일순&nbsp;|</a>
                        <a href="#none">&nbsp;리뷰 많은순</a>
                    </div>
                </div>
                    <div className="festival_wrap">
                        {data.slice(0, visibleItems).map((festival, index) => (
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
                {visibleItems < data.length && (
                    <div className="load_more">
                        <button onClick={loadMoreHandler}>더 보기</button>
                    </div>
                )}
                <div className="map_stamp">
                    <div className="map">
                        <img src="imgs/dummy/map.jpg" />
                    </div>
                    <div className="stamp">
                        <img src="imgs/dummy/stamp.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default List;