import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AnchorageErrors } from './components/anchorage/errors';
import { AnchorageSuccess } from './components/anchorage/success';
import { Col, Row } from 'antd/es/grid';
import { Space } from 'antd';
import { LastUpdateUnchorage } from './components/anchorage/lastUpdate';
import { CommonErrors } from './components/anchorage/commonErrors';
import { Navigate } from './Navigate';


function App() {
  return (
    <div className="App">
      <Navigate />
    </div>
  );
}

export default App;
