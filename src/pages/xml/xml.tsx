import { Col, List, Row } from 'antd';
import { XmlErrors } from '../../components/xml/xmlErrors';

export const Xml = () => {

    return (
        <div>
            <h2>
                xml
            </h2>
            <Row >
                <Col span={12}>
                    <XmlErrors />
                </Col>
            </Row>
        </div>
    )
}