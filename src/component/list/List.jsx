import React, { useState } from "react";
import './listStyle.css';
import { Link, Routes } from "react-router-dom";
import ListView from "./ListView";




const List = (props) => {
    const [visibleItems, setVisibleItems] = useState(6);
    const [searchTerm, setSearchTerm] = useState(""); // 검색어
    const [sortByDate, setSortByDate] = useState(false);

    // useState 처음 6 > loadMoreHandler 동작 시 + 6 //
    const loadMoreHandler = () => {
        setVisibleItems(load => load + 6);
    };

    // 버튼 클릭 시 정렬 상태 변경
    const toggleSortByDate = () => {
        
        setSortByDate(!sortByDate); 
        
    };

     // filter > 주어진 조건을 통과하는 요소를 새로운 배열로 반환 //
    let festivalData = props.festivalData.filter((festival) => {
         // toLowerCase > 소문자 변환         includes > 요소가 배열 안에 존재하는 경우에만 true 을 반환 //
        return !searchTerm || festival.title.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // 정렬 상태에 따라 데이터 정렬
    // 축제일순을 Click시 sortByDate가 false > true if문 동작
    if (sortByDate) {
        // sort > 배열 내의 값들이 오름차순으로 정렬 // 
        festivalData = festivalData.sort((a, b) => {
            const dateA = new Date(a.startDate);
            const dateB = new Date(b.startDate);
        // dataA - dateB > 숫자 배열을 오름차순으로 해주기 위해서  dataB - dateA > 내림차순 //
            return dateA - dateB;
        });
    }

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
                            <a href="#none" onClick={toggleSortByDate}>
                                축제일순
                            </a>
                        </div>
                    </div>
                </div>
                <div className="festival_wrap">
                    {/* slice > 첫번째 인자부터 ~ 두번째 인자 전까지 값을 새로운 배열로 만들 때 사용 */}
                    {/* slice 통과한 게 map에 들어가서 반복*/}
                    {festivalData.
                    slice(0, visibleItems)
                    .map((festival, index) => (
                        <div className="festival_item" key={index}>
                            <div>
                                <Link to={`/view/${festival.id}`} >
                                    <img src={festival.img} />
                                    <h3>{festival.title}</h3>
                                    <h5>{festival.date}</h5>
                                    <h5>{festival.city}</h5>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
                {/* visibleItems이 남아있는 festivalData 크고 버튼이 눌리면  */}
                {visibleItems < festivalData.length &&  (
                    <div className="load_more">
                        <button onClick={loadMoreHandler}>더 보기</button>
                    </div>
                )}
                <div className="map">
                    {/* 지도 자리 */}
                    <img src="imgs/festival/map.jpg" />
                </div>
                <div className="stamp">
                    {/* 스탬프 이미지 자리 */}
                    <img src="imgs/festival/stamp.gif" />
                </div>
            </div>
        </div>
    );
};

export default List;
