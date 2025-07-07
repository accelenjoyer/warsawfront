"use client"
import React, {useEffect} from 'react';

const ViewTracker = ({articleId}) => {
    useEffect(() => {
        fetch(`http://localhost:5000/api/news/${articleId}`, {
            method: "POST",
        });
    }, [articleId]);
    return (
        <>
        </>
    );
};

export default ViewTracker;