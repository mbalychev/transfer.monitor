import { Divider, Input, InputNumber, List, Space, } from "antd"
import { Col, Row } from "antd/es/grid";
import { useEffect, useState, useRef } from 'react';
import { getSuccess } from '../../api/anchorage';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { SuccessAnchorage } from "../../models/anchorage/success";
import { IAnchorageResponse } from "../../models/anchorage/AnchorageResponse";
import { dateConvert } from "../../models/dateConvert";
import { LoadingOutlined } from "@ant-design/icons";

dayjs.extend(customParseFormat)

interface Props {
    server: string;
}


export const AnchorageSuccess = (props: Props) => {
    const [successList, setSuccessList] = useState<IAnchorageResponse>();
    const [pagetSuccess, setPageSuccess] = useState<number>(1);
    const [updateSuccessEvery, setUpdateSuccessEvery] = useState<number>(10000);
    const onPageSuccess = 15;
    const refToSpinSuccess = useRef<HTMLDivElement>(null!);
    const [interval, setInterval] = useState<Date>(new Date);

    const loadSuccess = async () => {
        refToSpinSuccess.current.style.visibility = 'visible';
        const resp: IAnchorageResponse = await getSuccess(serverIp, pagetSuccess, onPageSuccess);
        setSuccessList(resp);
        refToSpinSuccess.current.style.visibility = 'hidden';
    }
    const [serverIp, setServerIp] = useState<string>('');
    const anchorageTypeColor = (model: SuccessAnchorage): string => {
        if (model.model.tBrokerOrgDocs.tBOD_Type == 2)
            return '#f1dff1';
        else
            return 'white';
    }

    const updateSuccesInterval = () => {
        loadSuccess();
        setTimeout(async () => {
            setInterval(new Date) 
            updateSuccesInterval();
        }, updateSuccessEvery);
    }

    useEffect(() => {
        setServerIp(props.server);
        updateSuccesInterval();
    }, [props])

    useEffect(() => {
        loadSuccess();
    }, [interval])


    return (
        <div style={{ margin: '20px' }}>
            <Space>
                Update:
                <InputNumber
                    title="автобновление каждые (сек.)"
                    onChange={(val) => setUpdateSuccessEvery(Number(val))}
                    defaultValue={updateSuccessEvery} />
                sec.
            </Space>
            <div style={{ color: "white", backgroundColor: "green", borderRadius: '2px' }}>
                <Space>
                    success
                    <div ref={refToSpinSuccess} style={{ color: 'white', visibility: 'hidden' }}>
                        <LoadingOutlined style={{ color: '#ffffff' }} />
                    </div>
                </Space>
            </div>
            <List
                size='small'
                dataSource={successList?.successResult}
                style={{ textAlign: "left" }}
                pagination={{
                    onChange: (page) => {
                        setPageSuccess(page);
                    },
                    defaultCurrent: successList?.pageNumber,
                    total: successList?.total,
                    pageSize: onPageSuccess
                }}
                renderItem={(success) => (
                    <Row style={{ backgroundColor: anchorageTypeColor(success) }}>
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
                } />
        </div>
    )
}