import { useState } from 'react';
import InputRow from './InputRow';

export default function InputCollection ()
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
        .then((newValues) => {
            console.log(newValues);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {rowValues.map((row, idx) => (
                    <div key={idx} style={{ marginBottom: "1em", border: "1px solid #ccc", padding: "1em" }}>
                        <InputRow idx={idx} form={row} handleInputChange={handleInputChange} onClickDelete={() => setRowValues(rowValues.filter((_, i) => i !== idx))}/>
                        {rowValues.length > 1 && (
                            <button
                                type="button"
                                onClick={() => setRowValues(rowValues.filter((_, i) => i !== idx))}
                                style={{
                                    marginLeft: "1em",
                                    background: "none",
                                    border: "none",
                                    color: "red",
                                    fontSize: "1.5em",
                                    cursor: rowValues.length > 1 ? "pointer" : "not-allowed",
                                    lineHeight: "1"
                                }}
                                disabled={rowValues.length === 1}
                                aria-label={`Delete row ${idx + 1}`}
                                title="Delete row"
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