// Components
import MachineItemNew from './machineItemNew';

// Demo
import BorderAnimation from '../UI/BorderAnimation';

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

export default function MachineList(props) {
  console.log(props.egmList);
  const classes = useStyles();

  function renderMachineList(egmList) {
    console.log(egmList);
    return egmList.map((item, index) => {
      return (
        <Grid key={index} item xs={12} sm={4} md={3} className={classes.grid}>
          <BorderAnimation>
            <MachineItemNew index={index} title={item.gameName} description={item.gameDesc} picName={item.picName} machineDetails={item} token={props.token} />
          </BorderAnimation>
        </Grid>
      );
    });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ padding: 10 }}>
        {props.egmList.length > 0 ? renderMachineList(props.egmList) : null}
      </Grid>
    </div>
  );
}
