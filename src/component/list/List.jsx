import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Map from "../map/Map";
import "./listStyle.css";

const List = (props) => {
    const [visibleItems, setVisibleItems] = useState(6);
    const [searchTerm, setSearchTerm] = useState(""); // 검색어
    const [sortByDate, setSortByDate] = useState(false);
    const [nowAddress, setNowAddress] = useState("");
    const [nowAddressTitle, setNowAddressTitle] = useState("");
    const [ingByDate, setIngByDate] = useState(false);
    const [festData, setFestData] = useState(props.festivalData ?? []);

    const listDivEle = useRef();

    useEffect(() => {
        filterArray(props.festivalData);
    }, [ingByDate, searchTerm, sortByDate, visibleItems]);

    // useState 처음 6 > loadMoreHandler 동작 시 + 6 //
    const loadMoreHandler = () => {
        setVisibleItems((load) => load + 6);

        setTimeout(() => {
            scrollBottom();
        }, [1])
    };

    const scrollBottom = () => {
        let list = document.getElementById("festival_inner");
        list.scrollTop = list.scrollHeight;
    }

    // 버튼 클릭 시 정렬 상태 변경
    const toggleSortByDate = () => {
        setSortByDate(!sortByDate);
    };

    const toggleIngByDate = () => {
        setIngByDate(!ingByDate);
    };

    const filterArray = (data) => {
        // filter > 주어진 조건을 통과하는 요소를 새로운 배열로 반환 //
        // includes > 요소가 배열 안에 존재하는 경우에만 true 을 반환 //
        let festivalData = data.filter((festival) => {
            let flag = true;

            if (searchTerm !== null) {
                if (!festival.title.includes(searchTerm)) {
                    flag = false;
                }
            }
            //flag >> 필요 없는 걸 if (flag) 여기서 false 를 줘서 배열에 안 넣고 버리기 위해
            if (ingByDate) {
                let today = new Date();
                let startDate = new Date(festival.startDate);
                let endDate = new Date(festival.endDate);

                if (!(today >= startDate && today <= endDate)) {
                    flag = false;
                }
            }

            if (flag) {
                return festival;
            }
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

        setFestData(festivalData);
    };

    const changeNowAddress = (location, title) => {
        setNowAddress(location);
        setNowAddressTitle(title);
    };

    return (
        <div id="list_wrap" className="sec">
            <div className="festival_container">
                <div className="search_wrap">
                    <input type="search" placeholder="검색어를 입력해 주세요." name="uSearch" className="input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                    <div className="filter_wrap">
                        <div>
                            <input type="checkbox" id="starting_date" className="input" name="starting_date" onClick={toggleSortByDate} />
                            <label htmlFor="starting_date">축제일순으로 보기</label>
                        </div>

                        <div>
                            <input type="checkbox" id="ing_date" className="input" name="ing_date" onClick={toggleIngByDate} />
                            <label htmlFor="ing_date">진행중인 축제 보기</label>
                        </div>
                    </div>
                </div>

                <div className="festival_wrap">
                    {/* slice > 첫번째 인자부터 ~ 두번째 인자 전까지 값을 새로운 배열로 만들 때 사용 */}
                    {/* slice 통과한 게 map에 들어가서 반복*/}
                    <div id="festival_inner" className="festival_inner" ref={listDivEle}>
                        {festData.slice(0, visibleItems).map((festival, index) => (
                            <div className="festival_item" key={index}>
                                <div>
                                    <Link to={`/view/${festival.id}`} onMouseOver={() => changeNowAddress(festival.location, festival.title)}>
                                        <img src={festival.img} alt={festival.title} />
                                        <h3>{festival.title}</h3>
                                        <h5>{festival.date}</h5>
                                        <h5>{festival.city}</h5>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* visibleItems이 남아있는 festivalData 크고 버튼이 눌리면  */}
                    {visibleItems < festData.length && (
                        <div className="load_more">
                            <button onClick={loadMoreHandler} className="btn main">더 보기</button>
                        </div>
                    )}
                </div>

                <div className="map">
                    <Map
                        festivalData={props.festivalData}
                        width={"100%"}
                        height={"100%"}
                        nowAddress={nowAddress}
                        setNowAddress={setNowAddress}
                        nowAddressTitle={nowAddressTitle}
                        setNowAddressTitle={setNowAddressTitle}
                    />
                </div>

                <Link to="/mypage" className="stamp">
                    <img src="./imgs/logo/stamp2.png" alt="마이페이지로" />
                </Link>
            </div>
        </div >
    );
};

export default List;
