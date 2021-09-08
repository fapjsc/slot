import { Table } from 'react-bootstrap';
import EgmItem from './EgmItem';

const EgmList = ({ egmList, onClickHandler }) => {
  return (
    <Table striped hover responsive="md">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Map</th>
          <th>Cfg</th>
          <th>Casino</th>
          <th>Server</th>
          <th>Camera</th>
          {/* <th>Player</th>
          <th>Credit</th> */}
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {egmList.map((egm, index) => (
          <EgmItem key={egm.configId} index={index} egm={egm} onClickHandler={onClickHandler} />
        ))}
      </tbody>
    </Table>
  );
};

export default EgmList;
