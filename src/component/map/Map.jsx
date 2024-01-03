import React, { useEffect, useState } from "react";
const { kakao } = window;

const Map = (props) => {
    let festivalData = props.festivalData,
        width = props.width ?? "400px",
        height = props.height ?? "300px";

    const [mapObj, setMapObj] = useState("");
    const [isMap, setIsMap] = useState(false);

    let nowAddress = props.nowAddress,
        nowAddressTitle = props.nowAddressTitle;

    useEffect(() => {
        let map = setMap();

        if (nowAddress == null || nowAddress == "") {
            props.setNowAddress("경기도 수원시 영통구 도청로 30 (이의동)");
            props.setNowAddressTitle("경기도청");
        }

        addAddressMarker(nowAddress, nowAddressTitle);
    }, []);

    useEffect(() => {
        addAddressMarker(nowAddress, nowAddressTitle);
    }, [nowAddress, nowAddressTitle, isMap]);

    const setMap = () => {
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };

        let map = new kakao.maps.Map(container, options);
        setMapObj(map);
        setIsMap(true);
        addAddressMarker(nowAddress, nowAddressTitle);
        return map;
    };

    const addAddressMarker = (address, addressTitle) => {
        if (isMap) {
            var geocoder = new kakao.maps.services.Geocoder();

            geocoder.addressSearch(address, function (result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                    var marker = new kakao.maps.Marker({
                        map: mapObj,
                        position: coords,
                    });

                    var infowindow = new kakao.maps.InfoWindow({
                        content: `<div style="width:150px;text-align:center;padding:6px 0;">${addressTitle}</div>`,
                    });
                    infowindow.open(mapObj, marker);

                    mapObj.setCenter(coords);
                }
            });
        }
    };

    return (
        <>
            <div
                id="map"
                style={{
                    width: width,
                    height: height,
                }}
            ></div>
        </>
    );
};

export default Map;
