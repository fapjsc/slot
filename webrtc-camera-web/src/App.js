import BroadCast from './BroadCast';
import UpdateMap from './deviceMap/UpdateMap';
import ExistsMap from './deviceMap/ExistsMap';
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
      <ExistsMap />
      <br />
      <br />
      <br />
      <UpdateMap />
    </Container>
  );
};

export default App;
