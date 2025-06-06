import { useState } from 'react';
import InputRow from './InputRow';
import './InputCollection.css';

export default function InputCollection ({ rowValues, setRowValues, setPlot, setLoading })
{
    function addRow() 
    {
        setRowValues([...rowValues, {F_r: "", F_theta: "", t_thrust: ""}]);
    }

    function handleInputChange(rowNumber, field, value) 
    {
        const updatedValues = rowValues.map((row, i) => 
            i === rowNumber ? { ...row, [field]: value } : row
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
            body: JSON.stringify({ rowValues })
        })
        .then((response) => response.json())
        .then((data) => {
            setLoading(false);
            if (setPlot && data.plot) setPlot(data.plot);
        })
        .catch((error) => {
            setLoading(false);
            console.log(error);
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <button type="button" onClick={addRow} disabled={rowValues.length >= 5} className="default-btn"> Add Row</button>
                <input type="submit" value="Submit All" className="default-btn"/>
                {rowValues.map((row, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", margin: "0.2em"}}>
                        <InputRow 
                            idx={idx}
                            form={row}
                            handleInputChange={handleInputChange}
                        />
                        <button
                            type="button"
                            onClick={() => setRowValues(rowValues.filter((_, i) => i !== idx))}
                            className="delete-row-btn"
                            title="Delete"
                            disabled={rowValues.length <= 1}
                        >
                            &#10006;
                        </button>
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
                    </div>
                ))}
            </form>
        </>
    );
}