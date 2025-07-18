import React from "react";
import "./LoadingSpinner.scss"; // Стили для спиннера

const LoadingSpinner = () => {
    return (
        <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
            <p className="spinner-text"> Загрузка</p>
        </div>
    );
};

export default LoadingSpinner;