import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// Components
import Home from './pages/Home';

// Context
import AgentState from './context/agent/AgentState';

// Style
import './App.css';

function App() {
  return (
    <AgentState>
      <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/home">
            <Home />
          </Route>

          <Redirect to="/home" />
        </Switch>
      </Router>
    </AgentState>
  );
}

export default App;
