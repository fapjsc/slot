import BroadCast from './BroadCast';
import DeviceMap from './DeviceMap';
// import BroadCastDev from './BroadCastDev';

// Style
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

// Context
import SocketProvider from './context/SocketProvider';

const App = () => {
  return (
    <Container className="App" style={{ maxWidth: 780 }}>
      <SocketProvider>
        {/* <BroadCastDev /> */}
        <BroadCast />
      </SocketProvider>
      <br />
      <DeviceMap />
    </Container>
  );
};

export default App;
