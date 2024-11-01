import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/Context';
import "./main.css";

function Main() {
    const [showProfile, setShowProfile] = useState(false);
    const [showApps, setShowApps] = useState(false);
    const [showAIProducts, setShowAIProducts] = useState(false);
    const [showAtherInfo, setShowAtherInfo] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [prompt, setPrompt] = useState("");
    const [notification, setNotification] = useState('');
    const [user, setuser] = useState([]);

    const handlePrompt = async (e) => {
        e.preventDefault();
        try {
            const responseOfPrompt = await fetch("http://localhost:4000/userprompt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // Include session cookies
                body: JSON.stringify({ prompt }),
            });
            
            if (responseOfPrompt.ok) {
                setNotification("Data sent, please wait...");
                setPrompt(""); // Clear the input after sending
                onSent(); // Call onSent after the prompt is successfully sent
            } else {
                setNotification("Prompt not sent... try again...");
            }
        } catch (err) {
            setNotification("Error occurred: " + err.message);
        }
    };
    


    useEffect(() => {
        const handelaccessuser = async () => {
            const response = await fetch("http://localhost:4000/gemeni/Authenticateduser", {
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                setuser(data);
            }
        }
        handelaccessuser();
    }, [])
    // toogle for profile...
    const toggleProfile = () => {
        setShowProfile(!showProfile);
    };
    // ṭoogle for apps...
    const toggleApps = () => {
        setShowApps(!showApps);
        setShowProfile(false);  // Close profile dropdown if apps is clicked
    };
    // toogle for versions...
    const toggleAIProducts = () => {
        setShowAIProducts(!showAIProducts);
    };
    // toogle for ather 2.0...
    const toggleAtherInfo = () => {
        setShowAtherInfo(!showAtherInfo);
    };

    // user context from context page...
    const { onSent, recentprompt, showresult, loading, setinput, input, resultdata } = useContext(Context);

    // Function to handle image click
    const handleImageClick = (image) => {
        setSelectedImage(image);
        setShowImageModal(true);
    };

    // function to galleryclick
    const galleryclick = () => {
        setNotification("We will added this functionality soon...");
    }
    const cameraclick = () => {
        setNotification("We will added this functionality soon...")
    }

    // Function to close the modal
    const closeModal = () => {
        setShowImageModal(false);
    };

    // Effect to handle notification timeout
    useEffect(() => {
        if (notification) {
            const timeoutId = setTimeout(() => {
                setNotification(''); // Clear notification after 5 seconds
            }, 1000); // Change the time (5000ms = 5 seconds) as needed

            return () => clearTimeout(timeoutId); // Cleanup timeout on unmount
        }
    }, [notification]); // Effect runs whenever notification changes

    return (
        <div className='main'>
            <div className="nav">
                <div className="ai" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <p>AetherAI</p>
                    <i
                        className="fas fa-robot"
                        style={{ fontSize: '24px', cursor: 'pointer', marginLeft: '10px' }}
                        onClick={toggleAIProducts}
                    ></i>

                    {/* AI Products Dropdown */}
                    {showAIProducts && (
                        <div className="ai-dropdown">
                            <div style={{ padding: '5px' }}>
                                <div className="current">
                                    <span>Ather</span>
                                    <p>Current version</p>
                                </div>
                                <div className="current">
                                    <span>Ather 2.0</span>
                                    <p>New version is coming soon...</p>
                                    <button onClick={toggleAtherInfo} style={{ marginLeft: '10px', cursor: 'pointer' }} id='btn'>
                                        {showAtherInfo ? 'Hide Info' : 'Show Info'}
                                    </button>
                                </div>

                                {/* Ather 2.0 Info Dropdown */}
                                {showAtherInfo && (
                                    <div className="ather-info-dropdown">
                                        <p><strong style={{ color: "black" }}>About Ather 2.0:</strong></p>
                                        <p>Ather 2.0 is set to revolutionize the AI experience with enhanced features and capabilities. Release expected soon!</p>
                                        <p><strong>Release Information:</strong></p>
                                        <p>The official release is scheduled for the next quarter. Stay tuned for updates!</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                {/* app grid icon */}
                <div className="icons" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    {/* App grid icon */}
                    <i
                        className="fas fa-th"
                        style={{ fontSize: '24px', cursor: 'pointer', marginRight: '15px' }}
                        onClick={toggleApps}  // Call the toggleApps function on click
                    ></i>
                    <img
                        src="https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=Ql6UUNosrWAY0w&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-icons-logos-emojis-users-2400.png&ehk=8agkVrs8bo9zafVF9Qk4%2bFqv5IwaEZrb8DwX%2ftfJtNc%3d&risl=&pid=ImgRaw&r=0"
                        alt="User Icon"
                        onClick={toggleProfile}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                {/* Profile Dropdown */}
                {showProfile && (
                    <div className="profile-dropdown">
                        <img
                            src="https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=Ql6UUNosrWAY0w&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-icons-logos-emojis-users-2400.png&ehk=8agkVrs8bo9zafVF9Qk4%2bFqv5IwaEZrb8DwX%2ftfJtNc%3d&risl=&pid=ImgRaw&r=0"
                            alt="User Profile"
                            className="profile-img"
                        />
                        <div className="profile-info">
                            {user ? (
                                <>
                                    <p><strong>Name: </strong>{user.name}</p>
                                    <p><strong>Email: </strong>{user.email}</p>
                                </>
                            ) : (
                                <p>Loading user data...</p>
                            )}
                            <button><a href="/login" style={{ textDecoration: "none", color: "white" }}>Logout</a></button>
                        </div>
                    </div>
                )}

                {/* Apps Dropdown */}
                {showApps && (
                    <div className="apps-dropdown">
                        <h4 style={{ margin: '0 0 10px 0', textAlign: 'center' }}>Some Aether products/apps</h4>
                        <div>
                            <a href="https://drive.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fas fa-cloud" style={{ color: '#4285F4', marginRight: '8px' }}></i>
                                <span>Google Drive</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://gmail.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fas fa-envelope" style={{ color: '#EA4335', marginRight: '8px' }}></i>
                                <span>Gmail</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://calendar.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fas fa-calendar-alt" style={{ color: '#FBBC05', marginRight: '8px' }}></i>
                                <span>Google Calendar</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://photos.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fas fa-images" style={{ color: '#34A853', marginRight: '8px' }}></i>
                                <span>Google Photos</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://youtube.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fab fa-youtube" style={{ color: '#FF0000', marginRight: '8px' }}></i>
                                <span>YouTube</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://maps.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fas fa-map-marked-alt" style={{ color: '#4285F4', marginRight: '8px' }}></i>
                                <span>Google Maps</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://meet.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fas fa-video" style={{ color: '#34A853', marginRight: '8px' }}></i>
                                <span>Google Meet</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://play.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fas fa-play-circle" style={{ color: '#4285F4', marginRight: '8px' }}></i>
                                <span>Google Play</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://workspace.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fas fa-briefcase" style={{ color: '#EA4335', marginRight: '8px' }}></i>
                                <span>Google Workspace</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://www.google.com/chrome" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fab fa-chrome" style={{ color: '#4285F4', marginRight: '8px' }}></i>
                                <span>Google Chrome</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://docs.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fab fa-docs" style={{ color: '#DB4437', marginRight: '8px' }}></i>
                                <span>Google Docs</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://slides.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fab fa-slideshare" style={{ color: '#0F9D58', marginRight: '8px' }}></i>
                                <span>Google Slides</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://tasks.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fas fa-tasks" style={{ color: '#FBBC05', marginRight: '8px' }}></i>
                                <span>Google Tasks</span>
                            </a>
                        </div>
                        <div>
                            <a href="https://contacts.google.com" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <i className="fas fa-user-friends" style={{ color: '#4285F4', marginRight: '8px' }}></i>
                                <span>Google Contacts</span>
                            </a>
                        </div>
                    </div>



                )}
            </div>

            <div className="main-container">
                {!showresult ? (
                    <>
                        <div className="greet">
                            <p style={{ fontSize: "45px" }}><span>Hello, My name is AetherAI</span></p>
                            <p style={{ fontSize: "45px" }}>A Newly Generated AI Tool</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Discover stunning beaches with golden sands and crystal-clear waters.</p>
                                <img src="https://th.bing.com/th/id/OIP.j3-PUqOVIlWhsQ-4yuh3BAHaHa?rs=1&pid=ImgDetMain" alt="" />
                            </div>
                            <div className="card">
                                <p>Explore picturesque mountains and enjoy breathtaking views from the top.</p>
                                <img src="https://static.vecteezy.com/system/resources/previews/000/554/841/original/lightbulb-vector-icon.jpg" alt="" />
                            </div>
                            <div className="card">
                                <p>Visit charming villages filled with history and local culture.</p>
                                <img src="https://th.bing.com/th/id/OIP.ZKz0Cs5Ffb9K70a43DzQigHaHa?rs=1&pid=ImgDetMain" alt="" />
                            </div>
                            <div className="card">
                                <p>Uncover hidden gems like beautiful waterfalls and serene lakes.</p>
                                <img src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-and-lines-1/2/10-1024.png" alt="" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img
                                src="https://th.bing.com/th/id/R.6b0022312d41080436c52da571d5c697?rik=Ql6UUNosrWAY0w&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpng-user-icon-icons-logos-emojis-users-2400.png&ehk=8agkVrs8bo9zafVF9Qk4%2bFqv5IwaEZrb8DwX%2ftfJtNc%3d&risl=&pid=ImgRaw&r=0"
                                alt=""
                            />
                            <p>{recentprompt}</p>
                        </div>
                        <div className="result-data">
                            <img
                                src="https://static.timesofisrael.com/www/uploads/2019/12/iStock-1029035836-e1575983057612.jpg"
                                alt=""
                                onClick={() => handleImageClick("https://static.timesofisrael.com/www/uploads/2019/12/iStock-1029035836-e1575983057612.jpg")}
                                style={{ cursor: 'pointer' }}
                            />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>
                            )}
                        </div>
                    </div>
                )}
                <div className="main-button">
                    <div className="searchbox">
                        <input
                            onChange={(e) => {
                                setinput(e.target.value);
                                setPrompt(e.target.value);
                            }}
                            value={input}
                            type="text"
                            placeholder="Enter the prompt here..."
                            onKeyPress={(e) => {
                                if (e.key === 'Enter' && input) {
                                    handlePrompt(e);
                                }
                            }}
                        />
                        <div>
                            <i className="fas fa-images" aria-hidden="true" title="Gallery" style={{ fontSize: '24px', marginRight: '10px', cursor: 'pointer' }} onClick={galleryclick}></i>
                            <i className="fas fa-camera" aria-hidden="true" title="Camera" style={{ fontSize: '24px', marginRight: '10px', cursor: 'pointer' }} onClick={cameraclick}></i>
                            {input ? (
                                <i
                                    className="fas fa-paper-plane"
                                    onClick={handlePrompt}
                                    aria-hidden="true"
                                    title="Send"
                                    style={{ fontSize: '24px', cursor: 'pointer' }}
                                ></i>
                            ) : null}
                        </div>
                    </div>
                    <div className='button-info'>
                        <p>Hi, my name is Om Prakash. I have created a Personal AI for user benefits. Let's try it...</p>
                    </div>
                </div>
            </div>

            {/* Notification Display */}
            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}

            {/* Image Modal */}
            {showImageModal && (
                <div className="image-modal" onClick={closeModal}>
                    <img src={selectedImage} alt="Selected" className="modal-image" />
                </div>
            )}
        </div>
    );
}

export default Main;
