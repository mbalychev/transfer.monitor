import { Col, Row, Select } from "antd"
import { GroupCommon } from "../../components/groups/groupCommon"
import { GroupSuccess } from "../../components/groups/groupSuccess"
import { useEffect, useState } from 'react';
interface Props {
    server: string;
}


export const Groups = (props: Props) => {
    const [serverIp, setServerIp] = useState('192.168.1.97');

    useEffect(() => {
        setServerIp(props.server);
    }, [props])

    return (
        <div>
            <Row>
                <Col span={12}>
                    <GroupCommon server={serverIp} />
                </Col>
                <Col span={12}>
                    <GroupSuccess server={serverIp} />
                </Col>
            </Row>
        </div>
    )
}