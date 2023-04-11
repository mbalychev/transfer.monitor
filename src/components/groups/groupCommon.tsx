import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Col, List, Row, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { getGroupsCommonRequest } from "../../api/groupsApi";
import { dateConvert } from "../../models/dateConvert";
import { CommonGroupError, ICommonGroupResponse } from "../../models/groups/common";

interface Props {
    server: string;
}

export const GroupCommon = (props: Props) => {
    const [commonErrorsList, setCommonErrorsList] = useState<ICommonGroupResponse>();
    const [pageCommonErorr, setPageCommonErorr] = useState<number>(1);
    const refToCommonErorr = useRef<HTMLDivElement>(null!);
    const [serverIp, setServerIp] = useState<string>('');

    const onPageCommonErrors = 10;

    const loadCommonErrors = async () => {
        refToCommonErorr.current.style.visibility = 'visible';
        const resp: ICommonGroupResponse = await getGroupsCommonRequest(serverIp, pageCommonErorr, onPageCommonErrors);
        setCommonErrorsList(resp);
        refToCommonErorr.current.style.visibility = 'hidden';
    }

    useEffect(() => {
        setServerIp(props.server);
        loadCommonErrors();
    }, [props])

    // const updateIntervalCommonError = () => {
    //     setTimeout(async () => {
    //         await loadCommonErrors();
    //         updateIntervalCommonError();
    //     }, 10000);



    // useEffect(() => {
    //     loadCommonErrors();
    //     updateIntervalCommonError();
    // }, [])

    const colorCommonError = (commonError: CommonGroupError): string => {
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
            <div style={{ color: "white", backgroundColor: "#e65000", borderRadius: '2px', padding: '3px' }}>
                <Space>
                    Common errors
                    ({serverIp})
                    <div ref={refToCommonErorr} style={{ color: 'white', visibility: 'hidden' }}>
                        <LoadingOutlined style={{ color: '#ffffff' }} />
                    </div>
                    <Button
                        onClick={loadCommonErrors}
                        style={{ backgroundColor: "#ff9861", height: '25px' }}>
                        <RedoOutlined style={{ color: "#fad9c6", height: '10px' }} />
                    </Button>
                </Space>
            </div>
            <List
                size='small'
                dataSource={commonErrorsList?.models}
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