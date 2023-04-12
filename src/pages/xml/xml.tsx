import { Col, List, Row } from 'antd';
import { useState, useEffect } from 'react';
import { getXmlErrors } from "../../api/xml";
import { XmlErrors } from '../../components/xml/xmlErrors';
import { IErrorsResults } from "../../models/xml/errorsResults";

export const Xml = () => {

    return (
        <div>
            <h2>
                xml
            </h2>
            <Row >
                <Col span={12}>
                    <XmlErrors></XmlErrors>
                </Col>
            </Row>
        </div>
    )
}