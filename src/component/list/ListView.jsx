import React from "react";
import './listStyle.css';
import { useParams } from "react-router-dom";



const ListView = (festivalData) => {
    
    let calendar = <i class="fa-regular fa-calendar-days"></i>
    let place = <i class="fa-solid fa-compass"></i>
    let price = <i class="fa-solid fa-copyright"></i>
    let name = <i class="fa-solid fa-building"></i>
    let tel = <i class="fa-solid fa-phone-volume"></i>


    // useParams > path="/view/:id" id 값을 가져옴 url 파라미터
    let {id} = useParams()
    console.log(id)

    return (

        

        <div id="listview_wrap">
            <div className="title">
                <h1>{festivalData.festivalData[id].title}</h1>
            </div>

            <div className="date">
                <h1>{festivalData.festivalData[id].date}</h1>
            </div>

            <div className="img">
                <img src={`/${festivalData.festivalData[id].img}`}/>
            </div>
            <div className="explan">
                <h1>{festivalData.festivalData[id].explain}</h1>
            </div>
            <div className="middle">
                <div className="event">
                    <h1>{festivalData.festivalData[id].event}</h1>
                </div>

                <div className="total">
                    <ul>
                        <li>{calendar} &nbsp;{festivalData.festivalData[id].date} </li>
                        <li>{place} &nbsp;{festivalData.festivalData[id].location} </li>
                        <li>{price} &nbsp;{festivalData.festivalData[id].price} </li>
                        <li>{name} &nbsp;{festivalData.festivalData[id].store} </li>
                        <li>{tel} &nbsp;{festivalData.festivalData[id].tel} : </li>
                    </ul>
                </div>
            </div>
            <div className="review">
                <input type="text" placeholder="리뷰를 입력해 주세요." name="user_eview" />
                <input type="button" value="리뷰 작성" name="review_btn" />
            </div>
        </div>
    );
};

export default ListView;