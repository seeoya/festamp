import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Popular = (props) => {
    let festivalData = props.festivalData;
    const [popFestival, setPopFestival] = useState([]);
    const [maxFestivalCount, setMaxFestivalCount] = useState(10);

    useEffect(() => {
        setPopFestival(sortFestival());
    }, []);

    const sortFestival = (num = 10) => {
        // 축제 별점 평점 순으로 sort
        let tmpArr = [];
        tmpArr = festivalData;
        return tmpArr;
    };

    return (
        <div id="main_popular" className="sec_item">
            <h1 className="sec_item_title">인기 축제 순위</h1>

            <ul className="list">
                {popFestival.slice(0, maxFestivalCount).map((el, i) => {
                    return (
                        <li className="item">
                            <Link to={"/view/" + el.id}>
                                <span className="marker">{`${i + 1}`}</span>
                                <span className="title">{`${el.title}`}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Popular;
