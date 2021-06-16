import { useContext } from 'react';

import DeviceContext from './context/device/DeviceContext';

// Style
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const DeviceMap = () => {
  const deviceContext = useContext(DeviceContext);
  const { deviceMap, postEgmList } = deviceContext;
  return (
    <Card className="shadow-lg p-2 bg-white rounded text-center">
      <h2 className="text-center my-4">Device Map</h2>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>IP</th>
              <th>設備名稱</th>
              <th>設備 ID</th>
              <th>EGM</th>
            </tr>
          </thead>
          <tbody>
            {deviceMap.length
              ? deviceMap.map(el => (
                  <tr>
                    <td>{el.egmIp}</td>
                    <td>{el.deviceLabel}</td>
                    <td>{el.cameraId}</td>
                    <td>{el.egm}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
        <Button disabled={!deviceMap.length} size="lg" className="w-25 p-2" variant="primary" onClick={() => postEgmList(deviceMap)}>
          確定
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DeviceMap;
