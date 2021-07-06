import { useContext, useEffect } from 'react';
import SocketContext from './context/socket-context';

const BroadCastDev = () => {
  const socketContext = useContext(SocketContext);
  const { connect, socketClient } = socketContext;

  useEffect(() => {
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <h1>DEV</h1>
      {/* <button onClick={() => connect(process.env.REACT_APP_SOCKET_CONNECT)}>connect</button> */}
      <button onClick={() => connect('http://192.168.10.109:5000')}>connect</button>
      <button onClick={() => socketClient.close()}>disconnect</button>
    </div>
  );
};

export default BroadCastDev;
