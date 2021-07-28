import { useContext } from 'react';
import DeviceContext from '../context/device/DeviceContext';

// Style
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

const UpdateMap = () => {
  const deviceContext = useContext(DeviceContext);
  const { egmList, getEgmList, isLoading } = deviceContext;
  return (
    <Card className="shadow-lg p-2 bg-white rounded text-center">
      <h2 className="text-center my-4">Exists Map</h2>
      <Card.Body>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>web Num</th>
              <th>Egm ID</th>
              <th>Egm IP</th>
              <th>Camera名稱</th>
              <th>Camera ID</th>
              <th>Audio名稱</th>
              <th>Audio ID</th>
            </tr>
          </thead>
          <tbody>
            {egmList.length
              ? egmList.map((el, index) => (
                  <tr key={index}>
                    <td>{el.cameraIndex}</td>
                    <td>{el.egmId}</td>
                    <td>{el.egmIp}</td>
                    <td>{el.deviceLabel}</td>
                    <td>{el.cameraId}</td>
                    <td>{el.deviceLabel}</td>
                    <td>{el.audioId}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>

        <Button size="lg" className="w-25 p-2" variant="primary" disabled={isLoading} onClick={() => getEgmList(process.env.REACT_APP_AGENT_SERVER)}>
          {isLoading && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />}
          {isLoading ? 'Loading…' : '更新'}
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UpdateMap;
