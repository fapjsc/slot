// Components
import MachineItem from './machineItem';
import WolfGame from './WolfGame';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },

  grid: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function MachineList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ padding: 10 }}>
        <Grid item xs={12} sm={4} md={3} className={classes.grid}>
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.grid}>
          <MachineItem camera="0890289"/>
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.grid}>
          <MachineItem />
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.grid}>
          <MachineItem />
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.grid}>
          <MachineItem />
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.grid}>
          <MachineItem />
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.grid}>
          <MachineItem />
        </Grid>
      </Grid>
    </div>
  );
}
