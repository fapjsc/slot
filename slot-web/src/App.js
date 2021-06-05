import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { SocketContext, socket } from './context/socket';

// Components
import Home from './pages/Home';
import Game from './pages/Game';
import GameStart from './pages/GameStart';
import GameStartNew from './pages/GameStartNew';
import GameStartMobile from './components/gameStart/GameStartMobile';
// import LoadingScreen from './pages/LoadingScreen';
import GameScreen from './pages/GameScreen'; //測試

// Style
import './App.css';

function App() {
  return (
    // <SocketContext.Provider value={socket}>
            renders the first one that matches the current URL. */}

      <Switch>
        {/* <Route path="/loading">
            <LoadingScreen />
          </Route> */}
          <Route path="/game/:camera">
            <Game />
          </Route>
          <Route path="/gameStartNew">
          </Route>
            <GameStartNew />
          <Route path="/gameStart">
            <GameStart />
          <Route path="/gameStartMobile">
          </Route>
            <GameStartMobile />
          </Route>
          {/* <Route path="/auth">
            <Auth />
          </Route> */}
          <Route path="/home">
            <Home />
          </Route>
            <Home />
          <Route path="/">
          </Route>
        </Switch>
      </Router>
    // </SocketContext.Provider>
  );
}

export default App;
