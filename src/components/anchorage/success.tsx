import { DatePicker, Divider, List, Pagination, Space, TimePicker } from "antd"
import { Col, Row } from "antd/es/grid";
import { useEffect, useState } from "react";
import { getErrors, getSuccess } from '../../api/anchorage';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { SuccessAnchorage } from "../../models/anchorage/success";
import { IAnchorageResponse } from "../../models/anchorage/AnchorageResponse";

dayjs.extend(customParseFormat)

export const AnchorageSuccess = () => {
    const [successList, setSuccessList] = useState<IAnchorageResponse>();
    const [pagetSuccess, setPageSuccess] = useState<number>(1);
    const onPageSuccess = 20;
    const loadSuccess = async () => {
        const resp: IAnchorageResponse = await getSuccess(pagetSuccess, onPageSuccess);
        setSuccessList(resp);
    }
    const anchorageTypeColor = (model: SuccessAnchorage): string => {
        if(model.model.tBrokerOrgDocs.tBOD_Type == 2)
            return '#f1dff1';   
        else
        return 'white';
    }
    useEffect(() =>{
      const int = setTimeout(() => loadSuccess(),3000);
    }) 
    return (
        <div style={{margin: '20px'}}>
            <Divider style={{color: "white", backgroundColor: "green", borderRadius: '2px'}}>Успешно</Divider>
        <List
        dataSource={successList?.successResult}
        style={{textAlign: "left"}}
        pagination={{
        onChange: (page) => {
        setPageSuccess(page);
        },
        defaultCurrent: successList?.pageNumber,
        total: successList?.total,
        pageSize: onPageSuccess
    }}
        renderItem = {(success) => (
            <Row style={{backgroundColor: anchorageTypeColor(success)}}>
                <Col span={4}>
                    <span>
                    <b>
                        {success.model.inn}
                    </b>
                    </span>
                </Col>
                <Col span={6}>
                <span>{dayjs(success.date).toISOString()}</span>
                </Col>
                <Col span={4}>
                </Col>
                <Col span={4}>
                </Col>
            </Row>
        )
    }/>
    </div>
    )
}