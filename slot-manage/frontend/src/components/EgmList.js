import { Table } from 'react-bootstrap';
const EgmList = ({ egmList, onClickHandler }) => {
  return (
    <Table striped hover responsive="md">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>MapId</th>
          <th>EgmId</th>
          <th>Casino</th>
          <th>Status</th>
          <th>Server</th>
          <th>Camera</th>
          <th>Player</th>
          <th>Credit</th>
        </tr>
      </thead>
      <tbody>
        {egmList.map((egm, index) => (
          <tr key={egm.configId} className="" onClick={() => onClickHandler(egm.mapId)}>
            <td>{index + 1}</td>
            <td>{egm.gameName || 'null'}</td>
            <td>{egm.configId || 'null'}</td>
            <td>{egm.egmId || 'null'}</td>
            <td>{egm.casinoCode || 'null'}</td>
            <td className="text-center">/</td>
            <td>{egm.localServer || 'null'}</td>
            <td className="text-center">{egm.cameraIndex || 'null'}</td>
            <td>{egm.player || 'null'}</td>
            <td>{egm.credit || 'null'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EgmList;
