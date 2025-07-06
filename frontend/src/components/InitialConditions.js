import React, { useState, useEffect } from "react";
import "./InitialConditions.css";

export default function InitialConditions({ initialConditions, setInitialConditions }) {
    const [verticalInput, setVerticalInput] = useState(initialConditions.dist_vertical.toString());
    const [horizontalInput, setHorizontalInput] = useState(initialConditions.dist_horizontal.toString());
    const [editing, setEditing] = useState({ x: false, y: false });

    useEffect(() => {
        setVerticalInput(initialConditions.dist_vertical.toString());
    }, [initialConditions.dist_vertical]);
    useEffect(() => {
        setHorizontalInput(initialConditions.dist_horizontal.toString());
    }, [initialConditions.dist_horizontal]);

    // Allow up to 4 digits with optional minus
    function filterInput(value) {
        const isNegative = value.startsWith('-');
        const absValue = isNegative ? value.slice(1) : value;
        const trimmedAbs = absValue.slice(0, 4);
        const trimmedValue = isNegative ? '-' + trimmedAbs : trimmedAbs;
        return trimmedValue
    }

    return (
        <div className="initial-conditions-container">
            <h2 className="control-section-title">Starting Position</h2>
            <div className="dist-values-row">
                <span className="dist-label">
                    X:{" "}
                    {editing.x ? (
                        <>
                            <input
                                type="text"
                                value={horizontalInput}
                                autoFocus
                                onBlur={() => setEditing(e => ({ ...e, x: false }))}
                                onChange={e => {
                                    const filtered = filterInput(e.target.value);
                                    setHorizontalInput(filtered);
                                    setInitialConditions({
                                        ...initialConditions,
                                        dist_horizontal: filtered
                                    });
                                }}
                                className="dist-value-input"
                                style={{ width: "3em", fontSize: "1em", textAlign: "center" }}
                            />
                            <span style={{ color: "#4fc3f7" }}> m</span>
                        </>
                    ) : (
                        <>
                            <span
                                className="dist-value"
                                tabIndex={0}
                                style={{ cursor: "pointer" }}
                                onClick={() => setEditing(e => ({ ...e, x: true }))}
                                onFocus={() => setEditing(e => ({ ...e, x: true }))}
                            >
                                {initialConditions.dist_horizontal}
                            </span>
                            <span style={{ color: "#4fc3f7" }}> m</span>
                        </>
                    )}
                </span>
                <span className="dist-label">
                    Y:{" "}
                    {editing.y ? (
                        <>
                            <input
                                type="text"
                                value={verticalInput}
                                autoFocus
                                onBlur={() => setEditing(e => ({ ...e, y: false }))}
                                onChange={e => {
                                    const filtered = filterInput(e.target.value);
                                    setVerticalInput(filtered);
                                    setInitialConditions({
                                        ...initialConditions,
                                        dist_vertical: filtered
                                    });
                                }}
                                className="dist-value-input"
                                style={{ width: "3em", fontSize: "1em", textAlign: "center" }}
                            />
                            <span style={{ color: "#4fc3f7" }}> m</span>
                        </>
                    ) : (
                        <>
                            <span
                                className="dist-value"
                                tabIndex={0}
                                style={{ cursor: "pointer" }}
                                onClick={() => setEditing(e => ({ ...e, y: true }))}
                                onFocus={() => setEditing(e => ({ ...e, y: true }))}
                            >
                                {initialConditions.dist_vertical}
                            </span>
                            <span style={{ color: "#4fc3f7" }}> m</span>
                        </>
                    )}
                </span>
            </div>
        </div>
    );
}