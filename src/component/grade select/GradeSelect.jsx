import React, { useState } from "react";
import "./gradeSelect.css";

const GradeSelect = () => {

    // hook
    const [star, setStar] = useState('');

    // function
    let blankStar = <i className="fa-regular fa-star"></i>
    let fullStar = <i className="fa-solid fa-star"></i>
    let halfStar = <i className="fa-solid fa-star-half-stroke"></i>

    const showOptionList = () => {
        console.log('showOptionList() CALLED');
    }
    return (
        <div className="select_box">
            <input type="button" className="label" onClick={showOptionList} value="별점"/>
            <ul className="option_list">
                <li className="option_item" value={0}>{blankStar}{blankStar}{blankStar}{blankStar}{blankStar}</li>
                <li className="option_item" value={0.5}>{halfStar}{blankStar}{blankStar}{blankStar}{blankStar}</li>
                <li className="option_item" value={1}>{fullStar}{blankStar}{blankStar}{blankStar}{blankStar}</li>
                <li className="option_item" value={1.5}>{fullStar}{halfStar}{blankStar}{blankStar}{blankStar}</li>
                <li className="option_item" value={2}>{fullStar}{fullStar}{blankStar}{blankStar}{blankStar}</li>
                <li className="option_item" value={2.5}>{fullStar}{fullStar}{halfStar}{blankStar}{blankStar}</li>
                <li className="option_item" value={3}>{fullStar}{fullStar}{fullStar}{blankStar}{blankStar}</li>
                <li className="option_item" value={3.5}>{fullStar}{fullStar}{fullStar}{halfStar}{blankStar}</li>
                <li className="option_item" value={4}>{fullStar}{fullStar}{fullStar}{fullStar}{blankStar}</li>
                <li className="option_item" value={4.5}>{fullStar}{fullStar}{fullStar}{fullStar}{halfStar}</li>
                <li className="option_item" value={5}>{fullStar}{fullStar}{fullStar}{fullStar}{fullStar}</li>
            </ul>
        </div>
    );
}

export default GradeSelect;