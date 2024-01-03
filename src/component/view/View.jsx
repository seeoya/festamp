import React, { useEffect, useState } from "react";
import './viewStyle.css';
import { useParams } from "react-router-dom";
import MainReview from "../review/MainReview";


const ListView = (festivalData, loginInfo) => {
    
    let calendar = <i class="fa-regular fa-calendar-days"></i>
    let place = <i class="fa-solid fa-compass"></i>
    let price = <i class="fa-solid fa-copyright"></i>
    let name = <i class="fa-solid fa-building"></i>
    let tel = <i class="fa-solid fa-phone-volume"></i>

    const [eventsArr, setEventsArr] = useState([]);

    useEffect(()=>{
        console.log('[ListView] useEffect!!');

        let datas = festivalData.festivalData[id].event;
        setEventsArr(datas.split('\n'));
       
        
    }, []);

    // useParams > path="/view/:id" id 값을 가져옴 url 파라미터
    let {id} = useParams()
    console.log(id)

    return (

        

        <div id="listview_wrap" className="sec">
            <div className="title">
                <p>{festivalData.festivalData[id].title}</p>
            </div>

            <div className="date">
                <h1>{festivalData.festivalData[id].date}</h1>    
            </div>
            <div className="flex_wrap">
                <div className="middle">
                    <div className="img">
                        <img src={`/${festivalData.festivalData[id].img}`}/>
                    </div>
                    {/* <div className="event">
                            <h1>{festivalData.festivalData[id].event}</h1>
                    </div> */}
                    <div className="explan">
                        <p>{festivalData.festivalData[id].explain}</p>
                    </div>
                </div>
                
                <div className="bottom">
                    <div className="event">
                        {
                                eventsArr.map((event, idx) => {
                                    return(
                                        <>
                                            <h1 className="event_list" key={idx}>{event}</h1>
                                        </>
                                    )
                                })
                        }
                    </div>
                    <div className="info">
                        <ul>
                            <li>{calendar} &nbsp;{festivalData.festivalData[id].date} </li>
                            <li>{place} &nbsp;{festivalData.festivalData[id].location} </li>
                            <li>{price} &nbsp;{festivalData.festivalData[id].price} </li>
                            <li>{name} &nbsp;{festivalData.festivalData[id].store} </li>
                            <li>{tel} &nbsp;{festivalData.festivalData[id].tel} </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="review">
                <>
                    <MainReview festivalDataId={festivalData.festivalData[id].id}
                                festivalTitle={festivalData.festivalData[id].title}
                                loginInfo={loginInfo}
                    />
                </>
            </div>
                
        </div>
    );
};

export default ListView;