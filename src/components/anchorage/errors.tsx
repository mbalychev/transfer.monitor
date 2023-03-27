import { DatePicker, Divider, List, Pagination, Space, TimePicker } from "antd"
import { Col, Row } from "antd/es/grid";
import { useEffect, useState } from "react";
import { getErrors } from "../../api/anchorage";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { IAnchorageResponse } from "../../models/anchorage/AnchorageResponse";

dayjs.extend(customParseFormat)

export const AnchorageErrors = () => {
    const [errorList, setErrorList] = useState<IAnchorageResponse>();
    const [pagetErorr, setPagetErorr] = useState<number>(1);
    const onPageErrors: number = 20;
    const loadErrors = async () => {
        const resp: IAnchorageResponse = await getErrors(pagetErorr, onPageErrors);
        setErrorList(resp);
    }

    useEffect(() =>{
        setTimeout(() => loadErrors(),3000);
    }) 
    return (
        <div style={{margin: '20px'}}>
        <Divider style={{color: "white", backgroundColor: "red", borderRadius: '2px'}}>Ошибки</Divider>
        <List
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
                    <b>
                        {item.model.inn}
                    </b>
                    </span>
                </Col>
                <Col span={4}>
                <span>
                        {item.code}
                </span>
                </Col>
                <Col span={10}>
                <span>
                    {item.response.message}
                </span>
                </Col>
                <Col span={6}>
                <span>{dayjs(item.date).toISOString()}</span>
                </Col>
            </Row>
        )
    }/>
            </div>
    )
}