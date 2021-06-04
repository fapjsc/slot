import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import MachineList from '../components/gameMachine/machineList';

// Style
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
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

const LoadingScreen = () => {
  const [egmList, setEgmList] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const classes = useStyles();

  // Router Props
  const history = useHistory();

  useEffect(() => {
    try {
      playerLandingApi();
      // history.replace('/home');
    } catch (error) {
      alert(error);
    }
  }, []);

  let playerLandingApi = async () => {
    let url = 'http://192.168.10.240/PlayerLandingApi?pc=DinoTesting&casino=casino_demo_1&at=1asd1rsdjaufoph29fhi2o';

    let response = await fetch(url, {
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json',
      },
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer',
    });
    let responseProcessed = await response.json();
    console.log(responseProcessed); // 顯示取得回傳資料
    if (responseProcessed.code > 100000000) {
      alert('ERROR!');
    }
    if (responseProcessed.code < 100000000) {
      setIsLoaded(false);
      setEgmList(responseProcessed.egmList);
      // history.replace({
      //   pathname: '/home',
      //   state: {  // location state
      //     data: responseProcessed,
      //   },
      // });
    }
  };

  return (
    <div className={classes.root}>
      {isLoaded ? (
        <Paper className={classes.paper}>
          <Box m={4}>
            <LinearProgress />
          </Box>
          <Box>Loading...</Box>
        </Paper>
      ) : (
        <Box className={classes.rootList}>
          <MachineList egmList={egmList} />
        </Box>
      )}
    </div>
  );
};

export default LoadingScreen;
