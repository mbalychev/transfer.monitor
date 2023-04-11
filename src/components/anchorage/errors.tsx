import { DatePicker, Divider, InputNumber, List, Pagination, Space, Spin, TimePicker } from "antd"
import { Col, Row } from "antd/es/grid";
import { useEffect, useRef, useState } from "react";
import { getErrors } from "../../api/anchorage";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { IAnchorageResponse } from "../../models/anchorage/AnchorageResponse";
import { dateConvert } from "../../models/dateConvert";
import { LoadingOutlined } from "@ant-design/icons";

dayjs.extend(customParseFormat)
interface Props {
    server: string;
}

export const AnchorageErrors = (props: Props) => {
    const [errorList, setErrorList] = useState<IAnchorageResponse>();
    const [pagetErorr, setPagetErorr] = useState<number>(1);
    const [updateErorrEvery, setUpdateErorrEvery] = useState(100000);
    const onPageErrors: number = 15;
    const refToSpinError = useRef<HTMLDivElement>(null!);
    const [serverIp, setServerIp] = useState<string>('');

    const loadErrors = async () => {
        refToSpinError.current.style.visibility = 'visible';
        const resp: IAnchorageResponse = await getErrors(serverIp, pagetErorr, onPageErrors);
        setErrorList(resp);
        refToSpinError.current.style.visibility = 'hidden';
    }

    const updateIntervalError = () => {
        const i = setTimeout(async () => {
            await loadErrors();
            updateIntervalError();
        }
            , updateErorrEvery);
    }

    useEffect(() => {
        setServerIp(props.server);
        loadErrors();
    }, [props])

    useEffect(() => {
        loadErrors();
        updateIntervalError();
    }, [updateErorrEvery])

    return (
        <div style={{ margin: '20px' }}>
            <Space>
                Update:
                <InputNumber
                    title="автобновление каждые (сек.)"
                    onChange={(val) => setUpdateErorrEvery(Number(val))}
                    defaultValue={updateErorrEvery} />
                sec.
            </Space>
            <div style={{ color: "white", backgroundColor: "red", borderRadius: '2px' }}>
                <Space>
                    errors
                    <div ref={refToSpinError} style={{ color: 'white', visibility: 'hidden' }}>
                        <LoadingOutlined style={{ color: '#ffffff' }} />
                    </div>
                </Space>
            </div>
            <List
                size='small'
                dataSource={errorList?.badResult}
                style={{ textAlign: "left" }}
                pagination={{
                    onChange: (page) => {
                        setPagetErorr(page);
                    },
                    defaultCurrent: errorList?.pageNumber,
                    total: errorList?.total,
                    pageSize: onPageErrors,
                }}
                renderItem={(item) => (
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
                } />
        </div>
    )
}