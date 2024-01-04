import React from 'react';
import Popular from './Popular';

const PopularPage = (props) => {
    return (
        <div id="main_popular" className="sec">
            <Popular festivalData={props.festivalData} />
        </div>
    );
};

export default PopularPage;