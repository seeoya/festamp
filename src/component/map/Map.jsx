import React, { useEffect, useState } from "react";
const { kakao } = window;

const Map = (props) => {
    let festivalData = props.festivalData;

    const [mapObj, setMapObj] = useState("");
    const [isMap, setIsMap] = useState(false);
    const [mapAddress, setMapAddress] = useState("경기도 수원시 영통구 도청로 30 (이의동)");
    const [mapAddressTitle, setMapAddressTitle] = useState("경기도청");

    useEffect(() => {
        setMap();

        if (props.nowAddress != null) {
            setMapAddress(props.nowAddress);
            setMapAddressTitle(props.nowAddressTitle);
        }
        // setMapAddress("경기도 포천시 포화로 236-11  포천 백운계곡");
        // setMapAddressTitle("포천");
        addAddressMarker(mapAddress, mapAddressTitle);
    }, []);

    useEffect(() => {
        addAddressMarker(mapAddress, mapAddressTitle);
    }, [mapAddress, mapAddressTitle, isMap]);

    const setMap = () => {
        let container = document.getElementById("map");
        let options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3,
        };

        setMapObj(new kakao.maps.Map(container, options));
        setIsMap(true);

        addAddressMarker(mapAddress, mapAddressTitle);
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
                    width: "400px",
                    height: "500px",
                }}
            ></div>

            <button type="button" onClick={() => setMapAddress(festivalData[11].location)}>
                aaa
            </button>
            <button type="button" onClick={() => setMapAddress(festivalData[13].location)}>
                aaa
            </button>
            <button type="button" onClick={() => setMapAddress(festivalData[16].location)}>
                aaa
            </button>
        </>
    );
};

export default Map;
