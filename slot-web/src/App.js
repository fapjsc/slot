import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { SocketContext, socket } from './context/socket';

// Components
import Home from './pages/Home';
import GamePlay from './pages/GamePlay';
import TheButton from './components/TheButton';
// import Game from './pages/Game';
// import Auth from './pages/Auth';
// import GameScreenNew from './pages/GameScreenNew';
// import GameStart from './pages/GameStart';
// import GameStartNew from './pages/GameStartNew';
// import GameStartMobile from './components/gameStart/GameStartMobile';
// import LoadingScreen from './pages/LoadingScreen';

// Style
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dev">
          <GamePlay />
        </Route>
        {/* <Route path="/gameStartMobile">
          <GameStartMobile />
        </Route>
        <Route path="/gameStartNew">
          <GameStartNew />
        </Route> */}

        {/* <Route path="/game/:camera">
          <GameScreenNew />
        </Route> */}
        <Route path="/gameStart">
          <GamePlay />
        </Route>

        <Route path="/home">
          <Home />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
