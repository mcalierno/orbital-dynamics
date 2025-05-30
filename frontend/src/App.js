import rocket from './rocket.png';
import './App.css';
import React, { useState, useEffect } from 'react';
import InputCollection from './components/VariablesForm.js';
import PlotDisplay from './components/PlotDisplay.js';

function App() {
    const [plot, setPlot] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={rocket} style={{padding: "50px"}} alt="logo" />
        <InputCollection setPlot={setPlot} />
        <PlotDisplay plot={plot}/>
      </header>
    </div>
  );
}

export default App;
