// Components
import MachineList from './gameMachine/machineList';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {},
  navBox: {
    color: '#333',
    textAlign: 'center',
  },

  title: {
    fontSize: 24,
    backgroundColor: '#F6C844',
  },
}));

export default function Video() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Box className={classes.navBox}>
        <h3 className={classes.title}>真人百家樂</h3>
        <MachineList />
      </Box>
    </div>
  );
}