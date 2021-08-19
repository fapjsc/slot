import { useEffect, useContext, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

// Components
import MachineList from '../components/gameMachine/machineList';
import Carousels from '../components/Carousels';
import ThePadding from '../components/UI/padding/ThePadding';
import Dialog from '../components/UI/Dialog';
import GameLoadingCard from '../components/UI/GameLoadingCard';

// Layout
import HomeHeader from '../layout/HomeHeader';

// Context
import UserContext from '../context/User/UserContext';

// Api
import { wsUri } from '../api/config';

// Style
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core';

// Image
import backgroundImg from '../asset/5dde4f6dc409c1574850413996.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    // backgroundImage: `url(${backImg})`,
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },
  rootList: {
    // backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    paddingBottom: '3rem',
  },
  paper: {
    maxWidth: 450,
    padding: 30,
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    margin: 'auto',
    marginBottom: '100rem',
  },
  gameLoadingBox: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();

  const history = useHistory();

  // User Context
  const userContext = useContext(UserContext);
  const {
    apiToken,
    setApiToken,
    egmList,
    getEgmList,
    webSocketHandler,
    onActionEgmList,
    egmConnectList,
    wsClient,
    setLoginData,
    getUserInfo,
    userInfo,
    isGameLoading,
  } = userContext;

  // Init State
  const [showList, setShowList] = useState(false);
  const [showPadding, setShowPadding] = useState(true);

  useEffect(() => {
    const egmStateWebSocketUri = `${wsUri}stateQuote`;
    webSocketHandler(egmStateWebSocketUri);
    let token = localStorage.getItem('token');
    let player = localStorage.getItem('player');
    let casino = localStorage.getItem('casino');

    const data = {
      casino,
      pc: player,
    };
    setApiToken(token);

    getUserInfo(token, data);

    // localStorage.setItem('isShow', true);

    return () => {
      if (egmList === undefined) {
        // alert('無法獲取EGM，請重新登入');
        // history.replace('/');
        // localStorage.clear();
      }
      if (wsClient) wsClient.close();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    egmConnectList.forEach(el => {
      if (el.state === 1) {
        setShowList(true);
        setShowPadding(false);
      }
    });
    // console.log(egmConnectList);
  }, [egmConnectList]);

  useEffect(() => {
    if (!apiToken) return;

    const data = {
      pc: localStorage.getItem('pc'),
      casino: localStorage.getItem('casino'),
      token: localStorage.getItem('token'),
    };
    getEgmList(data);
    setLoginData(data);

    // eslint-disable-next-line
  }, [apiToken, onActionEgmList]);

  const handleLogout = () => {
    if (wsClient) wsClient.close();
    localStorage.clear();
    history.replace('/');
  };

  return (
    <div className={classes.root}>
      {!isGameLoading ? (
        <Box className={classes.gameLoadingBox}>
          <GameLoadingCard />
        </Box>
      ) : (
        <Fragment>
          {/* 等待遊戲開始玩狀態 */}
          <ThePadding show={showPadding} />

          {/* 客服系統通知 */}
          {!localStorage.getItem('isShow') && <Dialog />}

          <Box className={classes.rootList}>
            <Box style={{ padding: 20, display: 'flex', justifyContent: 'flex-end' }}>
              <HomeHeader
                handleLogout={handleLogout}
                user={userInfo && userInfo.playerCode}
                money={userInfo && userInfo.walletMoney}
              />
            </Box>

            {/* 輪播圖 */}
            <Carousels />

            <div>{egmList && showList && <MachineList egmList={egmList} token={apiToken} />}</div>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

export default Home;
