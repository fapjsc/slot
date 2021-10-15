import { useEffect, useCallback } from 'react';

// Components
import backgroundImg from '../asset/5dde4f6dc409c1574850413996.jpg';

// Hooks
import useHttp from '../hooks/useHttp';

// Api
import { playerLanding } from '../lib/api';

// Style
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

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

const LoadingScreen = ({ history, location }) => {
  const classes = useStyles();

  const { data, status, error, sendRequest } = useHttp(playerLanding);

  // Router Props
  let params = new URLSearchParams(location.search);

  const player = params.get('player');
  const casino = params.get('casino');
  const at = params.get('at');
  const backToCasinoUrl = params.get('returnUrl');

  const setDataToLocalStorage = useCallback(() => {
    localStorage.setItem('player', player);
    localStorage.setItem('casino', casino);
    localStorage.setItem('at', at);
    localStorage.setItem('backToCasinoUrl', backToCasinoUrl); // 返回娛樂城的url
  }, [player, casino, at, backToCasinoUrl]);

  const handleClick = () => {
    localStorage.clear();
    history.replace('/');
  };

  useEffect(() => {
    setDataToLocalStorage();
    sendRequest();
  }, [sendRequest, setDataToLocalStorage]);

  useEffect(() => {
    if (status === 'completed' && !error && data.code === 1) {
      // localStorage.setItem('token', data.apiToken);
      history.replace('/home');
    }
  }, [data, status, error, history]);

  return (
    <div className={classes.root}>
      {!error ? (
        <Paper className={classes.paper}>
          <Box m={4}>
            <LinearProgress />
          </Box>
          <Box>Loading...</Box>
        </Paper>
      ) : (
        <Paper className={classes.paper}>
          <Box m={4}>Connection Failed.</Box>
          <Box>
            <Button onClick={handleClick} variant="contained" color="primary">
              重新登入
            </Button>
          </Box>
        </Paper>
      )}
    </div>
  );
};

export default LoadingScreen;
