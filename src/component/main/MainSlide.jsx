import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const MainSlide = (props) => {
    let festivalData = props.festivalData;
    const [nowFestival, setNowFestival] = useState([]);

    useEffect(() => {
        setNowFestival(FindNowFestival());
    }, []);

    const FindNowFestival = () => {
        let tmpArr = [];
        let today = new Date();

        festivalData.map((el) => {
            let startDate = new Date(el.startDate),
                endDate = new Date(el.endDate);

            if (today > startDate && today < endDate) {
                tmpArr.push(el);
            }
        });

        return tmpArr;
    };

    return (
        <div id="main_slide">
            <h1 className="main_slide_title">오늘의 축제</h1>

            <Swiper
                navigation={true}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                loop={true}
                modules={[Navigation, Pagination]}
                className="mySwiper"
            >
                {nowFestival.map((el) => {
                    return (
                        <SwiperSlide className="slide_item">
                            <a href={"#" + el.id}>
                                <img src={el.img} alt={el.title} className="item_title" />
                                <div className="item_content">
                                    <div className="item_city">[{el.city}]</div>
                                    <div className="item_header">
                                        <span className="item_title">{el.title}</span>
                                        <span className="item_date">({el.date})</span>
                                    </div>
                                    <div className="item_explain">{el.explain}</div>
                                </div>
                            </a>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default MainSlide;
