// Components
import LoginForm from '../components/auth/LoginForm';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import backImg from '../asset/yeQ9yk6EY4.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    paddingTop: 80,
    backgroundImage: `url(${backImg})`,
    paddingLeft: 10,
    paddingRight: 10,
  },

  paper: {
    maxWidth: 450,
    padding: 30,
    margin: '0 auto',
  },
}));

const Auth = props => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <LoginForm {...props} />
      </Paper>
    </div>
  );
};

export default Auth;
