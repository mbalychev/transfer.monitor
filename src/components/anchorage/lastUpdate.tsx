import { useEffect, useState } from 'react';
import { getLastUpdate } from '../../api/anchorage';
import { ILastUpdate } from '../../models/anchorage/lastUpdate';
import { Space } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';


dayjs.extend(customParseFormat);

export const LastUpdateUnchorage = () => {
    const [lastUpdate, setLastUpdate] = useState<ILastUpdate>();
    
    const loadLastUpdate = async () =>{
        const result: ILastUpdate = await getLastUpdate();
        console.log(result);
        
        setLastUpdate(result);
    }
    
    const dateLastId = () => {
        if(lastUpdate?.dateOrgData != undefined)
            return (
                <>
                    {dayjs(lastUpdate?.dateOrgData)?.toString()}
                </>
                )
        else
                return(<></>)

    }
    useEffect(() => {
        const i = setTimeout(() => loadLastUpdate(),1000);
    })


    function dayjs(dateOrgData: Date | undefined): import("react").ReactNode {
        throw new Error('Function not implemented.');
    }

    return (
        <div style={{margin: '20px', width: '350px', height: '25px', backgroundColor: '#411763', color: 'white', padding: '6px'}}>
                <Space>
                        last: <b>{lastUpdate?.lastId}</b> {lastUpdate?.dateOrgData.toString()}
                        {/* {dayjs(lastUpdate?.dateOrgData)?.toString()} */}
                </Space>
        </div>
    )
}