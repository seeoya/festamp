import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Popular = (props) => {
    let festivalData = props.festivalData;
    const [fesList, setFesList] = useState([]);
    const [starList, setStarList] = useState([]);
    const [isPage, setIsPage] = useState(props.count ? false : true);
    const [maxFestivalCount, setMaxFestivalCount] = useState(props.count ?? festivalData.length);


    useEffect(() => {
        sortFestival();
    }, []);

    const sortFestival = () => {

        setFesList(festivalData);

        if (localStorage.getItem("starDB")) {
            let starDB = JSON.parse(localStorage.getItem("starDB"));
            let tmpFesList = [];
            let tmpStarList = [];

            starDB.map((el, i) => {
                console.log(el.starMin);
                if (el.starMin && el.starMin > 0) {
                    tmpStarList.push({ fNo: i, star: el.starMin, count: el.list.length });
                }
            })

            tmpStarList.sort((a, b) => {
                if (a.star > b.star) return -1;
                if (a.star < b.star) return +1;
                return 0;
            });

            tmpStarList.map((el) => {
                tmpFesList.push(festivalData[el.fNo])
            })

            setFesList(tmpFesList);
            setStarList(tmpStarList);
        }
    };

    return (
        <div id={isPage ? null : "main_popular"} className="sec_item">
            <h1 className="sec_item_title">
                인기 축제 순위
                {!isPage ?
                    <div className="sub">
                        <Link to="/popular">더보기</Link>
                    </div>
                    : null
                }
            </h1>

            {starList[0] ?
                <ul className="list">
                    {fesList.slice(0, maxFestivalCount).map((el, i) => {
                        if (el) {
                            return (
                                <li className="item" key={i}>
                                    <Link to={"/view/" + el.id}>
                                        <div>
                                            <span className="marker">{`${i + 1}`}</span>
                                            <span className="title">{`${el.title}`}</span>
                                        </div>

                                        <div className="info">
                                            <span className="comment"><i class="fa-regular fa-comment-dots"></i>{starList[i].count}</span>
                                            <span className="star"><i class="fa-solid fa-star"></i>{starList[i].star}</span>
                                        </div>
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
                : <div className="empty">리뷰가 없어요!</div>
            }
        </div>
    );
};

export default Popular;
