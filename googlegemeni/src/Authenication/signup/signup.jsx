import { motion } from 'framer-motion'; // Import motion from framer-motion
import { gsap } from 'gsap';
import React, { useEffect, useRef, useState } from 'react';
import Login from '../login/login';
import './signup.css';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(null);
    const [notification, setNotification] = useState({ message: "", type: "" });

    const cardRef = useRef(null);
    const notificationRef = useRef(null); // Reference for notification

    // Function to handle navigation
    const handleNavigate = (parameter) => {
        setNavigate(parameter);
    }

    // Function to show notification bar with GSAP animation
    const showNotification = (message, type) => {
        setNotification({ message, type });

        // GSAP animation for notification
        gsap.fromTo(notificationRef.current, 
            { opacity: 0, y: -20 }, // Start with opacity 0 and a slight upward position
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" } // Animate to full opacity
        );
    };

    // Function to handle OK click on notification
    const handleOkClick = () => {
        if (notification.type === "success") {
            handleNavigate("login"); // Navigate to login if success
        }
        setNotification({ message: "", type: "" }); // Clear notification
    };

    // Form submission handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/gemeni/user", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (response.ok) {
                showNotification("Signup successful! Click OK to proceed to login.", "success");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                showNotification("Signup failed. Please try again.", "error");
                setName("");
                setEmail("");
                setPassword("");
            }
        } catch (err) {
            console.log(err);
            showNotification("Error occurred during signup. Please check your network and try again.", "error");
        }
    }

    useEffect(() => {
        const cardElement = cardRef.current;

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
    }, []); // Pass an empty dependency array to run once on mount

    // Particle generation function
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

    // Render based on navigation state
    if (navigate === "login") {
        return <Login />
    }

    return (
        <div className="parent">
            {/* Background gradient */}
            <div className="background"></div>

            {/* Generate particles */}
            {generateParticles()}

            <motion.div 
                ref={cardRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="formcard"
            >
                {notification.message && (
                    <div className={`notification ${notification.type}`} ref={notificationRef}>
                        {notification.message}
                        <button onClick={handleOkClick} className="ok-button">OK</button>
                    </div>
                )}

                <h1 id='heading'>Sign Up for AetherAI</h1>
                <form onSubmit={handleSubmit} id='form'>
                    <div>
                        <input
                            className='inputs'
                            type="text"
                            name="name"
                            placeholder="Enter name..."
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                    <button type="submit">Sign Up</button>
                    <p id='paragraph'>Already have an account? <span style={{ textDecoration: "underline", cursor: "pointer" }} onClick={() => { handleNavigate("login") }}>Login</span></p>
                </form>
            </motion.div>
        </div>
    );
}

export default Signup;
