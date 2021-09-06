import ApiController from '../api/apiController';

import { useContext, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Redux
import { useSelector, useDispatch } from 'react-redux';

// Actions
import { setSelectEgmData } from '../actions/egmActions';

import screenfull from 'screenfull';

// Context
import UserContext from '../context/User/UserContext';

// WebSocket
import { connectWithWebSocket } from '../lib/wssConnect';

// Api
// import { wsUri } from '../api/config';
import { pressSlot, getCurrentEgm } from '../lib/api';

// Hooks
import useHttp from '../hooks/useHttp';

// Components
import Screen from '../Screen';
import Review from '../components/review/Review';
import SubButtonHandle from '../components/subButtonHandle/SubButtonHandle';
import SquareButton from '../components/UI/button/SquareButton';
import OpenPointHandle from '../components/openPointHandle/OpenPointHandle';

// Landscape Component
import LandscapeSubBtnHandle from '../components/landscape/LandscapeSubBtnHandle';

// Layout
import Headers from '../layout/Headers';
import Nav from '../layout/Nav';

// Style
import classes from './GamePlay.module.scss';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import 'odometer/themes/odometer-theme-train-station.css';
import Box from '@material-ui/core/Box';

// Image
// import SnackBarBasicImage from '../asset/snack.jpg';

// Icon
import BuildIcon from '@material-ui/icons/Build';
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';

// Material Style
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  snackbarRoot: {
    fontSize: '1rem',
    height: '10em',
    width: '28em',
  },
  snackbarMessage: {
    textAlign: 'center',
    margin: '0 auto',
  },
}));

let checkTimer;

const GamePlay = () => {
  // User Context
  const userContext = useContext(UserContext);
  const {
    apiToken,
    // selectEgm,
    setApiToken,
    // setSelectEgm,
    // setBtnList,
    // btnList,
    // kickList,
    // removeKickItem,
    setReviewState,
    userReview,
  } = userContext;

  const styles = useStyles();

  // Router Props
  const history = useHistory();

  // Redux
  const { egmCreditList, selectEgmData, kickList } = useSelector(state => state.egm);
  const {
    btnList,
    btnStyle,
    egmSession,
    mapId,
    egmId,
    egmIP,
    cameraIndex: webNumber,
    picName,
  } = selectEgmData;

  // Actions
  const dispatch = useDispatch();
  // Hooks
  const { error: spinError, data: spinData, sendRequest: spinButtonRequest } = useHttp(pressSlot);

  const { sendRequest: getCurrentEgmRequest } = useHttp(getCurrentEgm);

  // Init State
  const [cashIn, setCashIn] = useState('');
  const [open, setOpen] = useState(false);
  const [closeWebRtcConnect, setCloseWebRtcConnect] = useState(false);
  const [socketClient, setSocketClient] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoGame, setAutoGame] = useState(false);
  const [credit, setCredit] = useState(0);
  const [creditLoading] = useState(false);
  const [mainBtn, setMainBtn] = useState([]);
  const [subBtn, setSubBtn] = useState([]);
  const [openSnack, setOpenSnack] = useState(true);
  const [directionMode, setDirectionMode] = useState('portrait');
  const [snackBarPic, setSnackBarPic] = useState();

  const [isOrientationVertical, setIsOrientationVertical] = useState(
    window.innerHeight > window.innerWidth
  );

  const reportWindowSize = () => {
    if (window.innerHeight > window.innerWidth) setIsOrientationVertical(true);
    if (window.innerHeight < window.innerWidth) setIsOrientationVertical(false);
  };

  const handleAutoPlay = () => {
    setAutoPlay(true);
    setOpenSnack(false);
  };

  const handleChange = e => {
    setCashIn(e.target.value);
  };

  const refreshPage = () => {
    socketClient.emit('refresh', webNumber);
    socketClient.on('clientReload', () => {
      console.log('client reload ==========');
      window.location.reload();
    });
  };

  const getSnackImg = useCallback(picName => {
    // webPack api 獲取圖片資料夾的上下文，遞歸尋找符合jpg的圖片
    const imgContext = require.context('../asset/gameDesc', false, /\.jpg|.png/);
    // 過濾符合props給的picName
    const imgPath = imgContext.keys().filter(path => path.includes(picName));
    // 轉成 es6 import obj
    const images = imgPath.map(path => imgContext(path));
    console.log(images, '1234');
    // return react 可以用的src obj
    if (images[0]) setSnackBarPic(images[0].default);

    // return react 可以用的src obj
  }, []);

  const leave = async () => {
    setOpen(true);
    setAutoGame(false);
    socketClient.emit('unsubscribe', webNumber);
    setCloseWebRtcConnect(true);
    try {
      const responseData = await ApiController().endGameApi(
        mapId,
        egmId,
        egmIP,
        apiToken,
        egmSession
      );

      if (responseData.code > 100000000) {
        alert(responseData.msg);
        setOpen(false);
        handleLogout();
      }

      if (responseData.code === 6 || responseData.code === 5) {
        history.replace('/home');
        setOpen(false);
        dispatch(setSelectEgmData({}));
        localStorage.removeItem('mapId');
        localStorage.removeItem('egmId');
        localStorage.removeItem('ses');
        localStorage.removeItem('egmIP');
        localStorage.removeItem('audioID');
        localStorage.removeItem('cameraID');
        localStorage.removeItem('webNumber');
        localStorage.removeItem('expirationTime');
      }
    } catch (error) {
      alert('ERROR message: 發生錯誤');
      setOpen(false);
      handleLogout();
    }
  };

  const handleLogout = useCallback(() => {
    localStorage.clear();
    history.replace('/');
    dispatch(setSelectEgmData({}));
    clearInterval(checkTimer);
  }, [dispatch, history]);

  const handleFullScreen = () => {
    if (screenfull.enabled) {
      screenfull.request();
    }
  };

  const calculateRemainingTime = expirationTime => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();
    const remainingDuration = adjExpirationTime - currentTime;
    return remainingDuration;
  };

  const updateExpirationTime = () => {
    // 現在時間加上三分鐘
    const expirationTime = new Date(new Date().getTime() + 60 * 1000 * 3);
    localStorage.setItem('expirationTime', expirationTime);
  };

  const checkRemainingTime = useCallback(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (!expirationTime) return;

    // console.log('checking...');

    const remainingTime = calculateRemainingTime(expirationTime);

    if (remainingTime <= 0) {
      // alert('閒置超過三分鐘');
      alert('閒置過久, 請重新登入');
      handleLogout();
    }
  }, [handleLogout]);

  window.onfocus = () => {
    checkRemainingTime();
  };

  window.onblur = () => {
    checkRemainingTime();
  };

  // 未分類
  useEffect(() => {
    handleFullScreen();
    const token = localStorage.getItem('token');
    setApiToken(token);

    window.addEventListener('resize', () => reportWindowSize());

    // 防止 user 按到上一頁
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, document.title, window.location.href);
    });

    return () => {
      window.removeEventListener('resize', reportWindowSize);
      // window.removeEventListener('popstate');
    };

    // eslint-disable-next-line
  }, []);

  // 遊戲說明
  useEffect(() => {
    getSnackImg(picName);
  }, [picName, getSnackImg]);

  useEffect(() => {
    checkTimer = setInterval(() => {
      checkRemainingTime();
    }, 3000);

    return () => {
      clearInterval(checkTimer);
    };
  });

  // get current egm daa
  useEffect(() => {
    if (selectEgmData.mapId) return;
    connectWithWebSocket();
    const mapId = localStorage.getItem('mapId');
    const egmId = localStorage.getItem('egmId');
    const ses = localStorage.getItem('ses');
    const apiToken = localStorage.getItem('token');
    const egmIP = localStorage.getItem('egmIP');

    const reqData = {
      mapId,
      egmId,
      egmIP,
      ses,
      apiToken,
    };
    getCurrentEgmRequest(reqData);
  }, [getCurrentEgmRequest, selectEgmData]);

  //==== Credit handle ====//
  useEffect(() => {
    if (!egmCreditList.length) return;
    let creditItem = egmCreditList.find(el => el.map === Number(selectEgmData.mapId));
    if (!creditItem) return;
    setCredit(creditItem.credit);
  }, [egmCreditList, selectEgmData]);

  //====  Spin Handler ====//
  // Spin
  const spin = useCallback(
    buttonNo => {
      checkRemainingTime();
      if (!credit || credit === '' || credit <= 50) {
        setAutoGame(false);
        alert('credit 不足');
        return;
      }

      const slotReqData = {
        cfgId: mapId,
        egmId,
        egmIP,
        buttonNo,
        egmSession,
        apiToken,
      };

      spinButtonRequest(slotReqData);
    },
    [apiToken, credit, egmIP, egmId, egmSession, mapId, spinButtonRequest, checkRemainingTime]
  );

  // Auto Spin
  useEffect(() => {
    if (!autoGame) return;
    if (!credit || credit === '' || credit <= 50) {
      setAutoGame(false);
      alert('credit 不足');
      return;
    }
    spin(77);
    let timer = setInterval(() => {
      spin(77);
    }, 3500);

    return () => {
      clearInterval(timer);
    };
  }, [autoGame, credit, spin]);

  // Check Spin Status
  useEffect(() => {
    if (!spinData) return;

    // 閒置過久被踢掉
    if (spinData.code === 100000061) {
      alert('閒置過久, 請重新登入');
      handleLogout();
      return;
    }

    if (spinError) {
      alert(spinError);
    }

    if (spinData.code === 4) {
      updateExpirationTime();
    }
  }, [spinData, history, spinError, handleLogout]);

  useEffect(() => {
    if (!kickList) return;

    const token = localStorage.getItem('token');

    kickList.forEach(el => {
      if (String(el.egm) === egmSession && String(el.token) === token) {
        alert('閒置過久, 請重新登入');
        handleLogout();
      }
    });
  }, [kickList, egmSession, handleLogout]);

  // Button Handle
  useEffect(() => {
    if (!btnList) return;
    let mainBtnTemp = [];
    let subBtnTemp = [];

    btnList.forEach(btn => {
      if (btn.buttonNo === 77 || btn.buttonNo === 99 || btn.buttonNo === 55) {
        mainBtnTemp.push(btn);
      } else {
        subBtnTemp.push(btn);
      }
    });

    setMainBtn(mainBtnTemp.reverse());

    if (btnStyle === 'igt-poker') {
      setSubBtn(subBtnTemp);
    } else if (btnStyle === 'igt-cashcove' || btnStyle === 'igt-cleopatra') {
      subBtnTemp.sort((a, b) => {
        if (a.buttonNo < b.buttonNo) {
          return -1;
        } else {
          return 1;
        }
      });
      setSubBtn(subBtnTemp);
    } else {
      setSubBtn(subBtnTemp.reverse());
    }
  }, [btnList, btnStyle]);

  // 確認手機方向
  useEffect(() => {
    if (!isOrientationVertical) handleFullScreen();
  }, [isOrientationVertical]);

  //==== Render Elements
  const backDrop = () => (
    <Backdrop className={styles.backdrop} open={open}>
      <div>
        <div>
          <CircularProgress color="inherit" />
        </div>
        <p>結算中，請稍候...</p>
      </div>
    </Backdrop>
  );

  // Portrait El
  const portraitScreenAndSnackEl = () => (
    <div className={`${classes.slotScreen}`}>
      <Screen
        setSocketClient={setSocketClient}
        autoPlay={autoPlay}
        setAutoPlay={setAutoPlay}
        leave={leave}
        closeWebRtcConnect={closeWebRtcConnect}
        setCloseWebRtcConnect={setCloseWebRtcConnect}
      />

      {openSnack && (
        <div
          onClick={handleAutoPlay}
          // style={{
          //   backgroundImage: `url(${SnackBarBasicImage})`,
          // }}
          className={classes.snackBar}
        ></div>
      )}
    </div>
  );

  // Button -P
  const portraitMainBtnListEl = mainBtn.map(btn => {
    return (
      <Grid
        item
        xs={3}
        key={btn.buttonNo}
        className={
          btn.buttonTxt === 'SPIN'
            ? `${classes.rotatorBtnBox} ${classes.autoBtnGrid}`
            : classes.rotatorBtnBox
        }
        onClick={() => spin(btn.buttonNo)}
      >
        <SquareButton text={btn.buttonTxt} />
      </Grid>
    );
  });

  const portraitMainBtn = () => (
    <Grid className={classes.girdContainer} spacing={0} container>
      <Grid
        item
        xs={3}
        className={`${classes.rotatorBtnBox} ${classes.grid0}`}
        onClick={() => setAutoGame(!autoGame)}
      >
        <SquareButton autoGame={autoGame} text={autoGame ? 'STOP' : 'AUTO'} />
      </Grid>
      {portraitMainBtnListEl}
    </Grid>
  );

  const portraitOpBtnHandleEl = () => {
    return (
      <div className={classes.btnHandle}>
        {/* 跑馬燈 */}
        <div className={classes.marquee}>
          <p>歡迎光臨～～</p>
        </div>

        <div className={classes.optionBtnBox}>
          <div>
            <SubButtonHandle
              subBtn={subBtn}
              spin={spin}
              btnStyle={btnStyle}
              directionMode={directionMode}
            />
          </div>

          {/* 查餘額 */}
          <div>
            <OpenPointHandle
              cashIn={cashIn}
              handleChange={handleChange}
              creditLoading={creditLoading}
              credit={credit}
              setAutoGame={setAutoGame}
            />
          </div>

          <div>
            <IconButton
              aria-label="rotation"
              style={{ backgroundColor: '#ddd' }}
              color="primary"
              onClick={refreshPage}
            >
              <BuildIcon fontSize="small" />
            </IconButton>
            <p className={classes.portraitText}>畫面優化</p>
          </div>

          <div>
            <IconButton
              aria-label="rotation"
              style={{ backgroundColor: '#ddd' }}
              color="primary"
              onClick={() => {
                if (directionMode === 'portrait') setDirectionMode('landscape');
                if (directionMode === 'landscape') setDirectionMode('portrait');
              }}
            >
              <ScreenRotationIcon fontSize="small" />
            </IconButton>
            <p className={classes.portraitText}>轉向</p>
          </div>
        </div>
      </div>
    );
  };

  // Landscape El
  const landscapeScreenEl = () => (
    <Box
      className={
        !isOrientationVertical
          ? classes.slotMachineLandscape
          : `${classes.rotatorHight} ${classes.slotMachineLandscape}`
      }
    >
      <Box className={classes.slotScreenLandscape}>
        {openSnack && (
          <div
            onClick={handleAutoPlay}
            // style={{
            //   backgroundImage: `url(${SnackBarBasicImage})`,
            // }}
            className={classes.snackBarLandscape}
          ></div>
        )}
        <Screen
          setSocketClient={setSocketClient}
          autoPlay={autoPlay}
          setAutoPlay={setAutoPlay}
          leave={leave}
          closeWebRtcConnect={closeWebRtcConnect}
          setCloseWebRtcConnect={setCloseWebRtcConnect}
        />
      </Box>
    </Box>
  );

  const landscapeMinBtnListEl = mainBtn.map(btn => {
    return (
      <div onClick={() => spin(btn.buttonNo)}>
        <SquareButton text={btn.buttonTxt} />
      </div>
    );
  });

  const landscapeOpBtnHandleEl = () => (
    <Box
      className={
        !isOrientationVertical
          ? classes.optionBtnBoxLandscape
          : `${classes.rotatorHight} ${classes.optionBtnBoxLandscape}`
      }
    >
      <div className={classes.iconBox}>
        <LandscapeSubBtnHandle
          isOrientationVertical={isOrientationVertical}
          subBtn={subBtn}
          spin={spin}
          btnStyle={btnStyle}
        />
      </div>

      <div className={classes.iconBox}>
        <IconButton
          aria-label="rotation"
          color="primary"
          onClick={refreshPage}
          classes={classes.icon}
          fontSize="small"
          style={{ backgroundColor: '#ddd' }}
        >
          <BuildIcon fontSize="small" />
        </IconButton>
        <p className={classes.landscapeText}>畫面優化</p>
      </div>

      <div className={classes.iconBox}>
        <OpenPointHandle
          cashIn={cashIn}
          handleChange={handleChange}
          creditLoading={creditLoading}
          credit={credit}
          setAutoGame={setAutoGame}
          landscape
        />
      </div>

      <div>
        <IconButton
          aria-label="rotation"
          style={{ backgroundColor: '#ddd' }}
          color="primary"
          onClick={() => {
            if (directionMode === 'portrait') setDirectionMode('landscape');
            if (directionMode === 'landscape') setDirectionMode('portrait');
          }}
        >
          <ScreenRotationIcon fontSize="small" />
        </IconButton>
        <p className={classes.landscapeText}>轉向</p>
      </div>
    </Box>
  );

  const landscapeManBtnAndNav = () => (
    <Box
      className={
        !isOrientationVertical
          ? classes.mainAndNavBoxLandscape
          : `${classes.rotatorHight} ${classes.mainAndNavBoxLandscape}`
      }
    >
      <div className={classes.navBox}>
        <Nav
          setReviewState={setReviewState}
          snackBarPic={snackBarPic}
          directionMode={directionMode}
        />
      </div>

      <div className={classes.mainBtnHandleLandscape}>
        {landscapeMinBtnListEl}
        <div onClick={() => setAutoGame(!autoGame)}>
          <SquareButton autoGame={autoGame} text={autoGame ? 'STOP' : 'AUTO'} />
        </div>
      </div>
    </Box>
  );

  return (
    <section className={classes.root}>
      {/* Back Drop Loading... */}
      {backDrop()}

      {/* Review */}
      <Review
        machine={mapId}
        leave={leave}
        userReview={userReview}
        token={apiToken}
        selectEgm={selectEgmData}
      />

      {/* 直向 */}
      {directionMode === 'portrait' && (
        <>
          <Headers mapId={mapId} setReviewState={setReviewState} snackBarPic={snackBarPic} />

          <div className={`${classes.slotMachine}`}>
            {/* Screen */}
            {portraitScreenAndSnackEl()}

            {/* Main Button */}
            <div className={classes.mainBtnBox}>{portraitMainBtn()}</div>
          </div>

          {/* option Button */}
          {portraitOpBtnHandleEl()}
        </>
      )}

      {/* 橫向 */}
      {directionMode === 'landscape' && (
        <div className={isOrientationVertical && classes.rotatorEl}>
          <Grid container spacing={0}>
            <Grid item xs>
              {/* option Button */}
              {landscapeOpBtnHandleEl()}
            </Grid>

            <Grid item xs={7}>
              {/* Screen */}
              {landscapeScreenEl()}
            </Grid>

            <Grid item xs={3}>
              {/* Main Button */}
              {landscapeManBtnAndNav()}
            </Grid>
          </Grid>
        </div>
      )}
    </section>
  );
};

export default GamePlay;
