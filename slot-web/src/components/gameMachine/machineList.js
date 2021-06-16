// Components
import MachineItemNew from './machineItemNew';
// import MachineItem from './machineItem';
// import WolfGame from './WolfGame';

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
          <MachineItemNew index={index} machineDetails={item} token={props.token} />
        </Grid>
      );
    });
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3} style={{ padding: 10 }}>
        {props.egmList.length > 0 ? renderMachineList(props.egmList) : null}

        {/* <Grid item xs={12} sm={4} md={3} className={classes.grid}>
          <MachineItemNew
            machineDetails={{
              cameraId: '7324b1d00ac5e2592e3f26e14bee3b40be63ea5f0a56058bdc8d0f8df505941f',
              casinoCode: 'casino_demo_1',
              egmId: 9,
              egmIp: '192.168.10.71',
              isEnable: true,
              mapId: 2,
            }}
            token={props.token}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={3} className={classes.grid}>
          <MachineItemNew
            machineDetails={{
              cameraId: '78b0a66f8b0eda11f77a3666e32e02017800affd94ea78e104ceebae4d4dbcd6',
              // cameraId: '97932dfc5dcb2d3011791dd5fad60e865dbd4f77b26628f49371954e1384ceca',
              casinoCode: 'casino_demo_1',
              egmId: 12,
              egmIp: '192.168.10.73',
              isEnable: true,
              mapId: 4,
            }}
            token={props.token}
          />
        </Grid> */}
      </Grid>
    </div>
  );
}
