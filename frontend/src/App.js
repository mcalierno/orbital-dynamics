import rocket from './rocket.png';
import logo from './logo.png';
import earth from './earth.png';
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
            <div className="App-body">
                <img src={logo} height={100}/>
                {(!plot && !loading) && (
                    <img src={rocket} style={{padding: "50px"}} alt="logo" height={500}/>
                )}
                <LoadingVideo loading={loading} rowValues={rowValues}/>
                {!loading && <PlotDisplay plot={plot}/>}
                <div className="image-crop-container">
                    <img src={earth} className="spinning-earth"/>
                </div>
                <InputCollection setPlot={setPlot} setLoading={setLoading} rowValues={rowValues} setRowValues={setRowValues}/>
                <a href="/OrbitalDynamicsEssay.pdf" target="_blank" rel="noopener noreferrer" className="pdf-link">
                    OrbitalDynamicsEssay.pdf
                </a>
            </div>
        </div>
    );
}

export default App;
