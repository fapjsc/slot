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
  grid: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

const MachineList = props => {
  // console.log(props.egmList);
  const classes = useStyles();

  const renderMachineList = props.egmList.map((item, index) => {
    return (
      <BorderAnimation key={index}>
        <MachineItemNew index={index} title={item.gameName} description={item.gameDesc} picName={item.picName} machineDetails={item} token={props.token} />
      </BorderAnimation>
    );
  });

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={5} style={{ padding: 10 }}>
        {renderMachineList}
      </Grid>
    </div>
  );
};
export default MachineList;
