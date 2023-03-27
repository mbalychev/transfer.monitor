import { DatePicker, Divider, List, Space, TimePicker } from "antd"
import { Col, Row } from "antd/es/grid";
import { useEffect, useState } from "react";
import { getErrors, getSuccess } from '../../api/anchorage';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { SuccessAnchorage } from "../../models/anchorage/success";

dayjs.extend(customParseFormat)

export const AnchorageSuccess = () => {
    const [successList, setSuccessList] = useState<SuccessAnchorage[]>([]);

    const loadSuccess = async () => {
        const resp: SuccessAnchorage[] = await getSuccess();
        setSuccessList(resp);
    }

    useEffect(() =>{
       loadSuccess();
    }, []) 
    return (
        <div>
            <Divider style={{color: "white", backgroundColor: "green", borderRadius: '2px'}}>Успешно</Divider>
        <List
        dataSource={successList}
        renderItem = {(success) => (
            <Row>
                <Col span={4}>
                    <span>
                    <b>
                        {success.model.inn}
                    </b>
                    </span>
                </Col>
                <Col span={4}>
                </Col>
                <Col span={12}>
                </Col>
                <Col span={4}>
                <span>{dayjs(success.date).toISOString()}</span>
                </Col>
            </Row>
        )
    }>
        </List>
        </div>
    )
}