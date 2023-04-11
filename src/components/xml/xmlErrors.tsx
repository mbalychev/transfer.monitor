import { LoadingOutlined } from '@ant-design/icons';
import { List, Space } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { JsxElement } from 'typescript';
import { getXmlErrors } from "../../api/xml";
import { IErrorsResults } from "../../models/xml/errorsResults";

export const XmlErrors = () => {

    const [errors, setErrors] = useState<IErrorsResults[]>();
    const refToSpinError = useRef<HTMLDivElement>(null!);

    const loadErrors = async () => {
        refToSpinError.current.style.visibility = 'visible';
        const resp = await getXmlErrors();
        setErrors(resp as IErrorsResults[]);
        refToSpinError.current.style.visibility = 'hidden';
    }

    useEffect(() => {
        loadErrors();
    }, [])

    const header = (): JSX.Element => {
        return (
            <div style={{ color: "white", backgroundColor: "red", borderRadius: '2px' }}>
                <Space>
                    errors
                    <div ref={refToSpinError} style={{ color: 'white', visibility: 'hidden' }}>
                        <LoadingOutlined style={{ color: '#ffffff' }} />
                    </div>
                </Space>
            </div>
        )
    }

    return (
        <div>
            <List
                dataSource={errors}
                header={header()}
                locale={{ emptyText: 'нет ошибок' }}
                renderItem={(error) => (
                    <div>
                        {error.fileId} - {error.app} - {error.result} - {error.dateCreate}
                    </div>
                )}>

            </List>
        </div>
    )
}