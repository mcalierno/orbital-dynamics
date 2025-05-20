import { useState } from 'react';

export default function InputCollection (){
    const [F_r, setF_r] = useState("");
    const [F_theta, setF_theta] = useState("");
    const [t_thrust, sett_thrust] = useState("");


    function handleSubmit(event) {
        event.preventDefault();
        
        const params = 
        {
            F_r: F_r,
            F_theta: F_theta,
            t_thrust: t_thrust
        };
        fetch("http://localhost:6950/run_server",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(params)
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
                <label for="F_r">F_r:</label>
                <input type="text" id="F_r" placeholder="F_r" value={F_r} onChange={(event) => setF_r(event.target.value)}/>
                <label for="F_theta">F_theta:</label>
                <input type="text" id="F_theta" placeholder="F_theta" value={F_theta} onChange={(event) => setF_theta(event.target.value)}/>
                <label for="t_thrust">t_thrust:</label>
                <input type="text" id="t_thrust" placeholder="t_thrust" value={t_thrust} onChange={(event) => sett_thrust(event.target.value)}/>
                <input type="submit" value="Submit" />
            </form>
        </>
    );
}