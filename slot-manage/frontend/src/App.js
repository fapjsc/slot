import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { useEffect } from 'react';

// Layout
import Header from './layout/Header';
import Footer from './layout/Footer';

// Screen
import AccountingScreen from './pages/AccountingScreen';
import EgmScreen from './pages/EgmScreen';
import EditEgmScreen from './pages/EditEgmScreen';
import NotFound from './pages/NotFound';

// Style
import 'bootswatch/dist/morph/bootstrap.min.css';
import './App.css';
import { Container } from 'react-bootstrap';

// Socket
import { connectWithWss } from './utils/wssConnection';

const App = () => {
  useEffect(() => {
    connectWithWss();
  }, []);

  return (
    <Router>
      <Header />
      <main className="py-3 main">
        <Container>
          <Switch>
            <Route path="/" exact>
              <Redirect to="/egm" />
            </Route>
            <Route path="/egm" component={EgmScreen} exact />
            <Route path="/egm/edit/:configId" component={EditEgmScreen} />
            <Route path="/accounting" component={AccountingScreen} />
            <Route path="*" component={NotFound} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
