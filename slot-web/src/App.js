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
          <PublicRoute path="/home" component={Home} exact />
          {/* <PrivateRoute path="/home" component={Home} exact /> */}
          <PublicRoute path="/load" component={LoadingScreen} />
          <PublicRoute path="/gameStart" component={GamePlay} />
          <PublicRoute path="/demo" component={Demo} />
          <PublicRoute path="/demo2" component={Demo2} />
          <PublicRoute path="/level" component={HomeLevel} />
          <PublicRoute path="/vertical" component={HomeVertical} />
        </UserState>
      </Switch>
    </Router>
  );
};

export default App;
