import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AnchorageErrors } from './components/anchorage/errors';
import { AnchorageSuccess } from './components/anchorage/success';
import { Col, Row } from 'antd/es/grid';
import { Space } from 'antd';
import { LastUpdateUnchorage } from './components/anchorage/lastUpdate';
import { CommonErrors } from './components/anchorage/commonErrors';


function App() {
  return (
    <div className="App">
      <Row>
        <Col span={2}>
          <header>
            <Space>
              Monitor
              <img src={logo} alt="logo" style={{ height: '20px' }} />
            </Space>
          </header>
        </Col>
      </Row>
      <Row>
        <Col>
          <LastUpdateUnchorage />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <AnchorageErrors />
        </Col>
        <Col span={12}>
          <AnchorageSuccess />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <CommonErrors />
        </Col>
      </Row>
    </div>
  );
}

export default App;
