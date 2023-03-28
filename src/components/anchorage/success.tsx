import { DatePicker, Divider, List, Pagination, Space, Spin, TimePicker } from "antd"
import { Col, Row } from "antd/es/grid";
import { useEffect, useState, useRef } from 'react';
import { getErrors, getSuccess } from '../../api/anchorage';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { SuccessAnchorage } from "../../models/anchorage/success";
import { IAnchorageResponse } from "../../models/anchorage/AnchorageResponse";
import { dateConvert } from "../../models/dateConvert";
import { LoadingOutlined } from "@ant-design/icons";

dayjs.extend(customParseFormat)

export const AnchorageSuccess = () => {
    const [successList, setSuccessList] = useState<IAnchorageResponse>();
    const [pagetSuccess, setPageSuccess] = useState<number>(1);
    const onPageSuccess = 15;
    const refToSpinSuccess = useRef<HTMLDivElement>(null!);

    const loadSuccess = async () => {
        refToSpinSuccess.current.style.visibility = 'visible';
        const resp: IAnchorageResponse = await getSuccess(pagetSuccess, onPageSuccess);
        setSuccessList(resp);
        refToSpinSuccess.current.style.visibility = 'hidden';
    }
    const anchorageTypeColor = (model: SuccessAnchorage): string => {
        if(model.model.tBrokerOrgDocs.tBOD_Type == 2)
            return '#f1dff1';   
        else
        return 'white';
    }
    
    const updateSuccesInterval = () => {
        setTimeout(async () => {
            await loadSuccess();
            updateSuccesInterval();
        },10000);
    }

    useEffect(() =>{
        updateSuccesInterval();
    },[]) 
    
    return (
        <div style={{margin: '20px'}}>
            <Divider style={{color: "white", backgroundColor: "green", borderRadius: '2px'}}>
                <Space>
                success
                <div ref={refToSpinSuccess} style={{color: 'white', visibility: 'hidden'}}>
                    <LoadingOutlined style={{color: '#ffffff'}}/>
                </div>
            </Space>
            </Divider>
        <List 
        size='small'
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
                       ИНН: {success.model.inn}
                    </span>
                </Col>
                <Col span={12}>
                    {success.name ? success.name : '-'}
                </Col>
                <Col span={6}>
                <span>{dateConvert(success.date)}</span>
                </Col>
            </Row>
        )
    }/>
    </div>
    )
}