import React from "react";
import './listStyle.css';

const ListView = (festivalData) => {
    
    let calendar = <i class="fa-regular fa-calendar-days"></i>
    let place = <i class="fa-solid fa-compass"></i>
    let price = <i class="fa-solid fa-copyright"></i>
    let name = <i class="fa-solid fa-building"></i>
    let tel = <i class="fa-solid fa-phone-volume"></i>

    return (

        

        <div id="listview_wrap">
            <div className="title">
                <h1>{festivalData.festivalData[1].title}</h1>
            </div>

            <div className="date">
                <h1>{festivalData.festivalData[1].date}</h1>
            </div>

            <div className="img">
                <img src={`/${festivalData.festivalData[0].img}`}/>
            </div>
            <div className="explan">
                <h1>{festivalData.festivalData[1].explain}</h1>
            </div>
            <div className="middle">
                <div className="event">
                    <h1>{festivalData.festivalData[1].event}</h1>
                </div>

                <div className="total">
                    <ul>
                        <li>{calendar} &nbsp;{festivalData.festivalData[1].date} </li>
                        <li>{place} &nbsp;{festivalData.festivalData[1].location} </li>
                        <li>{price} &nbsp;{festivalData.festivalData[1].price} </li>
                        <li>{name} &nbsp;{festivalData.festivalData[1].store} </li>
                        <li>{tel} &nbsp;{festivalData.festivalData[1].tel} : </li>
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