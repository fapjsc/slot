import BroadCast from './BroadCast';
import DeviceMap from './DeviceMap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

const App = () => {
  return (
    <Container className="App" style={{ maxWidth: 780 }}>
      <BroadCast />
      <br />
      <DeviceMap />
    </Container>
  );
};

export default App;
