// Components
import Header from '../components/layout/Header';
import HeaderNav from '../components/HeaderNav';
import Carousel from '../components/Carousel';
import OverView from '../components/layout/OverView';

// Style
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';
import backgroundImg from '../asset/265013.jpg';

const useStyle = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '110vh',
    backgroundColor: '#000',
  },
}));

const Home = () => {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Header />
      <HeaderNav />
      <Carousel />
      <OverView />
    </Box>
  );
};

export default Home;
