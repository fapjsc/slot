// Style
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import logo from '../../asset/casino-background-logo-with-game-card-signs_172107-1205.jpg';

const useStyle = makeStyles(theme => ({
  root: {
    maxWidth: 1140,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  logo: {
    width: 180,
    height: 90,
    marginRight: 'auto',
  },
}));

const Heaer = () => {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <img className={classes.logo} src={logo} alt="logo" />
      <Box>
        <Button
          disabled
          className="ml-1"
          variant="contained"
          color="primary"
          style={{ backgroundColor: '#F6C844', color: '#333' }}
        >
          會員登入
        </Button>
      </Box>

      <Box mx={1}>
        <Button variant="contained" color="secondary">
          立即註冊
        </Button>
      </Box>
    </Box>
  );
};

export default Heaer;
