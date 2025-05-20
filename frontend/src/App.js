import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import InputCollection from './components/VariablesForm.js';

function App() {

    const [data, setData] = useState([{}]);

    useEffect(() => {
        fetch("/run")
        .then(
            (res) => res.json()
        ).then(
            (data) => {
                setData(data);
            }
        )
    }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <InputCollection />
        <p>
          {JSON.stringify(data)}
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
