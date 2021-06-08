import { useEffect, useState, useContext } from 'react';

// Components
import MachineList from '../components/gameMachine/machineList';
import ApiController from '../api/apiController';

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
    minHeight: '100vh',
    paddingTop: 80,
    backgroundImage: `url(${backImg})`,
  },
  rootList: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '110vh',
  },
  paper: {
    maxWidth: 450,
    padding: 30,
    margin: '0 auto',
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
}));

const Home = () => {
  const [egmList, setEgmList] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [loadFailed, setIsLoadFailed] = useState(false);
  const classes = useStyles();

  // User Context
  const userContext = useContext(UserContext);
  const { apiToken, setApiToken } = userContext;

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
      }
    } catch (error) {
      alert('ERROR message: ', error);
      setIsLoadFailed(true);
    }
  };

  return (
    <div className={classes.root}>
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
      ) : (
        <Box className={classes.rootList}>
          <MachineList egmList={egmList} token={apiToken} />
        </Box>
      )}
    </div>
  );
};

export default Home;
