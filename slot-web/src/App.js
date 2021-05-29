import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SocketContext, socket } from './context/socket';

// Components
import Home from './pages/Home';
import Game from './pages/Game';
import Auth from './pages/Auth';
// import GameStart from './pages/GameStart';
import LoadingScreen from './pages/LoadingScreen';

// Style
import './App.css';

function App() {
  return (
    <SocketContext.Provider value={socket}>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <Switch>
          <Route path="/loading">
            <LoadingScreen />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          {/* <Route path="/gameStart">
            <GameStart />
          </Route> */}
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <LoadingScreen />
          </Route>
        </Switch>
      </Router>
    </SocketContext.Provider>
  );
}

export default App;
