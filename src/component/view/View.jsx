import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Map from "../map/Map";
import MainReview from "../review/MainReview";
import "./viewStyle.css";

const ListView = (props) => {

    let festData = props.festivalData;
    let { id } = useParams();
    const [eventsArr, setEventsArr] = useState([]);
    const [nowAddress, setNowAddress] = useState(festData[id].location);
    const [nowAddressTitle, setNowAddressTitle] = useState(festData[id].title)

    useEffect(() => {
        let datas = props.festivalData[id].event;
        setEventsArr(datas.split("\n"));
    }, []);

    return (
        <div id="listview_wrap" className="sec">
            <div className="sec_item">
                <div className="title">
                    <p className="sec_item_title">{festData[id].title}</p>
                </div>

                <div className="date">
                    <h1>{festData[id].date}</h1>
                </div>
                <div className="flex_wrap">
                    <div className="middle">
                        <div className="img">
                            <img src={`${festData[id].img}`} />
                        </div>

                        <div className="explain item_explain">
                            <p>{festData[id].explain}</p>
                        </div>
                    </div>

                    <div className="bottom">
                        <ul className="event sec_item">
                            {eventsArr.map((event, idx) => {
                                return (
                                    <li className="event_list" key={idx}>{event}</li>
                                );
                            })}
                        </ul>
                        <div className="info sec_item">
                            <ul>
                                <li>
                                    <i className="fa-regular fa-calendar-days"></i>
                                    <span>{festData[id].date}</span>
                                </li>

                                <li>
                                    <i className="fa-solid fa-compass"></i>
                                    <span>{festData[id].location}</span>
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
                                    <i className="fa-solid fa-copyright"></i>
                                    <span>{festData[id].price}</span>
                                </li>

                                <li>
                                    <i className="fa-solid fa-building"></i>
                                    <span>{festData[id].store}</span>
                                </li>

                                <li>
                                    <i className="fa-solid fa-phone-volume"></i>
                                    <span>{festData[id].tel}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="review">
                    <MainReview
                        festData={festData}
                        festivalDataId={festData[id].id}
                        festivalTitle={festData[id].title}
                        loginInfo={props.loginInfo}
                        starMinF={props.starMinF}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListView;
