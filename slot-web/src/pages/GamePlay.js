import ApiController from '../api/apiController';

import { useContext, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Context
import UserContext from '../context/User/UserContext';

// Api
import { wsUri } from '../api/config';

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

const GamePlay = () => {
  // User Context
  const userContext = useContext(UserContext);
  const {
    apiToken,
    selectEgm,
    setApiToken,
    setSelectEgm,
    setBtnList,
    btnList,
    kickList,
    removeKickItem,
    egmCreditList,
    setReviewState,
    userReview,
    wsClient,
    webSocketHandler,
  } = userContext;

  const { mapId, egmId, egmIp, egmSession } = selectEgm;

  const styles = useStyles();

  // Router Props
  const history = useHistory();

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

  const [isOrientationVertical, setIsOrientationVertical] = useState(
    window.innerHeight > window.innerWidth
  );
  // const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  // const [innerHeight, setinnerHeight] = useState(window.innerHeight);

  const reportWindowSize = () => {
    // console.log(isOrientationVertical);
    // console.log(window.innerHeight);
    // console.log(window.innerWidth);
    if (window.innerHeight > window.innerWidth) setIsOrientationVertical(true);
    if (window.innerHeight < window.innerWidth) setIsOrientationVertical(false);
    // let heightOutput = window.innerHeight;
    // let widthOutput = window.innerWidth;
    // setIsOrientationVertical(heightOutput > widthOutput);
    // setInnerWidth(widthOutput);
    // setinnerHeight(heightOutput);
    // console.log('reportWindowSize: ', 'width:', widthOutput, 'xheight: ', heightOutput);
  };

  const handleAutoPlay = () => {
    setAutoPlay(true);
    setOpenSnack(false);
  };

  const handleChange = e => {
    setCashIn(e.target.value);
  };

  const refreshPage = () => {
    socketClient.emit('refresh', selectEgm.webNumber);
    socketClient.on('clientReload', () => {
      console.log('client reload ==========');
      window.location.reload();
    });
  };

  const leave = async () => {
    setOpen(true);
    setAutoGame(false);
    socketClient.emit('unsubscribe', selectEgm.webNumber);
    setCloseWebRtcConnect(true);
    try {
      const responseData = await ApiController().endGameApi(
        mapId,
        egmId,
        egmIp,
        apiToken,
        egmSession
      );

      if (responseData.code > 100000000) {
        alert(responseData.msg);
        setOpen(false);
      }

      if (responseData.code === 6 || responseData.code === 5) {
        history.replace('/home');
        setOpen(false);
      }
    } catch (error) {
      alert('ERROR message: ', error);
      setOpen(false);
    }
  };

  const spin = useCallback(
    async number => {
      console.log('call spin');
      if (!credit || credit === '' || credit <= 50) {
        setAutoGame(false);
        alert('credit 不足');
        return;
      }
      try {
        let responseData = await ApiController().pressSlotApi(
          mapId,
          egmId,
          egmIp,
          number,
          apiToken,
          egmSession
        );

        // 閒置時間太長
        if (responseData.code === 100000061) {
          setCloseWebRtcConnect(true);
          alert(responseData.msg);
          localStorage.clear();
          history.replace('/');
        }

        if (responseData.code > 100000000) {
          console.log('ERROR!');
        }
        if (responseData.code < 100000000) {
          // console.log(responseData);
        }
      } catch (error) {
        console.log('ERROR message: ', error);
      }
    },
    [mapId, egmId, egmIp, apiToken, egmSession, credit, history]
  );

  // const pointCash = async cash => {
  //   if (cashIn === '' || cashIn <= 0) {
  //     // alert('請輸入投幣點數');
  //     alert('餘額不足');
  //     return;
  //   }
  //   setCreditLoading(true);
  //   // console.log(cash, 'cash');
  //   setCashIn('');
  //   try {
  //     let responseData = await ApiController().pointCashCasinoApi(egmSession, checkSum, cash, casinoToken);
  //     console.log(responseData);
  //     if (responseData.code > 100000000) {
  //       setCreditLoading(false);

  //       alert('ERROR!');
  //     }

  //     // 投幣成功
  //     if (responseData.code === 1) {
  //     }

  //     // 閒置時間太長
  //     if (responseData.code === 100000061) {
  //       setCloseWebRtcConnect(true);
  //       alert(responseData.msg);
  //       localStorage.clear();
  //       history.replace('/');
  //     }

  //     if (responseData.code < 100000000) {
  //     }
  //   } catch (error) {
  //     alert('ERROR message: ', error);
  //   }

  //   setTimeout(() => {
  //     setCreditLoading(false);
  //   }, 4000);
  // };

  // UseEffect
  useEffect(() => {
    if (!btnList.length) {
      const btnList = JSON.parse(localStorage.getItem('btnList'));
      setBtnList(btnList);
    }
    if (!wsClient) {
      const egmStateWebSocketUri = `${wsUri}stateQuote`;
      webSocketHandler(egmStateWebSocketUri);
    }
    window.scrollTo(0, 0);
    const token = localStorage.getItem('token');
    const casinoToken = localStorage.getItem('casinoToken');
    const egmId = Number(localStorage.getItem('egmId'));
    const egmIp = localStorage.getItem('egmIp');
    const mapId = Number(localStorage.getItem('mapId'));
    const cameraId = localStorage.getItem('cameraId');
    const audioId = localStorage.getItem('audioId');
    const picName = localStorage.getItem('picName');
    const egmSession = localStorage.getItem('egmSession');
    const checkSum = localStorage.getItem('checkSum');
    const webNumber = localStorage.getItem('webNumber');
    // const btnList = JSON.parse(localStorage.getItem('btnList'));
    const selectEgm = {
      egmId,
      egmIp,
      mapId,
      cameraId,
      audioId,
      picName,
      egmSession,
      checkSum,
      casinoToken,
      webNumber,
      // btnList,
    };
    setApiToken(token);
    setSelectEgm(selectEgm);

    // 即將棄用
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/orientationchange_event
    // window.addEventListener('orientationchange', e => {
    //   console.log(e.target.screen.orientation.angle);
    //   if (e.target.screen.orientation.angle === 0) setDirectionMode('portrait');
    //   if (e.target.screen.orientation.angle === 90) setDirectionMode('landscape');
    // });

    // 實驗中的功能
    // https://developer.mozilla.org/zh-TW/docs/Web/API/Screen/orientation
    // if (window.screen) {
    //   window.screen.orientation.addEventListener('change', function (e) {
    //     if (e.currentTarget.type === 'landscape-primary') {
    //       // landscape mode => angle 0
    //       console.log('landscape');
    //       setDirectionMode('landscape');
    //     } else if (e.currentTarget.type === 'portrait-primary') {
    //       // portrait mode => angle 0
    //       console.log('portrait');
    //       setDirectionMode('portrait');
    //     }
    //   });
    // }

    window.addEventListener('resize', () => reportWindowSize());

    window.addEventListener('beforeunload', function (e) {
      // Cancel the event
      e.preventDefault();
      // Chrome requires returnValue to be set
      e.returnValue = 'some text';
    });

    return () => {
      window.removeEventListener('resize', reportWindowSize);
      // window.removeEventListen('change');
      // window.removeEventListen('beforeunload');
      // window.removeEventListen('orientationchange');
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!egmCreditList.length) return;
    let credit = egmCreditList.find(el => Number(el.map) === selectEgm.mapId);

    if (!credit) return;
    setCredit(credit.credit);
  }, [egmCreditList, selectEgm]);

  useEffect(() => {
    if (!kickList.length) return;

    kickList.forEach(el => {
      if (String(el.egm) === selectEgm.egmSession && String(el.token) === apiToken) {
        setCloseWebRtcConnect(true);
        removeKickItem(el);
        alert('閒置時間超過三分鐘，請重新登入');
        localStorage.clear();
        history.replace('/');
      }
    });
  }, [kickList, selectEgm, apiToken, removeKickItem, history]);

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

  useEffect(() => {
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
    setSubBtn(subBtnTemp.reverse());
  }, [btnList]);

  //==== Render Elements
  const mainBtnListEl = mainBtn.map(btn => {
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

  const mainBtnListLandscapeEl = mainBtn.map(btn => {
    return (
      <div onClick={() => spin(btn.buttonNo)}>
        <SquareButton text={btn.buttonTxt} />
      </div>
    );
  });

  const portraitBtnHandleEl = () => {
    return (
      <div className={classes.btnHandle}>
        {/* 跑馬燈 */}
        <div className={classes.marquee}>
          <p>歡迎光臨～～</p>
        </div>

        <div className={classes.optionBtnBox}>
          {/* <div>
            <OpenPointHandle
              openPoint
              cashIn={cashIn}
              handleChange={handleChange}
              pointCash={pointCash}
              creditLoading={creditLoading}
              credit={credit}
              setAutoGame={setAutoGame}
            />
          </div> */}

          <div>
            <SubButtonHandle subBtn={subBtn} spin={spin} />
          </div>

          <div>
            <OpenPointHandle
              cashIn={cashIn}
              handleChange={handleChange}
              // pointCash={pointCash}
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

  return (
    <section className={classes.root}>
      {/* Back Drop Loading... */}
      <Backdrop className={styles.backdrop} open={open}>
        <div>
          <div style={{ textAlign: 'center' }}>
            <CircularProgress color="inherit" />
          </div>
          <p>結算中，請稍候...</p>
        </div>
      </Backdrop>
      <Review
        machine={selectEgm.mapId}
        leave={leave}
        userReview={userReview}
        token={apiToken}
        selectEgm={selectEgm}
      />

      {/* 直向 */}
      {directionMode === 'portrait' && (
        <>
          <Headers setReviewState={setReviewState} />
          <div className={`${classes.slotMachine}`}>
            <div className={`${classes.slotScreen}`}>
              <Screen
                setSocketClient={setSocketClient}
                autoPlay={autoPlay}
                setAutoPlay={setAutoPlay}
                leave={leave}
                closeWebRtcConnect={closeWebRtcConnect}
                setCloseWebRtcConnect={setCloseWebRtcConnect}
              />

              {openSnack && <div onClick={handleAutoPlay} className={classes.snackBar}></div>}
            </div>

            {/* Main Button */}
            <div className={classes.mainBtnBox}>
              <Grid className={classes.girdContainer} spacing={0} container>
                <Grid
                  item
                  xs={3}
                  className={`${classes.rotatorBtnBox} ${classes.grid0}`}
                  onClick={() => setAutoGame(!autoGame)}
                >
                  <SquareButton autoGame={autoGame} text={autoGame ? 'STOP' : 'AUTO'} />
                </Grid>
                {mainBtnListEl}
              </Grid>
            </div>
          </div>
          {portraitBtnHandleEl()}
        </>
      )}

      {/* 橫向 */}
      {directionMode === 'landscape' && (
        <div className={isOrientationVertical && classes.rotatorEl}>
          <Grid container spacing={0}>
            <Grid item xs>
              <Box
                className={
                  !isOrientationVertical
                    ? classes.optionBtnBoxLandscape
                    : `${classes.rotatorHight} ${classes.optionBtnBoxLandscape}`
                }
              >
                <div className={classes.iconBox}>
                  <LandscapeSubBtnHandle subBtn={subBtn} spin={spin} />
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
                    // pointCash={pointCash}
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
            </Grid>

            <Grid item xs={7}>
              <Box
                className={
                  !isOrientationVertical
                    ? classes.slotMachineLandscape
                    : `${classes.rotatorHight} ${classes.slotMachineLandscape}`
                }
              >
                <Box className={classes.slotScreenLandscape}>
                  {/* <div onClick={handleAutoPlay} className={classes.snackBarLandscape}></div> */}
                  {openSnack && (
                    <div onClick={handleAutoPlay} className={classes.snackBarLandscape}></div>
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
            </Grid>

            <Grid item xs={3}>
              <Box
                className={
                  !isOrientationVertical
                    ? classes.mainAndNavBoxLandscape
                    : `${classes.rotatorHight} ${classes.mainAndNavBoxLandscape}`
                }
              >
                <div className={classes.navBox}>
                  <Nav setReviewState={setReviewState} />
                </div>

                <div className={classes.mainBtnHandleLandscape}>
                  {mainBtnListLandscapeEl}
                  <div onClick={() => setAutoGame(!autoGame)}>
                    <SquareButton autoGame={autoGame} text={autoGame ? 'STOP' : 'AUTO'} />
                  </div>
                </div>
              </Box>
            </Grid>
          </Grid>
        </div>
      )}
    </section>
  );
};

export default GamePlay;
