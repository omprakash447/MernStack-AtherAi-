import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import App from "../../App";
import Signup from "../signup/signup";
import './login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(null);
    const [notification, setNotification] = useState({ message: "", type: "", redirect: "" }); 

    const cardRef = useRef(null); 
    const particlesContainerRef = useRef(null); // Reference for particles container

    const handleNavigate = (parameter) => {
        setNavigate(parameter);
    };

    const showNotification = (message, type, redirect = "") => {
        setNotification({ message, type, redirect });
    };

    const handleOkClick = () => {
        if (notification.redirect) {
            handleNavigate(notification.redirect);
        }
        setNotification({ message: "", type: "", redirect: "" }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/login/user", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                showNotification("Login successful! Click OK to proceed.", "success", "homepage");
                setEmail(""); 
                setPassword(""); 
            } else {
                showNotification("Invalid credentials. Please try again.", "error");
            }
        } catch (err) {
            showNotification("Error occurred during login. Please try again.", "error");
        }
    };

    const generateParticles = () => {
        const numParticles = 100; // Adjust the number of particles
        const particles = [];

        for (let i = 0; i < numParticles; i++) {
            particles.push(
                <div 
                    key={i}
                    className="particle"
                    style={{
                        left: `${Math.random() * 100}vw`,
                        top: `${Math.random() * 100}vh`,
                        animationDuration: `${Math.random() * 2 + 2}s`, // Random duration
                        opacity: Math.random() * 0.5 + 0.5 // Random opacity
                    }}
                />
            );
        }
        return particles;
    };

    useEffect(() => {
        const cardElement = cardRef.current;
    
        // Check if cardElement exists before adding event listeners
        if (cardElement) {
            const handleMouseEnter = () => {
                gsap.to(cardElement, {
                    scale: 1.05,
                });
            };
    
            const handleMouseLeave = () => {
                gsap.to(cardElement, {
                    scale: 1,
                    rotateY: 0,
                    rotateX: 0,
                    background: 'linear-gradient(16deg, #4b90ff, #ff5546)',
                });
            };
    
            const handleMouseMove = (e) => {
                const rect = cardElement.getBoundingClientRect();
                const mouseX = e.clientX - rect.left;
                const mouseY = e.clientY - rect.top;
                const xPercent = (mouseX / rect.width) - 0.5;
                const yPercent = (mouseY / rect.height) - 0.5;
    
                gsap.to(cardElement, {
                    rotateY: xPercent * 30,
                    rotateX: -yPercent * 30,
                    background: `linear-gradient(16deg, rgba(75, 144, 255, ${1 - Math.abs(xPercent)}), rgba(255, 85, 70, ${1 - Math.abs(yPercent)}) )`
                });
            };
    
            // Attach event listeners
            cardElement.addEventListener('mouseenter', handleMouseEnter);
            cardElement.addEventListener('mouseleave', handleMouseLeave);
            cardElement.addEventListener('mousemove', handleMouseMove);
    
            // Cleanup function to remove event listeners
            return () => {
                cardElement.removeEventListener('mouseenter', handleMouseEnter);
                cardElement.removeEventListener('mouseleave', handleMouseLeave);
                cardElement.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []); // Empty dependency array ensures this runs only once on mount
    
    if (navigate === "homepage") {
        return <App />;
    }
    if (navigate === "Signup") {
        return <Signup />;
    }

    return (
        <div className="parent">
            {/* Background particles */}
            <div className="particles-container" ref={particlesContainerRef}>
                {generateParticles()}
            </div>
            <motion.div 
                ref={cardRef}
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }} 
                transition={{ duration: 0.5 }} 
                className="formcard"
            >
                {notification.message && (
                    <div className={`notification ${notification.type}`} style={{ width: '100%', textAlign: 'center' }}>
                        {notification.message}
                        <button onClick={handleOkClick} className="ok-button">OK</button>
                    </div>
                )}
                
                <h1 id='heading'>Login to AetherAI</h1>
                <form onSubmit={handleSubmit} id='form'>
                    <div>
                        <input
                            className='inputs'
                            type="email"
                            name="email"
                            placeholder="Enter email..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            className='inputs'
                            type="password"
                            name="password"
                            placeholder="Enter password..."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    <p id='paragraph'>
                        Don't have an account? 
                        <span 
                            style={{ textDecoration: "underline", cursor: "pointer" }} 
                            onClick={() => { handleNavigate("Signup") }}
                        >
                            Signup
                        </span>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}

export default Login;
