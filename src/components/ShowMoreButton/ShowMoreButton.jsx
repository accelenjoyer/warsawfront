import React from 'react';
import "./ShowMoreButton.scss"
const ShowMoreButton = ({visibleCount, setVisibleCount,style}) => {
    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + visibleCount);
    };
    return (
        <button className="show-more-button" onClick={handleShowMore} style={style}>Ещё
        </button>
    );
};

export default ShowMoreButton;