import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainReview from "../review/MainReview";
import Map from "../map/Map";
import "./viewStyle.css";
import { festivalData } from "../../data/festivalData";

const ListView = (props) => {
    let calendar = <i className="fa-regular fa-calendar-days"></i>;
    let place = <i className="fa-solid fa-compass"></i>;
    let price = <i className="fa-solid fa-copyright"></i>;
    let name = <i className="fa-solid fa-building"></i>;
    let tel = <i className="fa-solid fa-phone-volume"></i>;
    let festData = props.festivalData
    let { id } = useParams();
    console.log(id);
    const [eventsArr, setEventsArr] = useState([]);
    const [nowAddress, setNowAddress] = useState(festData[id].location);
    const [nowAddressTitle, setNowAddressTitle] = useState(festData[id].title)

    useEffect(() => {
        console.log("[ListView] useEffect!!");

        let datas = props.festivalData[id].event;
        setEventsArr(datas.split("\n"));
    }, []);

    // useParams > path="/view/:id" id 값을 가져옴 url 파라미터

    return (
        <div id="listview_wrap" className="sec">
            <div className="title">
                <p className="sec_item_title">{festData[id].title}</p>
            </div>

            <div className="date">
                <h1>{festData[id].date}</h1>
            </div>
            <div className="flex_wrap">
                <div className="middle">
                    <div className="img">
                        <img src={`/${festData[id].img}`} />
                    </div>
                    {/* <div className="event">
                            <h1>{festData[id].event}</h1>
                    </div> */}
                    <div className="explain item_explain">
                        <p>{festData[id].explain}</p>
                    </div>
                </div>

                <div className="bottom">
                    <ul className="event sec_item">
                        {eventsArr.map((event, idx) => {
                            return (
                                <li className="event_list" key={idx}>
                                    {event}
                                </li>
                            );
                        })}
                    </ul>
                    <div className="info sec_item">
                        <ul>
                            <li>
                                {calendar} &nbsp;{festData[id].date}{" "}
                            </li>
                            <li>
                                {place} &nbsp;{festData[id].location}{" "}
                                <Map
                                    festivalData={props.festivalData}
                                    width={"100%"}
                                    height={"230px"}
                                    nowAddress={nowAddress}
                                    setNowAddress={setNowAddress}
                                    nowAddressTitle={nowAddressTitle}
                                    setNowAddressTitle={setNowAddressTitle}
                                />
                            </li>
                            <li>
                                {price} &nbsp;{festData[id].price}{" "}
                            </li>
                            <li>
                                {name} &nbsp;{festData[id].store}{" "}
                            </li>
                            <li>
                                {tel} &nbsp;{festData[id].tel}{" "}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="review">
                <>
                    <MainReview
                        festivalDataId={festData[id].id}
                        festivalTitle={festData[id].title}
                        loginInfo={props.loginInfo}
                        starMinF={props.starMinF}
                    />
                </>
            </div>
        </div>
    );
};

export default ListView;
