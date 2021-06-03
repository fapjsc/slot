import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Components

// Style
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import backImg from '../asset/yeQ9yk6EY4.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    paddingTop: 80,
    backgroundImage: `url(${backImg})`,
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
  const classes = useStyles();

  // Router Props
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.replace('/home');
    }, 5000);
    // eslint-disable-next-line
  }, []);
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Box m={4}>
          <LinearProgress />
        </Box>
        <Box>Loading...</Box>
      </Paper>
    </div>
  );
};

export default LoadingScreen;
