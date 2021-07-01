import { useEffect, useState, useContext } from 'react';

// Components
import MachineList from '../components/gameMachine/machineList';
import ApiController from '../api/apiController';
import Dialog from '../components/UI/Dialog';

import Test from '../components/gameMachine/test';

// Context
import UserContext from '../context/User/UserContext';

// Style
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import backImg from '../asset/yeQ9yk6EY4.jpg';
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
  const [isLoaded, setIsLoaded] = useState(true);
  const [loadFailed, setIsLoadFailed] = useState(false);
  const classes = useStyles();

  // User Context
  const userContext = useContext(UserContext);
  const { apiToken, setApiToken, setEgmList, egmList } = userContext;

  useEffect(() => {
    playerLandingApi();
    // eslint-disable-next-line
  }, []);

  let playerLandingApi = async () => {
    let pc = 'DinoTesting';
    let casino = 'casino_demo_1';
    let at = '1asd1rsdjaufoph29fhi2o';

    try {
      let responseData = await ApiController().playerLandingApi(pc, casino, at);
      console.log(responseData);
      if (responseData.code > 100000000) {
        // code 超過 100000000 為問題回傳
        alert('ERROR!');
        setIsLoadFailed(true);
      }
      if (responseData.code < 100000000) {
        setIsLoaded(false);
        setEgmList(responseData.egmList); // In useState
        setApiToken(responseData.apiToken); // In useContext
        localStorage.setItem('token', responseData.apiToken);
      }
    } catch (error) {
      alert('ERROR message: ', error);
      setIsLoadFailed(true);
    }
  };

  return (
    <Box className={isLoaded ? classes.root : classes.rootList}>
      {loadFailed ? (
        <Paper className={classes.paper}>
          <Box>Connection Failed.</Box>
        </Paper>
      ) : isLoaded ? (
        <Paper className={classes.paper}>
          <Box m={4}>
            <LinearProgress />
          </Box>
          <Box>Loading...</Box>
        </Paper>
      ) : egmList ? (
        <Box>
          {/* <Test /> */}
          <br />
          <MachineList egmList={egmList} token={apiToken} />
          <Dialog />
        </Box>
      ) : null}
    </Box>
  );
};

export default Home;
