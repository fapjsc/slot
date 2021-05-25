import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import Home from './pages/Home';
import Game from './pages/Game';
import Auth from './pages/Auth';
import {SocketContext, socket} from './context/socket';
function App() {
  return (
        <SocketContext.Provider value={socket}>
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

        <Switch>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Auth />
          </Route>
        </Switch>
    </Router>
    </SocketContext.Provider> 
  );
}

export default App;
