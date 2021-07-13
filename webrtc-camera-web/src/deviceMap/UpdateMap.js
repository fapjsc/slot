import { useContext } from 'react';
import DeviceContext from '../context/device/DeviceContext';

// Style
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const UpdateMap = () => {
  const deviceContext = useContext(DeviceContext);
  const { deviceMap, postEgmList } = deviceContext;
  return (
    <Card className="shadow-lg p-2 bg-white rounded text-center">
      <h2 className="text-center my-4">Update Map</h2>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Egm ID</th>
              <th>Egm IP</th>
              <th>Camera名稱</th>
              <th>Camera ID</th>
              <th>Audio名稱</th>
              <th>Audio ID</th>
            </tr>
          </thead>
          <tbody>
            {deviceMap.length
              ? deviceMap.map((el, index) => (
                  <tr key={index}>
                    <td>{el.egm}</td>
                    <td>{el.egmIp}</td>
                    <td>{el.deviceLabel}</td>
                    <td>{el.cameraId}</td>
                    <td>{el.deviceLabel}</td>
                    <td>{el.audioDeviceId}</td>
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

export default UpdateMap;
