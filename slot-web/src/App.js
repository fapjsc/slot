import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

// Pages
import { Auth, Home, GamePlay, LoadingScreen } from './pages/';

// Context
import UserState from './context/User/UserState';

// Hooks
import PublicRoute from './hooks/PublicRoute';
import PrivateRoute from './hooks/PrivateRoute';

// Demo
import Demo from './pages/demo/Demo';
import Demo2 from './pages/demo/Demo2';
import HomeLevel from './pages/demo/HomeLevel';
import HomeVertical from './pages/demo/HomeVertical';

// Style
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <UserState>
          <PublicRoute restricted={true} path="/" component={Auth} exact />
          <PrivateRoute path="/home" component={Home} exact />
          <PrivateRoute path="/load" component={LoadingScreen} />
          <PrivateRoute path="/gameStart" component={GamePlay} />
          <PrivateRoute path="/demo" component={Demo} />
          <PrivateRoute path="/demo2" component={Demo2} />
          <PrivateRoute path="/level" component={HomeLevel} />
          <PrivateRoute path="/vertical" component={HomeVertical} />
        </UserState>
      </Switch>
    </Router>
  );
};

export default App;
