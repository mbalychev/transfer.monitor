import { LoadingOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Col, List, Row, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { getGroupSuccesResponse } from "../../api/groupsApi";
import { dateConvert } from "../../models/dateConvert";
import { CommonGroupError, ICommonGroupResponse } from "../../models/groups/common";
import { ISuccessGroupResponse } from "../../models/groups/success";

interface Props {
    server: string;
}

export const GroupSuccess = (props: Props) => {
    const [commonSuccessGroup, setSuccessGroup] = useState<ISuccessGroupResponse>();
    const [pageCommonErorr, setPageCommonErorr] = useState<number>(1);
    const refToCommonErorr = useRef<HTMLDivElement>(null!);
    const [serverIp, setServerIp] = useState<string>('');

    const onPageCommonErrors = 10;

    const loadSuccess = async () => {
        refToCommonErorr.current.style.visibility = 'visible';
        const resp: ISuccessGroupResponse = await getGroupSuccesResponse(serverIp, pageCommonErorr, onPageCommonErrors);
        setSuccessGroup(resp);
        refToCommonErorr.current.style.visibility = 'hidden';
    }

    useEffect(() => {
        setServerIp(props.server);
        loadSuccess();
    }, [props])

    // const updateIntervalSuccess = () => {
    //     setTimeout(async () => {
    //         await loadSuccess();
    //         updateIntervalSuccess();
    //     }, 10000);

    // }

    // useEffect(() => {
    //     loadSuccess();
    //     updateIntervalSuccess();
    // }, [])

    return (
        <div style={{ margin: '20px' }}>
            <div style={{ color: "white", backgroundColor: "#009900", borderRadius: '2px', padding: '3px' }}>
                <Space>
                    success
                    <div ref={refToCommonErorr} style={{ color: 'white', visibility: 'hidden' }}>
                        <LoadingOutlined style={{ color: '#ffffff' }} />
                    </div>
                    <Button
                        onClick={loadSuccess}
                        style={{ backgroundColor: "#4dfe4d", height: '25px' }}>
                        <RedoOutlined style={{ color: "#006100", height: '10px' }} />
                    </Button>
                </Space>
            </div>
            <List
                size='small'
                dataSource={commonSuccessGroup?.models}
                style={{ textAlign: "left" }}
                pagination={{
                    onChange: (page) => {
                        setPageCommonErorr(page);
                    },
                    defaultCurrent: commonSuccessGroup?.pageNumber,
                    total: commonSuccessGroup?.total,
                    pageSize: onPageCommonErrors,
                }}
                renderItem={(success) => (
                    <Row>
                        <Col span={12}>
                            {success.modelGroup?.name ? success.modelGroup?.name : '-'}
                        </Col>
                        <Col span={4}>
                            {success.description ? success.description : '-'}
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