import { useEffect } from 'react';

// Components
import MachineItemNew from './machineItemNew';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import BorderAnimation from '../UI/BorderAnimation';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 50,
  },
  container: {},
  grid: {},
}));

const MachineList = props => {
  // console.log(props.egmList);
  const classes = useStyles();

  const renderMachineList = props.egmList.map((item, index) => {
    return (
      <Grid className={classes.grid} key={index} item md={3} style={{ maxWidth: '20rem' }}>
        <BorderAnimation>
          <MachineItemNew index={index} title={item.gameName} description={item.gameDesc} picName={item.picName} machineDetails={item} token={props.token} />
        </BorderAnimation>
      </Grid>
    );
  });

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4} className={classes.container}>
        {renderMachineList}
      </Grid>
    </div>
  );
};
export default MachineList;
