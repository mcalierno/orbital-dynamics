import React from "react";
import "./InitialConditions.css";

export default function InitialConditions({ initialConditions, setInitialConditions }) {
    return (
        <div className="initial-conditions-container">
            <h2 className="control-section-title">Starting position relative to target (m)</h2>
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
                            onChange={e =>
                                setInitialConditions({
                                    ...initialConditions,
                                    dist_vertical: Number(e.target.value)
                                })
                            }
                            className="slider"
                        />
                        <div className="range-labels">
                            <span>-2000</span>
                            <span>2000</span>
                        </div>
                    </div>
                    <span className="slider-value">{initialConditions.dist_vertical} m</span>
                </div>
            </label>
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
                            onChange={e =>
                                setInitialConditions({
                                    ...initialConditions,
                                    dist_horizontal: Number(e.target.value)
                                })
                            }
                            className="slider"
                        />
                        <div className="range-labels">
                            <span>-2000</span>
                            <span>2000</span>
                        </div>
                    </div>
                    <span className="slider-value">{initialConditions.dist_horizontal} m</span>
                </div>
            </label>
        </div>
    );
}