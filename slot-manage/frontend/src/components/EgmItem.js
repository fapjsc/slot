import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const EgmItem = ({ egm, onClickHandler, index }) => {
  const { playingList } = useSelector(state => state.egm);
  const [egmState, setEgmState] = useState('');

  const isPlaying = <span className="text-success fw-bold">遊戲中</span>;
  const hasConn = <span className="text-primary fw-bold">已連線</span>;

  useEffect(() => {
    const existsItem = playingList.find(el => el === egm.mapId);

    if (existsItem) {
      setEgmState('isPlaying');
    } else {
      setEgmState('');
    }
  }, [egm.mapId, playingList]);

  return (
    <tr key={egm.configId} onClick={() => onClickHandler(egm.configId)}>
      <td>{index + 1}</td>
      <td>{egm.gameName || 'null'}</td>
      <td>{egm.mapId || 'null'}</td>
      <td>{egm.configId || 'null'}</td>
      <td>{egm.casinoCode || 'null'}</td>
      <td>{egm.localServer || 'null'}</td>
      <td>{egm.cameraIndex || 'null'}</td>
      {/* <td>{egm.player || 'null'}</td>
      <td>{egm.credit || 'null'}</td> */}
      <td>{egmState === 'isPlaying' ? isPlaying : hasConn}</td>
    </tr>
  );
};

export default EgmItem;
