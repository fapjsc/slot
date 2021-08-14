import { useEffect, useContext } from 'react';

// Components
import MachineItemNew from './machineItemNew';
import Dialog from '../../components/UI/Dialog';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import BorderAnimation from '../UI/BorderAnimation';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

// Context
import UserContext from '../../context/User/UserContext';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 50,
  },
  box: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
    maxWidth: '20rem',
    margin: '0 auto',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const MachineList = props => {
  // console.log(props.egmList);
  const classes = useStyles();

  // User Context
  const { pointLading } = useContext(UserContext);

  const renderMachineList = props.egmList.map((item, index) => {
    return (
      <Grid className={classes.grid} key={index} item md={3} sm={6} xs={12}>
        <Box className={classes.box}>
          <BorderAnimation>
            <MachineItemNew index={index} title={item.gameName} description={item.gameDesc} picName={item.picName} machineDetails={item} token={props.token} />
          </BorderAnimation>
        </Box>
      </Grid>
    );
  });

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      {localStorage.getItem('isShow') && <Dialog />}

      <Backdrop className={classes.backdrop} open={pointLading}>
        <div>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
          {/* <p>開分中，請稍候...</p> */}
        </div>
      </Backdrop>

      <Grid container spacing={4} className={classes.container}>
        {renderMachineList}
      </Grid>
    </div>
  );
};
export default MachineList;
