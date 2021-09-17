import { useState, Fragment } from 'react';

import { Table } from 'react-bootstrap';
import EgmItem from './EgmItem';
import { Form, Row, Col } from 'react-bootstrap';

import { casinoList, serverList } from '../data/casinoAndServer';

const EgmList = ({ egmList, onClickHandler }) => {
  // Init State
  const [selectCasino, setSelectCasino] = useState(casinoList[0]);
  const [selectLocalServer, setSelectLocalServer] = useState(serverList[0]);

  const casinoFilter = casinoList.map(el => <option key={el}>{el}</option>);
  const localFilterFilter = serverList.map(el => <option key={el}>{el}</option>);

  const egmListFilter = egmList.filter(
    el => el.casinoCode === selectCasino || el.localServer === selectLocalServer
  );

  const onChangeHandler = e => {
    if (e.target.id === 'casino') setSelectCasino(e.target.value);
    if (e.target.id === 'localServer') setSelectLocalServer(e.target.value);
  };

  return (
    <Fragment>
      <Row className="mb-4 bg-secondary p-4 rounded">
        <Form.Group as={Col} controlId="casino" className="">
          <Form.Label>Choose Casino</Form.Label>
          <Form.Control as="select" value={selectCasino} onChange={onChangeHandler}>
            {casinoFilter}
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="localServer">
          <Form.Label>Choose Local Server</Form.Label>
          <Form.Control as="select" value={selectLocalServer} onChange={onChangeHandler}>
            {localFilterFilter}
          </Form.Control>
        </Form.Group>
      </Row>
      <Table striped hover responsive="md">
        <thead>
          <tr>
            <th>Order</th>
            <th>Name</th>
            <th>Map</th>
            <th>Cfg</th>
            <th>Egm</th>
            <th>Camera</th>
            <th>Credit</th>
            <th>Player</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {egmListFilter.map(egm => (
            <EgmItem key={egm.configId} egm={egm} onClickHandler={onClickHandler} />
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default EgmList;
