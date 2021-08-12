import ApiController from '../api/apiController';

import { useContext, useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-train-station.css';

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

// Layout
import Headers from '../layout/Headers';

// Style
import classes from './GamePlay.module.scss';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

// Icon
import ScreenRotationIcon from '@material-ui/icons/ScreenRotation';
import AddBoxIcon from '@material-ui/icons/AddBox';
import BuildIcon from '@material-ui/icons/Build';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';

// Image
import moneyImg from '../asset/money.png';
import goldImg from '../asset/gold.jpg';

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
  const { mapId, egmId, egmIp, egmSession, checkSum, casinoToken } = selectEgm;

  const styles = useStyles();

  // Mobile Break Point
  // const matches = useMediaQuery('(max-width:320px)');

  // Router Props
  const history = useHistory();

  // Init State
  const [cashIn, setCashIn] = useState('');
  const [open, setOpen] = useState(false);
  // const [imgObj, setImgObj] = useState();
  const [closeWebRtcConnect, setCloseWebRtcConnect] = useState(false);
  const [socketClient, setSocketClient] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoGame, setAutoGame] = useState(false);
  const [credit, setCredit] = useState(0);
  const [creditLoading, setCreditLoading] = useState(false);
  const [mainBtn, setMainBtn] = useState([]);
  const [subBtn, setSubBtn] = useState([]);
  const [openSnack, setOpenSnack] = useState(true);

  const handleAutoPlay = () => {
    setAutoPlay(true);
    setOpenSnack(false);
  };

  const handleChange = e => {
    setCashIn(e.target.value);
  };

  const leave = async () => {
    setOpen(true);
    setAutoGame(false);
    socketClient.emit('unsubscribe', selectEgm.webNumber);
    setCloseWebRtcConnect(true);
    try {
      const responseData = await ApiController().endGameApi(mapId, egmId, egmIp, apiToken, egmSession);

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
        let responseData = await ApiController().pressSlotApi(mapId, egmId, egmIp, number, apiToken, egmSession);

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

  const pointCash = async cash => {
    if (cashIn === '' || cashIn <= 0) {
      // alert('請輸入投幣點數');
      alert('餘額不足');
      return;
    }
    setCreditLoading(true);
    // console.log(cash, 'cash');
    setCashIn('');
    try {
      let responseData = await ApiController().pointCashCasinoApi(egmSession, checkSum, cash, casinoToken);
      console.log(responseData);
      if (responseData.code > 100000000) {
        setCreditLoading(false);

        alert('ERROR!');
      }

      // 投幣成功
      if (responseData.code === 1) {
      }

      // 閒置時間太長
      if (responseData.code === 100000061) {
        setCloseWebRtcConnect(true);
        alert(responseData.msg);
        localStorage.clear();
        history.replace('/');
      }

      if (responseData.code < 100000000) {
      }
    } catch (error) {
      alert('ERROR message: ', error);
    }

    setTimeout(() => {
      setCreditLoading(false);
    }, 4000);
  };

  // 動態加載圖片
  // const getImg = () => {
  //   if (selectEgm.picName) {
  //     // webPack api 獲取圖片資料夾的上下文，遞歸尋找符合jpg的圖片
  //     const imgContext = require.context('../asset/new', true, /\.jpg$/);
  //     // 過濾符合props給的picName
  //     const imgPath = imgContext.keys().filter(path => path.includes(selectEgm.picName));
  //     // 轉成 es6 import obj
  //     const images = imgPath.map(path => imgContext(path));
  //     // return react 可以用的src obj
  //     if (images[0]) setImgObj(images[0].default);
  //   }
  // };

  // UseEffect
  useEffect(() => {
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
    const btnList = JSON.parse(localStorage.getItem('btnList'));
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
      btnList,
    };
    setApiToken(token);
    setSelectEgm(selectEgm);
    // getImg();

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
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, [autoGame, credit, spin]);

  // useEffect(() => {
  //   getImg();

  //   // eslint-disable-next-line
  // }, [selectEgm]);

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

  useEffect(() => {
    if (btnList.length === 0) {
      const btnList = JSON.parse(localStorage.getItem('btnList'));
      setBtnList(btnList);
    }
    // eslint-disable-next-line
  }, []);

  const mainBtnListEl = mainBtn.map(btn => {
    return (
      <Grid
        item
        xs={3}
        key={btn.buttonNo}
        className={btn.buttonTxt === 'SPIN' ? `${classes.rotatorBtnBox} ${classes.autoBtnGrid}` : classes.rotatorBtnBox}
        onClick={() => spin(btn.buttonNo)}
      >
        <SquareButton text={btn.buttonTxt} />
      </Grid>
    );
  });

  const refreshPage = () => {
    socketClient.emit('refresh', selectEgm.webNumber);
    window.location.reload();
  };

  window.addEventListener('beforeunload', function (e) {
    // Cancel the event
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = 'some text';
  });

  return (
    <section className={classes.root}>
      {/* Back Drop Loading... */}
      <Backdrop className={styles.backdrop} open={open}>
        <CircularProgress color="inherit" />
        <p>結算中...</p>
      </Backdrop>
      <Review machine={selectEgm.mapId} leave={leave} userReview={userReview} token={apiToken} selectEgm={selectEgm} />

      <Headers setReviewState={setReviewState} />

      <div className={classes.slotMachine}>
        <div className={classes.slotScreen}>
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

        {/* SubButton */}
        <div className={classes.mainBtnBox}>
          <Grid className={classes.girdContainer} spacing={0} container>
            <Grid item xs={3} className={`${classes.rotatorBtnBox} ${classes.grid0}`} onClick={() => setAutoGame(!autoGame)}>
              <SquareButton autoGame={autoGame} text={autoGame ? 'STOP' : 'AUTO'} />
            </Grid>
            {mainBtnListEl}
          </Grid>
        </div>
      </div>

      <div className={classes.btnHandle}>
        <div className={classes.marquee}>
          <p>歡迎光臨～～</p>
        </div>

        <div className={classes.optionBtnBox}>
          {/* <div>
            <IconButton aria-label="rotation" style={{ backgroundColor: '#ddd' }} color="primary">
              <MonetizationOnIcon fontSize="small" />
            </IconButton>
            <p style={{ color: 'white' }}>開分</p>
          </div> */}

          <div>
            <OpenPointHandle
              openPoint
              cashIn={cashIn}
              handleChange={handleChange}
              pointCash={pointCash}
              creditLoading={creditLoading}
              credit={credit}
              setAutoGame={setAutoGame}
            />
          </div>

          <div>
            <SubButtonHandle subBtn={subBtn} spin={spin} />
          </div>

          <div>
            <OpenPointHandle
              cashIn={cashIn}
              handleChange={handleChange}
              pointCash={pointCash}
              creditLoading={creditLoading}
              credit={credit}
              setAutoGame={setAutoGame}
            />
          </div>

          {/* <div>
            <IconButton aria-label="rotation" style={{ backgroundColor: '#ddd' }} color="primary">
              <AccountBalanceIcon fontSize="small" onClick={() => setAutoGame(false)} />
            </IconButton>
            <p style={{ color: 'white' }}>查詢餘額</p>
          </div> */}

          <div>
            <IconButton aria-label="rotation" style={{ backgroundColor: '#ddd' }} color="primary" onClick={refreshPage}>
              <BuildIcon fontSize="small" />
            </IconButton>
            <p style={{ color: 'white' }}>畫面優化</p>
          </div>
        </div>

        {/* <div className={classes.box2}>
          <div className={classes.creditBox}>
            <div className={classes.moneyBox}>
              <img className={classes.money} src={moneyImg} alt="money" />
              <span className={classes.span}>CREDIT</span>
            </div>

            {creditLoading ? (
              <div style={{ textAlign: 'center' }}>
                <CircularProgress />
              </div>
            ) : (
              <div className={classes.odometerBox}>
                <Odometer format="(,ddd).dd" value={Number(credit)} />
              </div>
            )}
          </div>

          <div className={classes.inputBox}>
            <div className={classes.goldBox}>
              <img className={classes.gold} src={goldImg} alt="gold" />
              <span className={classes.span}>開分</span>
            </div>
            <div className={classes.inputInnerBox}>
              <input type="number" value={cashIn} onChange={handleChange} placeholder="點數" onWheel={event => event.currentTarget.blur()} />
              <AddBoxIcon className={classes.slotIcon} onClick={() => pointCash(cashIn)} />
            </div>
          </div>
        </div> */}

        {/* <div className={classes.subBtnHandlerBox}>
          <SubButtonHandle subBtn={subBtn} spin={spin} />
        </div> */}
      </div>
    </section>
  );
};

export default GamePlay;
