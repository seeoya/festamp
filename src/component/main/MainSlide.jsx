import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const MainSlide = (props) => {
    let festivalData = props.festivalData;

    let fesList = [
        {
            title: "aaa",
            src: "imgs/dummy/img1.jpg",
        },
        {
            title: "bbb",
            src: "imgs/dummy/img2.jpg",
        },
        {
            title: "ccc",
            src: "imgs/dummy/img3.jpg",
        },
        {
            title: "ddd",
            src: "imgs/dummy/img4.jpg",
        },
    ];

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
                {fesList.map((el) => {
                    return (
                        <SwiperSlide className="slide_item">
                            {/* <span className="title">{el.title}</span> */}
                            <img src={el.src} alt="" />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default MainSlide;
