// Notification.js
import React from 'react';
import './Notification.css'; // Create this CSS file for styles

function Notification({ message, onClose }) {
    return (
        <div className="notification">
            <span>{message}</span>
            <button onClick={onClose}>Close</button>
        </div>
    );
}

export default Notification;
