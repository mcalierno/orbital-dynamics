import { useState } from 'react';
import InputRow from './InputRow';
import './VariablesForm.css';

export default function InputCollection ({ setPlot })
{
    const [rowValues, setRowValues] = useState([
        {F_r: "", F_theta: "", t_thrust: ""}
    ]);

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
            console.log(data.results);
            if (setPlot && data.plot) setPlot(data.plot);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {rowValues.map((row, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", margin: "0.2em"}}>
                        <InputRow 
                            idx={idx}
                            form={row}
                            handleInputChange={handleInputChange}
                        />
                        {rowValues.length > 1 && (
                            <button
                                type="button"
                                onClick={() => setRowValues(rowValues.filter((_, i) => i !== idx))}
                                className="delete-row-btn"
                            >
                                &#10006;
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addRow} disabled={rowValues.length >= 5}> Add Another Row</button>
                <input type="submit" value="Submit All" />
            </form>
        </>
    );
}