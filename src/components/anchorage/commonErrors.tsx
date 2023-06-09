import { List, Space } from "antd"
import { Col, Row } from "antd/es/grid";
import { useEffect, useState, useRef } from 'react';
import { getCommonError } from '../../api/anchorage';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { IAnchorageResponse } from "../../models/anchorage/AnchorageResponse";
import { ICommonError } from "../../models/anchorage/commonError";
import { dateConvert } from "../../models/dateConvert";
import { LoadingOutlined } from "@ant-design/icons";

dayjs.extend(customParseFormat)
interface Props {
    server: string;
}


export const CommonErrors = (props: Props) => {
    const [commonErrorsList, setCommonErrorsList] = useState<IAnchorageResponse>();
    const [pageCommonErorr, setPageCommonErorr] = useState<number>(1);
    const onPageCommonErrors = 10;
    const refToCommonErorr = useRef<HTMLDivElement>(null!);
    const [serverIp, setServerIp] = useState<string>('');

    const loadCommonErrors = async () => {
        refToCommonErorr.current.style.visibility = 'visible';
        const resp: IAnchorageResponse = await getCommonError(serverIp, pageCommonErorr, onPageCommonErrors);
        setCommonErrorsList(resp);
        refToCommonErorr.current.style.visibility = 'hidden';
    }

    const updateIntervalCommonError = () => {
        setTimeout(async () => {
            await loadCommonErrors();
            updateIntervalCommonError();
        }, 1000);

    }
    useEffect(() => {
        setServerIp(props.server);
        loadCommonErrors();
    }, [props])

    useEffect(() => {
        loadCommonErrors();
        updateIntervalCommonError();
    }, [])

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
        <div style={{ margin: '20px' }}>
            <div style={{ color: "white", backgroundColor: "#e65000", borderRadius: '2px' }}>
                <Space>
                    Common errors
                    <div ref={refToCommonErorr} style={{ color: 'white', visibility: 'hidden' }}>
                        <LoadingOutlined style={{ color: '#ffffff' }} />
                    </div>
                </Space>
            </div>
            <List
                size='small'
                dataSource={commonErrorsList?.commonErrors}
                style={{ textAlign: "left" }}
                pagination={{
                    onChange: (page) => {
                        setPageCommonErorr(page);
                    },
                    defaultCurrent: commonErrorsList?.pageNumber,
                    total: commonErrorsList?.total,
                    pageSize: onPageCommonErrors,
                }}
                renderItem={(commonError) => (
                    <Row>
                        <Col span={18}>
                            <span style={{ backgroundColor: colorCommonError(commonError) }}>
                                {commonError.description}
                            </span>
                        </Col>
                        <Col span={6}>
                            <span>
                                {dateConvert(commonError.date)}
                            </span>
                        </Col>
                    </Row>
                )
                } />

        </div>
    )
}