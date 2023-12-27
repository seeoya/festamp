import React, { useEffect } from "react";
const { kakao } = window;

const Map = () => {
    useEffect(() => {
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };

        let map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    }, []);

    return (
        <div>
            <div
                id="map"
                style={{
                    width: "400px",
                    height: "500px",
                }}
            ></div>
        </div>
    );
};

export default Map;
