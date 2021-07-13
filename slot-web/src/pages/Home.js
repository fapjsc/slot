import { useEffect, useContext, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import MachineList from '../components/gameMachine/machineList';
import Dialog from '../components/UI/Dialog';

// Context
import UserContext from '../context/User/UserContext';

// Api
import { wsUri } from '../api/config';

// Style
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
// import backImg from '../asset/yeQ9yk6EY4.jpg';
import backgroundImg from '../asset/5dde4f6dc409c1574850413996.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundImage: `url(${backImg})`,
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    paddingTop: '15rem',
  },
  rootList: {
    // backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    paddingBottom: '60vh',
  },
  paper: {
    maxWidth: 450,
    padding: 30,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    margin: 'auto',
    marginBottom: '100rem',
  },
}));

const Home = () => {
  const classes = useStyles();

  const history = useHistory();

  // User Context
  const userContext = useContext(UserContext);
  const { apiToken, setApiToken, egmList, getEgmList, webSocketHandler, wsClient } = userContext;

  useEffect(() => {
    const egmStateWebSocketUri = `${wsUri}stateQuote`;
    webSocketHandler(egmStateWebSocketUri);
    let token = localStorage.getItem('token');
    setApiToken(token);
    // console.log(egmList);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!apiToken) return;

    const data = {
      pc: localStorage.getItem('pc'),
      casino: localStorage.getItem('casino'),
      token: localStorage.getItem('token'),
    };
    getEgmList(data);

    // eslint-disable-next-line
  }, [apiToken]);

  useEffect(() => {
    if (!wsClient) return;

    // console.log(wsClient);

    // wsClient.send('test');
  }, [wsClient]);

  const handleLogout = () => {
    localStorage.clear();
    history.replace('/');
  };

  return (
    <Box className={classes.rootList}>
      {!localStorage.getItem('token') && <Dialog />}
      {egmList && (
        <Fragment>
          <MachineList egmList={egmList} token={apiToken} />
        </Fragment>
      )}

      <button onClick={handleLogout}>logout</button>
    </Box>
  );
};

export default Home;
