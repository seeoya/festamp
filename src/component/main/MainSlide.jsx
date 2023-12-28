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
        let today = new Date().toLocaleDateString();

        festivalData.map((el) => {
            let startDate = new Date(el.startDate).toLocaleDateString(),
                endDate = new Date(el.endDate).toLocaleDateString();

            if (today > startDate && today < endDate) {
                tmpArr.push(el);
            }
        });

        return tmpArr;
    };

    return (
        <div className="main_slide">
            <h2>오늘의 축제</h2>

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
                            {/* <span className="title">{el.title}</span> */}
                            <img src={el.img} alt="" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default MainSlide;
