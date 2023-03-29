import { useEffect, useState } from 'react';
import { getLastUpdate } from '../../api/anchorage';
import { ILastUpdate } from '../../models/anchorage/lastUpdate';
import { Space } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { dateConvert } from '../../models/dateConvert';


dayjs.extend(customParseFormat);

export const LastUpdateUnchorage = () => {
    const [lastUpdate, setLastUpdate] = useState<ILastUpdate>();

    const loadLastUpdate = async () => {
        const result: ILastUpdate = await getLastUpdate();
        console.log(result);

        setLastUpdate(result);
    }

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