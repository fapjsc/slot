import { BrowserRouter as Router, Switch } from 'react-router-dom';

// Pages
import { Auth, Home, GamePlay, LoadingScreen } from './pages/';

// Context
import UserState from './context/User/UserState';

// Hooks
import PublicRoute from './hooks/PublicRoute';
import PrivateRoute from './hooks/PrivateRoute';

// Demo
import RtmpDemo from './pages/demo/RtmpDemo';
// import Demo from './pages/demo/Demo';
// import Demo2 from './pages/demo/Demo2';
// import HomeLevel from './pages/demo/HomeLevel';
// import HomeVertical from './pages/demo/HomeVertical';

// Style
import './App.scss';

const App = () => {
  return (
    <Router>
      <Switch>
        <UserState>
          <PublicRoute restricted={true} path="/" component={Auth} exact />
          <PublicRoute path="/load/" component={LoadingScreen} />
          <PrivateRoute path="/home" component={Home} exact />
          <PrivateRoute path="/gameStart" component={GamePlay} exact />
          <PublicRoute path="/rtmpDemo" component={RtmpDemo} exact />
          {/* <PrivateRoute path="/demo" component={Demo} exact />
          <PrivateRoute path="/demo2" component={Demo2} exact />
          <PrivateRoute path="/level" component={HomeLevel} exact />
          <PrivateRoute path="/vertical" component={HomeVertical} exact /> */}
        </UserState>
      </Switch>
    </Router>
  );
};

export default App;
