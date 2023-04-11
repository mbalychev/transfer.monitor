import { Col, Row } from 'antd/es/grid';
import { Space } from 'antd';
import { LastUpdateUnchorage } from '../../components/anchorage/lastUpdate';
import { AnchorageErrors } from '../../components/anchorage/errors';
import { AnchorageSuccess } from '../../components/anchorage/success';
import { CommonErrors } from '../../components/anchorage/commonErrors';
import { useEffect, useState } from 'react';
interface Props {
  server: string;
}
export const Anchorage = (props: Props) => {
  const [serverIp, setServerIp] = useState(props.server);

  useEffect(() => {
    setServerIp(props.server);
  }, [props])

  return (
    <div>
      <Row>
        <Col span={2}>
          <header>
            <Space>
              Anchorage
            </Space>
          </header>
        </Col>
      </Row>
      <Row>
        <Col>
          <LastUpdateUnchorage server={serverIp} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <AnchorageErrors server={serverIp} />
        </Col>
        <Col span={12}>
          <AnchorageSuccess server={serverIp} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <CommonErrors server={serverIp} />
        </Col>
      </Row>
    </div>
  )
}