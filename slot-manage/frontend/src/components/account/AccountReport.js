import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Table, Dropdown } from 'react-bootstrap';

import { _getFilterData } from '../../lib/helper';

import moment from 'moment';

// import DUMMY_DATA from '../../mock/fakeData';
// DUMMY_DATA.sort((a, b) => new Date(a.cashInTime).getTime() - new Date(b.cashInTime).getTime());

const AccountReport = ({ setPageCount, dataPerPage, pagesVisited, reportData }) => {
  const history = useHistory();

  const { cashIn, cashOut } = useSelector(state => state.account);

  const [selectPlayer, setSelectPlayer] = useState('');
  const [selectMachine, setSelectMachine] = useState('');
  const [isFilterPlayer, setIsFilterPlayer] = useState(false);
  const [isFilterMachine, setIsFilterMachine] = useState(false);
  const [cashInTimeFilter, setCashInTimeFilter] = useState(false);
  const [cashOutTimeFilter, setCashOutTimeFilter] = useState(false);

  const [noFilterResult, setNoFilterResult] = useState(false);

  let playerList = [];
  let machineList = [];

  const filterResultData = _getFilterData(
    reportData,
    selectPlayer,
    selectMachine,
    isFilterPlayer,
    isFilterMachine,
    cashInTimeFilter,
    cashOutTimeFilter,
    cashIn,
    cashOut
  );

  if (reportData) {
    reportData.sort((a, b) => new Date(a.cashInTime).getTime() - new Date(b.cashInTime).getTime());
  }

  if (filterResultData && !selectPlayer && !selectMachine) {
    filterResultData.forEach(el => {
      playerList.push(el.player);
      machineList.push(el.machine);
    });
  }

  if (filterResultData && selectPlayer !== '') {
    const machineArr = reportData.filter(el => el.player === selectPlayer);
    machineArr.forEach(el => machineList.push(el.machine));
    playerList.push(selectPlayer);
  }

  if (filterResultData && selectMachine !== '') {
    const playerArr = reportData.filter(el => el.machine === selectMachine);
    playerArr.forEach(el => playerList.push(el.player));
    machineList.push(selectMachine);
  }

  playerList = Array.from(new Set(playerList));
  machineList = Array.from(new Set(machineList));

  const handleSelect = e => {
    const type = e.split('=')[0];
    const name = e.split('=')[1];

    if (type === 'player') setSelectPlayer(name);
    if (type === 'machine') setSelectMachine(name);
  };

  useEffect(() => {
    if (filterResultData && filterResultData.length > 0) {
      let num = Math.ceil(filterResultData.length / 20);
      setPageCount(num);
      setNoFilterResult(false);
    } else {
      setNoFilterResult(true);
    }
  }, [filterResultData, setPageCount]);

  const hasNotFilter = useCallback(() => {
    setIsFilterPlayer(false);
    setIsFilterMachine(false);
    setCashInTimeFilter(false);
    setCashOutTimeFilter(false);
    setNoFilterResult(false);
    setSelectPlayer('');
    setSelectMachine('');
    history.replace('/accounting');
  }, [history]);

  useEffect(() => {
    selectPlayer ? setIsFilterPlayer(true) : setIsFilterPlayer(false);
    selectMachine ? setIsFilterMachine(true) : setIsFilterMachine(false);
    if (cashIn && cashIn.startTime && cashIn.endTime) setCashInTimeFilter(true);
    if (cashOut && cashOut.startTime && cashOut.endTime) setCashOutTimeFilter(true);
    if (!cashIn || !cashIn.startTime || !cashIn.endTime) setCashInTimeFilter(false);
    if (!cashOut || !cashOut.startTime || !cashOut.endTime) setCashOutTimeFilter(false);
  }, [selectPlayer, selectMachine, cashIn, cashOut]);

  useEffect(() => {
    hasNotFilter();
  }, [hasNotFilter]);

  const tableContent =
    filterResultData &&
    filterResultData.slice(pagesVisited, pagesVisited + dataPerPage).map((el, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{el.uiOdr}</td>
        <td>{el.machine}</td>
        <td>{el.cashIn}</td>
        <td>{el.cashOut}</td>
        <td>{moment(el.cashInTime).format('YYYY-MM-DD HH:mm')}</td>
        <td>{moment(el.cashOutTime).format('YYYY-MM-DD HH:mm')}</td>
        <td>{el.betAmount}</td>
        <td>{el.player}</td>
      </tr>
    ));

  const playerDropDownItem =
    playerList &&
    playerList.map((el, index) => (
      <Dropdown.Item key={index} eventKey={`player=${el}`} onSelect={handleSelect}>
        {el}
      </Dropdown.Item>
    ));

  const machineDropDownItem =
    machineList &&
    machineList.map((el, index) => (
      <Dropdown.Item key={index} eventKey={`machine=${el}`} onSelect={handleSelect}>
        {el}
      </Dropdown.Item>
    ));

  return (
    <>
      <section style={{ minHeight: '20rem' }}>
        {noFilterResult && (
          <div
            className="alert alert-dismissible alert-light text-center"
            style={{ marginTop: '5rem', padding: '5rem', fontSize: '1.5rem' }}
          >
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              onClick={hasNotFilter}
            />
            <strong>找不到資料!</strong>
          </div>
        )}

        {!noFilterResult && (
          <Table bordered hover responsive="lg">
            <thead>
              <tr>
                <th>#</th>
                <th>Order</th>
                <th>
                  <Dropdown>
                    <Dropdown.Toggle
                      style={dropStyle}
                      id="dropdown-basic"
                      className={isFilterMachine && 'text-primary'}
                    >
                      遊戲名稱
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="scroll-big">
                      <Dropdown.Item onClick={hasNotFilter}>看全部</Dropdown.Item>
                      {machineDropDownItem}
                    </Dropdown.Menu>
                  </Dropdown>
                </th>
                <th>開分</th>
                <th>洗分</th>
                <th className={cashInTimeFilter ? 'text-primary' : ''}>開分時間</th>
                <th className={cashOutTimeFilter ? 'text-primary' : ''}>洗分時間</th>

                <th>押碼量</th>
                <th>
                  <Dropdown>
                    <Dropdown.Toggle
                      style={dropStyle}
                      id="dropdown-basic"
                      className={isFilterPlayer && 'text-primary'}
                    >
                      PLAYER
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="scroll-big">
                      <Dropdown.Item onClick={hasNotFilter}>看全部</Dropdown.Item>
                      {playerDropDownItem}
                    </Dropdown.Menu>
                  </Dropdown>
                </th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </Table>
        )}
      </section>
    </>
  );
};

const dropStyle = {
  boxShadow: 'none',
  background: 'transparent',
  fontWeight: 'bold',
  padding: 0,
  fontSize: '1.3rem',
};

export default AccountReport;
