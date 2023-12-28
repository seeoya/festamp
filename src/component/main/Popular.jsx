import React from "react";

const Popular = (props) => {
    let data = props.data;

    return (
        <div className="popular">
            <h2>인기 축제 TOP 10</h2>
            <ul className="list">
                {data.map((el, i) => {
                    if (i < 10) {
                        return (
                            <li className="item">
                                <a href="#">{`${i+1}. ${el.title}`}</a>
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
};

export default Popular;
