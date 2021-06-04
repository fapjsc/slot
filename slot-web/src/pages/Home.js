import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import MachineList from '../components/gameMachine/machineList';
import ApiController from '../api/apiController';
// Style
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import backImg from '../asset/yeQ9yk6EY4.jpg';
import backgroundImg from '../asset/5dde4f6dc409c1574850413996.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    paddingTop: 80,
    backgroundImage: `url(${backImg})`,
  },
  rootList: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '110vh',
  },
  paper: {
    maxWidth: 450,
    padding: 30,
    margin: '0 auto',
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
  },
})); 

const Home = () => {
  const [egmList, setEgmList] = useState({});
  const [isLoaded, setIsLoaded] = useState(true);
  const [loadFailed, setIsLoadFailed] = useState(false);
  const classes = useStyles();

  // Router Props
  const history = useHistory();

  useEffect(() => {
    // setTimeout(() => {
    //   setIsLoadFailed(true);
    // }, 15000);
    try {
      playerLandingApi();
    } catch (error) {
      alert(error);
    }
  }, []);

  let playerLandingApi = async () => {
    let url = 'PlayerLandingApi?pc=DinoTesting&casino=casino_demo_1&at=1asd1rsdjaufoph29fhi2o';

    try {
      let responseData = await ApiController().playerLandingApi();
      if(responseData.ok){
      }
    } catch (error) {
      
    }
    // let responseProcessed = await Api.apiGet(url);
    // console.log('playerLandingApi:', responseProcessed); // 顯示取得回傳資料
    // if (responseProcessed.code > 100000000) { // code 超過 100000000 為問題回傳
    //   alert('ERROR!');
    // }
    // if (responseProcessed.code < 100000000) { 
    //   setIsLoaded(false);
    //   setEgmList(responseProcessed.egmList); 
    // }
  }

  return (
    <div className={classes.root}>
      {loadFailed ?
      <Paper className={classes.paper}>
        <Box>Connection Failed.</Box>
      </Paper>
      :
      isLoaded ?
        <Paper className={classes.paper}>
          <Box m={4}>
            <LinearProgress />
          </Box>
          <Box>Loading...</Box>
        </Paper>
        :
        <Box className={classes.rootList}>
          <MachineList egmList={egmList}/>
        </Box>
      }
    </div>
  );
};

export default Home;
