import { DatePicker, Divider, List, Space, TimePicker } from "antd"
import { Col, Row } from "antd/es/grid";
import { useEffect, useState } from "react";
import { getErrors } from "../../api/anchorage";
import { IAnchorageResponse } from "../../models/anchorage/error";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat)

export const AnchorageErrors = () => {
    const [errorList, setErrorList] = useState<IAnchorageResponse>();
    const [pagetErorr, setPagetErorr] = useState<number>(1);
    const onPageErrors = 10;
    const loadErrors = async () => {
        const resp: IAnchorageResponse = await getErrors(pagetErorr, onPageErrors);
        setErrorList(resp);
    }

    useEffect(() =>{
       loadErrors();
    }, [,pagetErorr]) 
    return (
        <div>
        <Divider style={{color: "white", backgroundColor: "red", borderRadius: '2px'}}>Ошибки</Divider>
        <List
        dataSource={errorList?.badResult}
        style={{textAlign: "left"}}
        pagination={{
        onChange: (page) => {
        setPagetErorr(page);
        },
        defaultCurrent: errorList?.pageNumber,
        total: errorList?.totalPages,
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
                <Col span={12}>
                <span>
                    {item.response.message}
                </span>
                </Col>
                <Col span={4}>
                <span>{dayjs(item.date).toISOString()}</span>
                </Col>
            </Row>
        )
    }>
        </List>
            </div>
    )
}