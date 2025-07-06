import React, { useState } from "react";
import "./AboutPage.css";
// import aboutGif from "./about.gif";

export default function AboutPage() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="about-dropdown-container"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="about-label">About</div>
            <div className={`about-dropdown ${hovered ? "show" : ""}`}>
                <div className="about-content">
                    <p>
                        This project simulates orbital dynamics and rocket maneuvers. 
                        Enter your initial conditions and thrust values to see how the rocket's trajectory changes!
                    </p>
                    {/* <img src={aboutGif} alt="About Orbital Dynamics" className="about-gif" /> */}
                </div>
            </div>
        </div>
    );
}