import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Popular = (props) => {
    let festivalData = props.festivalData;
    const [popFestival, setPopFestival] = useState([]);
    const [isPage, setIsPage] = useState(props.count ? false : true);
    const [maxFestivalCount, setMaxFestivalCount] = useState(props.count ?? festivalData.length);


    useEffect(() => {
        console.log(festivalData.length)
        setPopFestival(sortFestival());
    }, []);

    const sortFestival = () => {
        // 축제 별점 평점 순으로 sort
        // db에서 가져오기
        let tmpArr = [];
        tmpArr = festivalData;
        return tmpArr;
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

            <ul className="list">
                {popFestival.slice(0, maxFestivalCount).map((el, i) => {
                    return (
                        <li className="item">
                            <Link to={"/view/" + el.id}>
                                <div>
                                    <span className="marker">{`${i + 1}`}</span>
                                    <span className="title">{`${el.title}`}</span>
                                </div>
                                <span className="star">★ {"4.1"}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Popular;
