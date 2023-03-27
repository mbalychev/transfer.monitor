import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AnchorageErrors } from './components/anchorage/errors';
import { AnchorageSuccess } from './components/anchorage/success';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <AnchorageErrors/>
        <AnchorageSuccess/>
      </header>
    </div>
  );
}

export default App;
