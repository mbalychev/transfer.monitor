import { DatePicker, Divider, List, Pagination, Space, Spin, TimePicker } from "antd"
import { Col, Row } from "antd/es/grid";
import { useEffect, useRef, useState } from "react";
import { getErrors } from "../../api/anchorage";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { IAnchorageResponse } from "../../models/anchorage/AnchorageResponse";
import { dateConvert } from "../../models/dateConvert";
import { LoadingOutlined } from "@ant-design/icons";

dayjs.extend(customParseFormat)

export const AnchorageErrors = () => {
    const [errorList, setErrorList] = useState<IAnchorageResponse>();
    const [pagetErorr, setPagetErorr] = useState<number>(1);
    const onPageErrors: number = 15;
    const refToSpinError = useRef<HTMLDivElement>(null!);
    const loadErrors = async () => {
        refToSpinError.current.style.visibility = 'visible';
        const resp: IAnchorageResponse = await getErrors(pagetErorr, onPageErrors);
        setErrorList(resp);
        refToSpinError.current.style.visibility = 'hidden';
    }

    const updateIntervalError = () =>{
        const i = setTimeout(async () => {
            await loadErrors();
            updateIntervalError();
        }
        ,10000);
    } 

    useEffect(() =>{
        updateIntervalError();
    },[]) 

    return (
        <div style={{margin: '20px'}}>
        <Divider style={{color: "white", backgroundColor: "red", borderRadius: '2px'}}>
            <Space>
                errors
                <div ref={refToSpinError} style={{color: 'white', visibility: 'hidden'}}>
                    <LoadingOutlined style={{color: '#ffffff'}}/>
                </div>
            </Space>
        </Divider>
        <List
        size='small'
        dataSource={errorList?.badResult}
        style={{textAlign: "left"}}
        pagination={{
        onChange: (page) => {
        setPagetErorr(page);
        },
        defaultCurrent: errorList?.pageNumber,
        total: errorList?.total,
        pageSize: onPageErrors,
        }}
        renderItem = {(item) => (
            <Row>
                <Col span={4}>
                    <span>
                        ИНН: {item.model.inn}
                    </span>
                </Col>
                <Col span={3}>
                <span>
                        {item.code}
                </span>
                </Col>
                <Col span={11}>
                <span>
                    {item.response.message}
                </span>
                </Col>
                <Col span={6}>
                <span>{dateConvert(item.date)}</span>
                </Col>
            </Row>
        )
    }/>
            </div>
    )
}