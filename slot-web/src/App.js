import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { SocketContext, socket } from './context/socket';

// Components
import Home from './pages/Home';
import Game from './pages/Game';
import GameStart from './pages/GameStart';
import GameScreen from './pages/GameScreen'; //測試

// Style
import './App.css';

function App() {
  return (
    <Router>
      {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

      <Switch>
        {/* <Route path="/loading">
            <LoadingScreen />
          </Route> */}
        {/* <Route path="/gameScreen">
          <GameScreen />
        </Route> */}
        <Route path="/game/:camera">
          <GameScreen />
        </Route>
        <Route path="/gameStart">
          <GameStart />
        </Route>

        {/* <Route path="/auth">
            <Auth />
          </Route> */}
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
