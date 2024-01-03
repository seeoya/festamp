import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainReview from "../review/MainReview";
import "./viewStyle.css";

const ListView = (props) => {
    let calendar = <i className="fa-regular fa-calendar-days"></i>;
    let place = <i className="fa-solid fa-compass"></i>;
    let price = <i className="fa-solid fa-copyright"></i>;
    let name = <i className="fa-solid fa-building"></i>;
    let tel = <i className="fa-solid fa-phone-volume"></i>;

    const [eventsArr, setEventsArr] = useState([]);

    useEffect(() => {
        console.log("[ListView] useEffect!!");

        let datas = props.festivalData[id].event;
        setEventsArr(datas.split("\n"));
    }, []);

    // useParams > path="/view/:id" id 값을 가져옴 url 파라미터
    let { id } = useParams();
    console.log(id);

    return (
        <div id="listview_wrap" className="sec">
            <div className="title">
                <p>{props.festivalData[id].title}</p>
            </div>

            <div className="date">
                <h1>{props.festivalData[id].date}</h1>
            </div>
            <div className="flex_wrap">
                <div className="middle">
                    <div className="img">
                        <img src={`/${props.festivalData[id].img}`} />
                    </div>
                    {/* <div className="event">
                            <h1>{props.festivalData[id].event}</h1>
                    </div> */}
                    <div className="explan">
                        <p>{props.festivalData[id].explain}</p>
                    </div>
                </div>

                <div className="bottom">
                    <ul className="event">
                        {eventsArr.map((event, idx) => {
                            return (
                                <li className="event_list" key={idx}>
                                    {event}
                                </li>
                            );
                        })}
                    </ul>
                    <div className="info">
                        <ul>
                            <li>
                                {calendar} &nbsp;{props.festivalData[id].date}{" "}
                            </li>
                            <li>
                                {place} &nbsp;{props.festivalData[id].location}{" "}
                            </li>
                            <li>
                                {price} &nbsp;{props.festivalData[id].price}{" "}
                            </li>
                            <li>
                                {name} &nbsp;{props.festivalData[id].store}{" "}
                            </li>
                            <li>
                                {tel} &nbsp;{props.festivalData[id].tel}{" "}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="review">
                <>
                    <MainReview
                        festivalDataId={props.festivalData[id].id}
                        festivalTitle={props.festivalData[id].title}
                        loginInfo={props.loginInfo}
                    />
                </>
            </div>
        </div>
    );
};

export default ListView;
