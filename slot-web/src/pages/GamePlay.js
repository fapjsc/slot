import ApiController from '../api/apiController';
import { useContext, useState, useEffect, Fragment } from 'react';
import { useHistory } from 'react-router-dom';

// Context
import UserContext from '../context/User/UserContext';

// Components
import Screen from '../Screen';
import TheButton from '../components/UI/TheButton';
import SlotButton from '../components/UI/SlotButton';
import LeaveButton from '../components/UI/LeaveButton';

// Style
import classes from './GamePlay.module.scss';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';

// Material Style
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const GamePlay = () => {
  // User Context
  const userContext = useContext(UserContext);
  const { apiToken, selectEgm, setApiToken, setSelectEgm, setBtnList, btnList, kickList, removeKickItem } = userContext;
  const { mapId, egmId, egmIp, egmSession, checkSum, casinoToken } = selectEgm;

  const styles = useStyles();

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

  const leave = async title => {
    if (window.confirm(title)) {
      setAutoGame(false);
      setOpen(true);
      socketClient.emit('unsubscribe', selectEgm.webNumber);
      setCloseWebRtcConnect(true);
      try {
        let responseData = await ApiController().endGameApi(mapId, egmId, egmIp, apiToken, egmSession);
        // console.log(mapId, egmId, egmIp, egmSession);
        // console.log(responseData);

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
    }
  };

  const spin = async number => {
    console.log('call spin');
    try {
      let responseData = await ApiController().pressSlotApi(mapId, egmId, egmIp, number, apiToken, egmSession);
      if (responseData.code > 100000000) {
        alert('ERROR!');
      }
      if (responseData.code < 100000000) {
        // console.log(responseData);
      }
    } catch (error) {
      alert('ERROR message: ', error);
    }
  };

  const pointCash = async cash => {
    // console.log(cash, 'cash');
    try {
      let responseData = await ApiController().pointCashCasinoApi(egmSession, checkSum, cash, casinoToken);
      // console.log(responseData);
      if (responseData.code > 100000000) {
        alert('ERROR!');
      }
      if (responseData.code < 100000000) {
        // console.log(responseData);
      }
    } catch (error) {
      alert('ERROR message: ', error);
    }
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
    if (!kickList.length) return;

    kickList.forEach(el => {
      // console.log(el);
      if (String(el.egm) === selectEgm.egmSession && String(el.token) === apiToken) {
        removeKickItem(el);
        alert('閒置時間超過三分鐘，請重新登入');
        history.replace('/');
        localStorage.clear();
      }
    });
  }, [kickList]);

  useEffect(() => {
    if (!autoGame) return;
    spin(77);
    let timer = setInterval(() => {
      spin(77);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, [autoGame]);

  useEffect(() => {
    getImg();

    // eslint-disable-next-line
  }, [selectEgm]);

  useEffect(() => {
    if (btnList.length === 0) {
      const btnList = JSON.parse(localStorage.getItem('btnList'));
      setBtnList(btnList);
    }
    // eslint-disable-next-line
  }, [btnList]);

  const btnListEl = btnList.map(btn => (
    <Fragment>
      <div className={classes.btnBox} onClick={() => spin(btn.buttonNo)}>
        <TheButton text={btn.buttonTxt} />
      </div>
    </Fragment>
  ));

  let autoBtnStyle;
  if (!autoGame) {
    autoBtnStyle = `${classes.btnBox}`;
  } else {
    autoBtnStyle = `${classes.btnBox} ${classes.test}`;
  }

  return (
    <section className={classes.root}>
      {/* Back Drop Loading... */}
      <Backdrop className={styles.backdrop} open={open}>
        <CircularProgress color="inherit" />
        <p>結算中...</p>
      </Backdrop>

      <div className={classes.slotMachine}>
        <div className={classes.slotBanners} style={{ backgroundImage: 'url(' + imgObj + ')' }} />

        <div className={classes.slotScreen}>
          <Screen setSocketClient={setSocketClient} autoPlay={autoPlay} setAutoPlay={setAutoPlay} leave={leave} closeWebRtcConnect={closeWebRtcConnect} setCloseWebRtcConnect={setCloseWebRtcConnect} />
          <div>
            <Snackbar onClick={handleAutoPlay} open={state.openSnackbar} onClose={handleClose} TransitionComponent={state.Transition} message="點擊此處後開使遊戲" key={state.Transition.name} />
          </div>
        </div>

        <div className={classes.optionBox}>
          <div className={classes.inputBox}>
            <input type="number" value={cashIn} onChange={handleChange} placeholder="點數" onWheel={event => event.currentTarget.blur()} />

            <div className={classes.slotBtnBox} onClick={() => pointCash(cashIn)}>
              <SlotButton />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.btnHandle}>
        <div className={`${classes.leaveBtnBox}`} onClick={() => leave('確定要離開嗎？')}>
          <LeaveButton />
        </div>

        {btnListEl}

        <div className={autoBtnStyle} onClick={() => setAutoGame(!autoGame)}>
          <TheButton text={autoGame ? 'STOP' : 'AUTO'} />
        </div>
      </div>
    </section>
  );
};

export default GamePlay;
