import { DatePicker, Divider, List, Pagination, Space, Spin, TimePicker } from "antd"
import { Col, Row } from "antd/es/grid";
import { useEffect, useState } from "react";
import { getCommonError, getErrors, getSuccess } from '../../api/anchorage';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { SuccessAnchorage } from "../../models/anchorage/success";
import { IAnchorageResponse } from "../../models/anchorage/AnchorageResponse";
import { ICommonError } from "../../models/anchorage/commonError";

dayjs.extend(customParseFormat)

export const CommonErrors = () => {
    const [commonErrorsList, setCommonErrorsList] = useState<IAnchorageResponse>();
    const [pageCommonErorr, setPageCommonErorr] = useState<number>(1);
    const [pageCommonErorrLoading, setPageCommonErorrLoading] = useState<boolean>();
    const onPageCommonErrors = 10;
    const loadCommonErrors = async () => {
        setPageCommonErorrLoading(true);
        const resp: IAnchorageResponse = await getCommonError(pageCommonErorr, onPageCommonErrors);
        setCommonErrorsList(resp);
        setPageCommonErorrLoading(false);
    }
    const load = () =>{
        if(pageCommonErorrLoading) 
        return (
            <div style={{ width: '10px'}}>
                <Spin style={{marginLeft: '10px', color: 'white', width: '10px', height: '5px'}}/>
            </div>
        ) 
        else 
        return (<div style={{ width: '10px'}}></div>)
    }
    useEffect(() =>{
      const int = setTimeout(() => loadCommonErrors(),5000);
    }) 

    const colorCommonError = (commonError: ICommonError): string => {
        switch (commonError.description) {
            case 'обход закончен':
                return "#a9ff38"
            case 'обход начат':
                return "#b8fff9"
        
                default:
                return "white";
        }
    }
    return (
        <div style={{margin: '20px'}}>
            <div style={{color: "white", backgroundColor: "#e65000", borderRadius: '2px'}}>
               <Space>
                    Common errors 
               </Space>
            </div>
        <List
        dataSource={commonErrorsList?.commonErrors}
        style={{textAlign: "left"}}
        pagination={{
        onChange: (page) => {
        setPageCommonErorr(page);
        },
        defaultCurrent: commonErrorsList?.pageNumber,
        total: commonErrorsList?.total,
        pageSize: onPageCommonErrors,
        }}
        renderItem = {(commonError) => (
            <Row>
                <Col span={18}>
                    <span style={{backgroundColor: colorCommonError(commonError)}}>
                        {commonError.description}
                    </span>
                </Col>
                <Col span={6}>
                    <span>
                        {dayjs(commonError.date).toISOString()}
                    </span>
                </Col>
            </Row>
        )
    }/>
        
        </div>
    )
}