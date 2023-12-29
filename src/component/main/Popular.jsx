import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Popular = (props) => {
    let festivalData = props.festivalData;
    const [popFestival, setPopFestival] = useState([]);

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
        <div className="popular">
            <h1>인기 축제 순위</h1>

            <ul className="list">
                {popFestival.map((el, i) => {
                    if (i < 10) {
                        return (
                            <li className="item">
                                <Link to={"/view/" + el.id}>{`${i + 1}. ${el.title}`}</Link>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default Popular;
