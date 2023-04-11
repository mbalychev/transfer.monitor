import { Button, Col, Row, Select } from 'antd';
import { useState } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from 'react-router-dom';

import { Anchorage } from './pages/anchorage/anchorage'
import { Groups } from './pages/Groups/Groups';

export const Router = () => {
    const [serverIp, setServerIp] = useState('192.168.1.97');
    // const navigate = useNavigate();
    // const toGroups = () => {
    //     navigate('/groups');
    // }
    return (
        <div>
            <Row style={{ margin: '20px 0' }}>
                <Col span={2}>
                    {/* <Button onClick={toGroups}>groups</Button> */}
                </Col>
                <Col span={2}>
                    <Select
                        style={{ width: '200px' }}
                        value={serverIp}
                        onSelect={(val) => setServerIp(val)}
                        options={[
                            { value: '192.168.1.97', label: 'dev' },
                            { value: '192.168.1.98', label: 'test' },
                            { value: '192.168.1.90', label: 'prod' }
                        ]}>
                    </Select>
                </Col>
            </Row>
            <BrowserRouter>
                <Routes>
                    <Route path="/anchorage">
                        <Route index element={<Anchorage server={serverIp} />} />
                    </Route>
                    <Route path="/groups">
                        <Route index element={<Groups server={serverIp} />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};