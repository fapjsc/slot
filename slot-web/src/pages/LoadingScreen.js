import { useEffect, useState, useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

// Components
import backgroundImg from '../asset/5dde4f6dc409c1574850413996.jpg';
import ApiController from '../api/apiController';

// Contest
import UserContext from '../context/User/UserContext';

// Style
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
// import backImg from '../asset/yeQ9yk6EY4.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    paddingTop: 80,
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  paper: {
    maxWidth: 450,
    padding: 30,
    margin: '200px auto',
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
}));

const LoadingScreen = () => {
  const classes = useStyles();

  // User Context
  const { setApiToken } = useState(UserContext);

  // InitState
  const [loadFailed, setIsLoadFailed] = useState(false);

  // Router Props
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const history = useHistory();

  let playerLandingApi = async () => {
    setIsLoadFailed(false);
    let pc = params.get('player');
    let casino = params.get('casino');
    let at = params.get('at');

    localStorage.setItem('pc', pc);
    localStorage.setItem('casino', casino);
    localStorage.setItem('at', at);

    try {
      let responseData = await ApiController().playerLandingApi(pc, casino, at);
      if (responseData.code > 100000000) {
        // code 超過 100000000 為問題回傳
        setIsLoadFailed(true);
      }
      if (responseData.code < 100000000) {
        localStorage.setItem('token', responseData.apiToken);
        localStorage.setItem('casinoToken', responseData.casinoToken);
        history.replace('/home');
      }
    } catch (error) {
      console.log('ERROR message: ', error);
    }
  };

  useEffect(() => {
    playerLandingApi();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={classes.root}>
      {!loadFailed ? (
        <Paper className={classes.paper}>
          <Box m={4}>
            <LinearProgress />
          </Box>
          <Box>Loading...</Box>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Box>Connection Failed.</Box>
        </Paper>
      )}
    </div>
  );
};

export default LoadingScreen;
