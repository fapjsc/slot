// Components
import MachineList from '../components/gameMachine/machineList';

// Style
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import backgroundImg from '../asset/5dde4f6dc409c1574850413996.jpg';

const useStyle = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '110vh',
  },
})); 

const Home = () => {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <MachineList />
    </Box>
  );
};

export default Home;
