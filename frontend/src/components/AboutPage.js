
import React, { useState } from "react";
import "./AboutPage.css";
import aboutVid from "./aboutGif.mp4";
import orbitalEssay from "./OrbitalDynamicsEssay.pdf";

export default function AboutPage() {
    const [open, setOpen] = useState(false);

    return (
        <div className="about-dropdown-container">
            <div className="about-label" onClick={() => setOpen(true)}>About</div>
            {open && (
                <div className="about-modal-overlay">
                    <div className="about-modal">
                        <button className="about-modal-close" onClick={() => setOpen(false)}>&times;</button>
                        <div className="about-content">
                            <p>
                                The goal is to fire your spacecraft's thrusters to intercept a target in orbit using the least amount of fuel possible.<br /><br />
                                
                                Adjust your starting position relative to the target and enter your thrust values in the horizontal direction (F<sub>&theta;</sub>),
                                vertical direction (F<sub>r</sub>), and the duration for which you fire your thrusters (t).<br /><br />

                                The time and distance of your closest approach (t<sub>min</sub>, d<sub>min</sub>) will be calculated for you, along with the total 
                                fuel used in KG.<br /><br />

                                It is not as simple as firing directly at the target! Due to the nature of orbital dynamics, as your velocity in orbit increases, by
                                definition your altitude also increases, so you end up behind/above the target, as demonstrated below:<br /><br />
                            </p>
                            <video src={aboutVid} autoPlay loop muted alt="About Orbital Dynamics" className="about-mp4" />
                            <p>
                                For a more in depth analysis and derivation of the equations used, please see the full essay:
                            </p>
                            <a
                                href={orbitalEssay}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="about-pdf-link"
                            >
                                Orbital Dynamics Essay (PDF)
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}