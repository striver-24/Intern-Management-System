import React from 'react';
import './Loading.css'; // Import the CSS for styling

const Loading = ({ message = "Loading..." }) => {
    return (
        <div className="loading-container" role="status" aria-live="polite">
            <div className="dots-container">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
            <p className="loading-message">{message}</p>
        </div>
    );
};

export default Loading;