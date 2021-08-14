import { useEffect, useContext, Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import MachineList from '../components/gameMachine/machineList';
// import Dialog from '../components/UI/Dialog';
import ThePadding from '../components/UI/padding/ThePadding';

// Context
import UserContext from '../context/User/UserContext';

// Api
import { wsUri } from '../api/config';

// Style
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

// Image
import backgroundImg from '../asset/5dde4f6dc409c1574850413996.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundImage: `url(${backImg})`,
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
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
  const {
    apiToken,
    setApiToken,
    egmList,
    getEgmList,
    webSocketHandler,
    onActionEgmList,
    egmConnectList,
    wsClient,
    setLoginData,
  } = userContext;

  // Init State
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const egmStateWebSocketUri = `${wsUri}stateQuote`;
    webSocketHandler(egmStateWebSocketUri);
    let token = localStorage.getItem('token');
    setApiToken(token);

    return () => {
      if (egmList === undefined) {
        // alert('無法獲取EGM，請重新登入');
        // history.replace('/');
        // localStorage.clear();
      }
      if (wsClient) wsClient.close();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    egmConnectList.forEach(el => {
      if (el.state === 1) setShowList(true);
    });
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
    setLoginData(data);

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
        <Box style={{ padding: 20, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleLogout} variant="contained" color="secondary">
            登出
          </Button>
        </Box>

        <ThePadding show={true} showList={showList} />
        {/* <ThePadding show={true} /> */}

        {egmList && showList && (
          <Fragment>
            <MachineList egmList={egmList} token={apiToken} />
          </Fragment>
        )}
      </Box>
    </div>
  );
};

export default Home;
