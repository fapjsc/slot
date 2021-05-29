// Components
import Sport from '../Sport';
import Video from '../Video';
import Slot from '../Slot';

// Style
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .8)',
    maxWidth: 1140,
    margin: '0 auto',
    padding: 10,
  },
}));

const OverView = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box>
        <Sport />
      </Box>
      <Box>
        <Video />
      </Box>
      <Box>
        <Slot />
      </Box>
    </div>
  );
};

export default OverView;
