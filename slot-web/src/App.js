import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

// Pages
import { Auth, Home, GamePlay, LoadingScreen } from './pages/';

// Hooks
import PublicRoute from './hooks/PublicRoute';
import PrivateRoute from './hooks/PrivateRoute';

// Style
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} path="/" component={Auth} exact />
        <PrivateRoute path="/home" component={Home} exact />
        <PrivateRoute path="/load" component={LoadingScreen} />
        <PrivateRoute path="/gameStart" component={GamePlay} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
