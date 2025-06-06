import rocket from './rocket.png';
import './App.css';
import React, { useState, useEffect } from 'react';
import InputCollection from './components/InputCollection.js';
import PlotDisplay from './components/PlotDisplay.js';
import LoadingVideo from './components/LoadingVideo.js';

function App() {
    const [plot, setPlot] = useState(null);
    const [loading, setLoading] = useState(false);
    const [rowValues, setRowValues] = useState([
        {F_r: "", F_theta: "", t_thrust: ""}
    ]);

    return (
        <div className="App">
            <header className="App-header">
                {(!plot && !loading) && (
                    <img src={rocket} style={{padding: "50px"}} alt="logo" />
                )}
                <LoadingVideo loading={loading} rowValues={rowValues}/>
                {!loading && <PlotDisplay plot={plot}/>}
                <InputCollection setPlot={setPlot} setLoading={setLoading} rowValues={rowValues} setRowValues={setRowValues}/>
                <a href="/OrbitalDynamicsEssay.pdf" target="_blank" rel="noopener noreferrer">
                    OrbitalDynamicsEssay.pdf
                </a>
            </header>
        </div>
    );
}

export default App;
