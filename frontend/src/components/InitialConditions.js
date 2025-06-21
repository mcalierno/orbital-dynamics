import React, { useState, useEffect } from "react";
import "./InitialConditions.css";

export default function InitialConditions({ initialConditions, setInitialConditions }) {
    const [verticalInput, setVerticalInput] = useState(initialConditions.dist_vertical.toString());
    const [horizontalInput, setHorizontalInput] = useState(initialConditions.dist_horizontal.toString());

    useEffect(() => {
        setVerticalInput(initialConditions.dist_vertical.toString());
    }, [initialConditions.dist_vertical]);
    useEffect(() => {
        setHorizontalInput(initialConditions.dist_horizontal.toString());
    }, [initialConditions.dist_horizontal]);

    return (
        <div className="initial-conditions-container">
            <div className="slider-hover-area">
                <h2 className="control-section-title">Starting position</h2>
                <div className="dist-values-row">
                    <span className="dist-label">X: <span className="dist-value">{initialConditions.dist_horizontal} m</span></span>
                    <span className="dist-label">Y: <span className="dist-value">{initialConditions.dist_vertical} m</span></span>
                </div>
                <div className="sliders-dropdown">
                    <label className="slider-label">
                        <span className="slider-title">X</span>
                        <div className="slider-controls">
                            <div className="slider-range">
                                <input
                                    type="range"
                                    min={-2000}
                                    max={2000}
                                    step={1}
                                    value={initialConditions.dist_horizontal}
                                    onChange={e => {
                                        setInitialConditions({
                                            ...initialConditions,
                                            dist_horizontal: Number(e.target.value)
                                        });
                                        setHorizontalInput(e.target.value);
                                    }}
                                    className="slider"
                                />
                                <div className="range-labels">
                                    <span>-2000</span>
                                    <span>2000</span>
                                </div>
                            </div>
                            <input
                                type="number"
                                min={-2000}
                                max={2000}
                                step={1}
                                value={horizontalInput}
                                onChange={e => {
                                    const val = e.target.value;
                                    setHorizontalInput(val);
                                    if (val === "" || val === "-") return;
                                    if (/^-?\d+$/.test(val)) {
                                        let num = Number(val);
                                        if (num < -2000) num = -2000;
                                        if (num > 2000) num = 2000;
                                        setInitialConditions({
                                            ...initialConditions,
                                            dist_horizontal: num
                                        });
                                        setHorizontalInput(num.toString());
                                    }
                                }}
                                className="slider-value-input"
                                style={{ width: "4em", fontSize: "0.8em", marginTop: "0.2em", textAlign: "center" }}
                            />
                        </div>
                    </label>
                    <label className="slider-label">
                        <span className="slider-title">Y</span>
                        <div className="slider-controls">
                            <div className="slider-range">
                                <input
                                    type="range"
                                    min={-2000}
                                    max={2000}
                                    step={1}
                                    value={initialConditions.dist_vertical}
                                    onChange={e => {
                                        setInitialConditions({
                                            ...initialConditions,
                                            dist_vertical: Number(e.target.value)
                                        });
                                        setVerticalInput(e.target.value);
                                    }}
                                    className="slider"
                                />
                                <div className="range-labels">
                                    <span>-2000</span>
                                    <span>2000</span>
                                </div>
                            </div>
                            <input
                                type="number"
                                min={-2000}
                                max={2000}
                                step={1}
                                value={verticalInput}
                                onChange={e => {
                                    const val = e.target.value;
                                    setVerticalInput(val);
                                    if (val === "" || val === "-") return;
                                    if (/^-?\d+$/.test(val)) {
                                        let num = Number(val);
                                        if (num < -2000) num = -2000;
                                        if (num > 2000) num = 2000;
                                        setInitialConditions({
                                            ...initialConditions,
                                            dist_vertical: num
                                        });
                                        setVerticalInput(num.toString());
                                    }
                                }}
                                className="slider-value-input"
                                style={{ width: "4em", fontSize: "0.8em", marginTop: "0.2em", textAlign: "center" }}
                            />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}