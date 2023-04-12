import { GatewayOutlined, PartitionOutlined, ProfileOutlined } from '@ant-design/icons';
import { Anchor, Button, Col, Menu, MenuProps, Row, Select, Space } from 'antd';
import React, { useState } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useNavigate,
} from 'react-router-dom';

import { Anchorage } from './pages/anchorage/anchorage'
import { Groups } from './pages/Groups/Groups';
import { Xml } from './pages/xml/xml';


export const Navigate = () => {
    const navigate = useNavigate();
    const [serverIp, setServerIp] = useState('192.168.1.97');
    const [current, setCurrent] = useState('anchorage');
    const onClick: MenuProps['onClick'] = (e) => {
        navigate(`/${e.key}`);
        setCurrent(e.key);
    };
    const items: MenuProps['items'] = [
        {
            label: 'anchorage',
            key: 'anchorage',
            icon: <GatewayOutlined />,
        },
        {
            label: 'groups',
            key: 'groups',
            icon: <PartitionOutlined />
        },
        {
            label: 'xml',
            key: 'xml',
            icon: <ProfileOutlined />
        }
    ]
    return (
        // <Router>
        <div>
            <header>
                <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            </header>
            <Routes>
                <Route path="/anchorage">
                    <Route index element={<Anchorage server={serverIp} />} />
                </Route>
                <Route path="/groups">
                    <Route index element={<Groups server={serverIp} />} />
                </Route>
                <Route path="/xml">
                    <Route index element={<Xml />} />
                </Route>
            </Routes>

        </div>
        // </Router>
    );
};