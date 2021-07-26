import ApiController from '../api/apiController';
import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-train-station.css';

// Context
import UserContext from '../context/User/UserContext';

// Components
import Screen from '../Screen';
import TheButton from '../components/UI/TheButton';
import LeaveButton from '../components/UI/LeaveButton';
import Review from '../components/review/Review';

// Media Query
import useMediaQuery from '@material-ui/core/useMediaQuery';

// Style
import classes from './GamePlay.module.scss';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import AddBoxIcon from '@material-ui/icons/AddBox';

// Image
import moneyImg from '../asset/money.png';
import goldImg from '../asset/gold.png';

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
  const { apiToken, selectEgm, setApiToken, setSelectEgm, setBtnList, btnList, kickList, removeKickItem, egmCreditList, setReviewState, userReview } = userContext;
  const { mapId, egmId, egmIp, egmSession, checkSum, casinoToken } = selectEgm;

  const styles = useStyles();

  // Mobile Break Point
  const matches = useMediaQuery('(max-width:320px)');

  // Router Props
  const history = useHistory();

  // Init State
  const [cashIn, setCashIn] = useState('');
  const [open, setOpen] = useState(false);
  const [imgObj, setImgObj] = useState();
  const [closeWebRtcConnect, setCloseWebRtcConnect] = useState(false);
  const [socketClient, setSocketClient] = useState(null);
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoGame, setAutoGame] = useState(false);
  const [credit, setCredit] = useState(0);
  const [creditLoading, setCreditLoading] = useState(false);
  const [mainBtn, setMainBtn] = useState([]);
  const [subBtn, setSubBtn] = useState([]);
  const [state, setState] = useState({
    openSnackbar: true,
    Transition: Fade,
  });

  // Function
  const handleClose = () => {
    setState({
      ...state,
      openSnackbar: false,
    });
  };

  const handleAutoPlay = () => {
    setAutoPlay(true);
    handleClose();
  };

  const handleChange = e => {
    setCashIn(e.target.value);
  };

  // const leave = async title => {
  //   if (window.confirm(title)) {
  //     setOpen(true);
  //     setAutoGame(false);
  //     socketClient.emit('unsubscribe', selectEgm.webNumber);
  //     setCloseWebRtcConnect(true);
  //     try {
  //       const responseData = await ApiController().endGameApi(mapId, egmId, egmIp, apiToken, egmSession);

  //       if (responseData.code > 100000000) {
  //         alert(responseData.msg);
  //         setOpen(false);
  //       }

  //       if (responseData.code === 6 || responseData.code === 5) {
  //         history.replace('/home');
  //         setOpen(false);
  //       }
  //     } catch (error) {
  //       alert('ERROR message: ', error);
  //       setOpen(false);
  //     }
  //   }
  // };

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

  const spin = async number => {
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
  };

  const pointCash = async cash => {
    if (cashIn === '' || cashIn <= 0) {
      alert('請輸入投幣點數');
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
    }, 3000);
  };

  // 動態加載圖片
  const getImg = () => {
    if (selectEgm.picName) {
      // webPack api 獲取圖片資料夾的上下文，遞歸尋找符合jpg的圖片
      const imgContext = require.context('../asset/new', true, /\.jpg$/);
      // 過濾符合props給的picName
      const imgPath = imgContext.keys().filter(path => path.includes(selectEgm.picName));
      // 轉成 es6 import obj
      const images = imgPath.map(path => imgContext(path));
      // return react 可以用的src obj
      if (images[0]) setImgObj(images[0].default);
    }
  };

  // UseEffect
  useEffect(() => {
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
    getImg();

    return () => {
      // setSelectEgm({});
      // localStorage.removeItem('egmSession');
      // localStorage.removeItem('checkSum');
      // localStorage.removeItem('btnList');
      // setBtnList([]);
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
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [autoGame, credit]);

  useEffect(() => {
    getImg();

    // eslint-disable-next-line
  }, [selectEgm]);

  useEffect(() => {
    if (btnList.length === 0) {
      const btnList = JSON.parse(localStorage.getItem('btnList'));
      setBtnList(btnList);
    }
    let mainBtnTemp = [];
    let subBtnTemp = [];
    btnList.forEach(btn => {
      if (btn.buttonNo === 77 || btn.buttonNo === 99) {
        mainBtnTemp.push(btn);
      } else {
        subBtnTemp.push(btn);
      }
    });

    setMainBtn(mainBtnTemp);
    setSubBtn(subBtnTemp.reverse());

    // eslint-disable-next-line
  }, [btnList]);

  const mainBtnListEl = mainBtn.map(btn => {
    return (
      <Grid item xs={4} key={btn.buttonNo} className={classes.btnBox} onClick={() => spin(btn.buttonNo)}>
        <TheButton text={btn.buttonTxt} />
      </Grid>
    );
  });

  const subBtnListEl = subBtn.map(btn => {
    switch (btn.buttonTxt) {
      case '1-1':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.credit1}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '1-2':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.credit3}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '1-3':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.credit7}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '1-4':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.credit15}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case '1-5':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.credit25}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case 'Bet1':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.bet1}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case 'Bet2':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.bet2}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case 'Bet5':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.bet5}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case 'Bet10':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.bet10}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      case 'Bet15':
        return (
          <div className={`${classes.subBtnBox}`}>
            <button className={`${classes.subBtn} ${classes.bet15}`} onClick={() => spin(btn.buttonNo)} />
          </div>
        );

      default:
        return <button style={{ fontSize: '5px' }}>no button </button>;
    }
  });

  return (
    <section className={classes.root}>
      {/* Back Drop Loading... */}
      <Backdrop className={styles.backdrop} open={open}>
        <CircularProgress color="inherit" />
        <p>結算中...</p>
      </Backdrop>

      <Review machine={selectEgm.mapId} leave={leave} userReview={userReview} token={apiToken} selectEgm={selectEgm} />

      <div className={classes.slotMachine}>
        <div className={classes.slotBanners} style={{ backgroundImage: 'url(' + imgObj + ')' }} />

        <div className={classes.slotScreen}>
          <Screen setSocketClient={setSocketClient} autoPlay={autoPlay} setAutoPlay={setAutoPlay} leave={leave} closeWebRtcConnect={closeWebRtcConnect} setCloseWebRtcConnect={setCloseWebRtcConnect} />
          <Snackbar
            ContentProps={{
              classes: {
                root: styles.snackbarRoot,
                message: styles.snackbarMessage,
              },
            }}
            onClick={handleAutoPlay}
            open={state.openSnackbar}
            onClose={handleClose}
            TransitionComponent={state.Transition}
            message="點擊此處後開始遊戲"
            key={state.Transition.name}
          />
        </div>
        {/* 
        <div className={classes.optionBox}>
          <div className={classes.creditBox}>
            <Fragment>
              <div className={classes.moneyBox}>
                <img className={classes.money} src={moneyImg} alt="money" />
              </div>
              {creditLoading ? (
                <Fragment>
                  <CircularProgress />
                  <p>開分中，請稍候...</p>
                </Fragment>
              ) : (
                <Odometer className={classes.odometer} format="(,ddd).dd" value={Number(credit)} />
              )}
            </Fragment>
          </div>

          <div className={classes.inputBox}>
            <div className={classes.goldBox}>
              <img className={classes.gold} src={goldImg} alt="gold" />
            </div>
            <input type="number" value={cashIn} onChange={handleChange} placeholder="點數" onWheel={event => event.currentTarget.blur()} />
            <div className={classes.slotBtnBox} onClick={() => pointCash(cashIn)}>
            </div>
          </div>
        </div> */}

        <div className={classes.optionBox}>{subBtnListEl}</div>
      </div>

      <div className={classes.btnHandle}>
        <div className={classes.box1}>
          <Grid container spacing={matches ? 1 : 3}>
            {mainBtnListEl}
            <Grid item xs={4} className={classes.btnBox} onClick={() => setAutoGame(!autoGame)}>
              <TheButton autoGame={autoGame} text={autoGame ? 'STOP' : 'AUTO'} />
            </Grid>
          </Grid>
        </div>

        <div className={classes.box2}>
          {/* Credit */}
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

          {/* input */}
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
        </div>
      </div>

      <div className={`${classes.leaveBtnBox}`} onClick={() => setReviewState(true)}>
        <LeaveButton />
      </div>
    </section>
  );
};

export default GamePlay;
