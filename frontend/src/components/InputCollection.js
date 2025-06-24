import { useState } from 'react';
import InputRow from './InputRow';
import './InputCollection.css';

export default function InputCollection ({ rowValues, setRowValues, setPlot, setLoading, initialConditions, setResults })
{
    function addRow() 
    {
        setRowValues([...rowValues, {F_r: "", F_theta: "", t_thrust: ""}]);
    }

    function handleInputChange(rowNumber, field, value) 
    {
        // Remove leading '-' for length check, but keep it in value
        const isNegative = value.startsWith('-');
        const absValue = isNegative ? value.slice(1) : value;
        const trimmedAbs = absValue.slice(0, 4);
        const trimmedValue = isNegative ? '-' + trimmedAbs : trimmedAbs;
        const updatedValues = rowValues.map((row, i) => 
            i === rowNumber ? { ...row, [field]: trimmedValue } : row
        );
        setRowValues(updatedValues);
    }

    function handleSubmit(event) 
    {   
        event.preventDefault();
        setLoading(true);

        fetch("http://localhost:6950/run_server",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ initialConditions, rowValues })
        })
        .then((response) => response.json())
        .then((data) => {
            setLoading(false);
            if (setPlot && data.plot) setPlot(data.plot);
            if (setResults && data.results) setResults(data.results)
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
    }

    return (
        <div className="blur-container">
            <form onSubmit={handleSubmit}>
                {/* Column headers */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0.2em", fontWeight: "bold", color: "#4fc3f7", fontSize: "0.8em" }}>
                    <div style={{ marginRight: "0.2em" }}>F<sub>r</sub>(N)</div>
                    <div style={{ marginLeft: "0.5em", marginRight: "0.5em" }}>F<sub>&theta;</sub>(N)</div>
                    <div style={{ marginLeft: "0.5em", marginRight: "0.5em" }}>t(s)</div>
                </div>
                {rowValues.map((row, idx) => (
                    <div style={{ display: "flex", align: "center"}}>
                        <button
                            type="button"
                            onClick={() => {
                                const newRows = [...rowValues];
                                newRows.splice(idx + 1, 0, { ...row });
                                setRowValues(newRows);
                            }}
                            className="duplicate-row-btn"
                            title="Duplicate"
                            disabled={rowValues.length >= 5}
                        >
                            &#x2398;
                        </button>
                        {/* <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "0em", marginLeft: "0.5em", marginRight: "0.5em", fontWeight: "bold", color: "#4fc3f7", fontSize: "0.8em"}}>{idx+1}</div> */}
                        <div
                            key={idx}
                            className={`input-row-colored input-row-color-${(idx % 5) + 1}`}
                            style={{ display: "flex", alignItems: "center", margin: "0.2em" }}
                        >
                            <InputRow 
                                idx={idx}
                                form={row}
                                handleInputChange={handleInputChange}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setRowValues(rowValues.filter((_, i) => i !== idx))}
                            className="delete-row-btn"
                            title="Delete"
                            disabled={rowValues.length <= 1}
                        >
                            &#10006;
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addRow} disabled={rowValues.length >= 5} className="default-btn"> Add Row</button>
                <input type="submit" value="Submit All" className="default-btn"/>
            </form>
        </ div>
    );
}