import { useEffect, useState } from 'react';
import { getLastUpdate } from '../../api/anchorage';
import { ILastUpdate } from '../../models/anchorage/lastUpdate';
import { Space } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { dateConvert } from '../../models/dateConvert';

interface Props {
    server: string;
}
dayjs.extend(customParseFormat);

export const LastUpdateUnchorage = (props: Props) => {
    const [lastUpdate, setLastUpdate] = useState<ILastUpdate>();
    const [serverIp, setServerIp] = useState<string>('');
    const loadLastUpdate = async () => {
        const result: ILastUpdate = await getLastUpdate(serverIp);
        console.log(result);

        setLastUpdate(result);
    }

    useEffect(() => {
        setServerIp(props.server);
        loadLastUpdate();
    }, [props])

    const updateIntervalLastUpdate = () => {
        setTimeout(async () => {
            await loadLastUpdate()
            updateIntervalLastUpdate();
        }, 5000);
    }

    useEffect(() => {
        updateIntervalLastUpdate();
    }, [])


    function dayjs(dateOrgData: Date | undefined): import("react").ReactNode {
        throw new Error('Function not implemented.');
    }

    return (
        <div style={{ margin: '20px', width: '350px', height: '25px', backgroundColor: '#411763', color: 'white', padding: '6px', border: '1px', borderRadius: '2px' }}>
            <Space>
                Id:{lastUpdate?.lastId}
                <span style={{ opacity: '0.4' }}>
                    {dateConvert(lastUpdate?.dateOrgData)}
                </span>
            </Space>
        </div>
    )
}