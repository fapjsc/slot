import React, { useCallback, useEffect, useContext, useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useDispatch } from 'react-redux';

// Actions
import { setSelectEgmData } from '../store/actions/egmActions';

// Api
import { getPlayerInfo } from '../lib/api';

// Utils
import { _getLocalStorageItem } from '../utils/helper';

// Components
import MachineList from '../components/gameMachine/machineList';
import Carousels from '../components/Carousels';
import ThePadding from '../components/UI/padding/ThePadding';
import Dialog from '../components/UI/Dialog';
import GameLoadingCard from '../components/UI/GameLoadingCard';

// Hooks
import useHttp from '../hooks/useHttp';

// Lib
import { getEgmList } from '../lib/api';
import { connectWithWebSocket } from '../lib/wssConnect';

// Layout
import HomeHeader from '../layout/HomeHeader';
import Footer from '../layout/Footer';

// Context
import UserContext from '../context/User/UserContext';

// Style
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

// Image
import backgroundImg from '../asset/5dde4f6dc409c1574850413996.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${backgroundImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  },
  rootList: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    // paddingBottom: '3rem',
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

  // Redux
  const dispatch = useDispatch();

  // Init State
  const [showGameLoading, setShowGameLoading] = useState(false);

  // Hooks
  const {
    status,
    data: egmData,
    error,
    sendRequest: getEgmListRequest,
  } = useHttp(getEgmList, true);

  const {
    status: getPlayerInfoStatus,
    // error: getPlayerInfoError,
    data: playerInfo,
    sendRequest: getPlayerInfoRequest,
  } = useHttp(getPlayerInfo);

  // User Context
  const userContext = useContext(UserContext);
  const { wsClient } = userContext;

  const getPlayerInfoHandler = useCallback(() => {
    const getPlayerInfoReqData = _getLocalStorageItem('getPlayerInfo');
    getPlayerInfoRequest(getPlayerInfoReqData, true);
  }, [getPlayerInfoRequest]);

  useEffect(() => {
    connectWithWebSocket();
  }, []);

  useEffect(() => {
    getPlayerInfoHandler();
  }, [getPlayerInfoHandler]);

  useEffect(() => {
    dispatch(setSelectEgmData({}));
  }, [dispatch]);

  useEffect(() => {
    const reqData = {
      pc: localStorage.getItem('pc'),
      casino: localStorage.getItem('casino'),
      token: localStorage.getItem('token'),
    };
    getEgmListRequest(reqData); // redux
  }, [getEgmListRequest]);

  const handleLogout = () => {
    if (wsClient) wsClient.close();
    localStorage.clear();
    history.replace('/');
  };

  //==== JSX Elements ====//
  const noEgmList = (
    <Box style={{ margin: '6rem auto', textAlign: 'center' }}>
      <Button
        style={{ backgroundColor: 'rgba(66, 7, 105, 0.911)' }}
        type="button"
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        請重新登入
      </Button>
    </Box>
  );

  const fetchEgmErrorEl = (
    <div style={errorBox}>
      <p>{error}</p>
      <Button
        style={{ backgroundColor: 'rgba(66, 7, 105, 0.911)' }}
        type="button"
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        請重新登入
      </Button>
    </div>
  );

  return (
    <div className={classes.root}>
      {showGameLoading ? (
        <Box className={classes.gameLoadingBox}>
          <GameLoadingCard setShowGameLoading={setShowGameLoading} />
        </Box>
      ) : (
        <Fragment>
          {/* 客服系統通知 */}
          {!localStorage.getItem('isShow') && <Dialog />}

          <Box className={classes.rootList}>
            <Box style={headerBox}>
              <HomeHeader
                handleLogout={handleLogout}
                getPlayerInfoHandler={getPlayerInfoHandler}
                playerInfo={playerInfo}
                getPlayerInfoStatus={getPlayerInfoStatus}
                // playerCode={playerCode && playerCode}
                // walletMoney={walletMoney && walletMoney}
                // walletState={walletState && walletState}
              />
            </Box>

            {/* 輪播圖 */}
            <Carousels />

            {/* Egm List */}
            {status === 'pending' && <ThePadding show={true} />}

            {status === 'completed' && !error && egmData.egmList.length > 0 && (
              <MachineList
                egmList={egmData.egmList}
                token={playerInfo && playerInfo.apiToken}
                setShowGameLoading={setShowGameLoading}
              />
            )}

            {status === 'completed' && !error && egmData.egmList.length === 0 && noEgmList}

            {status === 'completed' && error && fetchEgmErrorEl}

            <Box style={footerBox}>
              <Footer />
            </Box>
          </Box>
        </Fragment>
      )}
    </div>
  );
};

const headerBox = {
  maxWidth: '678px',
  margin: '0px auto 10px auto',
};

const footerBox = {
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  maxWidth: '678px',
  margin: '0 auto',
};

const errorBox = {
  color: '#ddd',
  height: '20vh',
  marginTop: '5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

export default React.memo(Home);
