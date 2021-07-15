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
import Button from '@material-ui/core/Button';
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
    height: '100%',
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
  const { apiToken, setApiToken, egmList, getEgmList, webSocketHandler, onActionEgmList, egmConnectList, wsClient } = userContext;

  useEffect(() => {
    const egmStateWebSocketUri = `${wsUri}stateQuote`;
    webSocketHandler(egmStateWebSocketUri);
    let token = localStorage.getItem('token');
    setApiToken(token);
    // console.log(egmList);
    return () => {
      wsClient.close();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // console.log(egmConnectList);
  }, [egmConnectList]);

  useEffect(() => {
    if (!apiToken) return;

    const data = {
      pc: localStorage.getItem('pc'),
      casino: localStorage.getItem('casino'),
      token: localStorage.getItem('token'),
    };
    getEgmList(data);

    // eslint-disable-next-line
  }, [apiToken, onActionEgmList]);

  const handleLogout = () => {
    if (wsClient) wsClient.close();
    localStorage.clear();
    history.replace('/');
  };

  return (
    <div className={classes.root}>
      <Box className={classes.rootList}>
        {!localStorage.getItem('isShow') && <Dialog />}
        <Box style={{ padding: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleLogout} variant="contained" color="secondary">
            登出
          </Button>
        </Box>

        {egmList && (
          <Fragment>
            <MachineList egmList={egmList} token={apiToken} />
          </Fragment>
        )}
      </Box>
    </div>
  );
};

export default Home;
