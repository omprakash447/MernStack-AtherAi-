import React, { useEffect, useState } from 'react';
import "./sidebar.css";

function Sidebar() {
    const [extended, setExtended] = useState(false);
    const [store, setStore] = useState([]);

    // Access / save the userprompt here...
    useEffect(() => {
        const handleAccessPrompt = async () => {
            try {
                const fetchingResponse = await fetch("http://localhost:4000/userprompt/input", {
                    method: "GET",
                    credentials: "include", // This ensures cookies are sent with the request
                });
                if (!fetchingResponse.ok) {
                    throw new Error("Unauthorized access or network error");
                }
                const data = await fetchingResponse.json();
                setStore(data);
            } catch (err) {
                alert(err.message);
            }
        };
        handleAccessPrompt();
    }, []);
    

    // Notification functions
    const handleHelpClick = () => {
        alert("Help notification: How can we assist you?");
    };

    const handleActivityClick = () => {
        alert("Activity notification: Here are your recent activities.");
    };

    const handleSettingsClick = () => {
        alert("Settings notification: Update your preferences here.");
    };

    return (
        <div className='sidebar'>
            <div className="top">
                <i 
                    className="fas fa-bars menu" 
                    onClick={() => setExtended(prev => !prev)} 
                    title="Menu"
                    style={{ cursor: 'pointer' }} 
                ></i>
                <div className="new-chatt">
                    <i className="fas fa-plus" title="New Chat" style={{ cursor: 'pointer', marginRight: '8px' }}></i>
                    {extended ? <p>New chat</p> : null}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {store.map((item) => (
                            <div key={item._id} className="recent-entry">  
                                <i className="fas fa-comment" title="Message" style={{ marginRight: '8px' }}></i>
                                <p>{item.prompt}</p>  
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="button-item recent-entry" onClick={handleHelpClick}>
                    <i className="fas fa-question-circle" title="Help" style={{ marginRight: '8px' }}></i>
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="button-item recent-entry" onClick={handleActivityClick}>
                    <i className="fas fa-history" title="Activity" style={{ marginRight: '8px' }}></i>
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="button-item recent-entry" onClick={handleSettingsClick}>
                    <i className="fas fa-cog" title="Settings" style={{ marginRight: '8px' }}></i>
                    {extended ? <p>Settings</p> : null}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
