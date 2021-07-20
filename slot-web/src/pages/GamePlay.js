import ApiController from '../api/apiController';
import { useContext, useState, useEffect } from 'react';
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
  const { apiToken, selectEgm, setApiToken, setSelectEgm } = userContext;
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
  const [stopAutoGame, setStopAutoGame] = useState(false);
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
    console.log('test');
    if (window.confirm(title)) {
      setOpen(true);
      socketClient.emit('unsubscribe', selectEgm.webNumber);
      setCloseWebRtcConnect(true);
      try {
        let responseData = await ApiController().endGameApi(mapId, egmId, egmIp, apiToken, egmSession);
        console.log(mapId, egmId, egmIp, egmSession);
        console.log(responseData);

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

  const spin = async () => {
    console.log('call spin');
    try {
      let responseData = await ApiController().pressSlotApi(mapId, egmId, egmIp, 77, apiToken, egmSession);
      if (responseData.code > 100000000) {
        alert('ERROR!');
      }
      if (responseData.code < 100000000) {
        console.log(responseData);
      }
    } catch (error) {
      alert('ERROR message: ', error);
    }
  };

  const pointCash = async cash => {
    console.log(cash, 'cash');
    try {
      let responseData = await ApiController().pointCashCasinoApi(egmSession, checkSum, cash, casinoToken);
      console.log(responseData);
      if (responseData.code > 100000000) {
        alert('ERROR!');
      }
      if (responseData.code < 100000000) {
        console.log(responseData);
      }
    } catch (error) {
      alert('ERROR message: ', error);
    }
  };

  const maxBet = async () => {};

  const handleAutoClick = type => {
    if ('auto') {
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
    };
    setApiToken(token);
    setSelectEgm(selectEgm);
    getImg();

    return () => {
      // setSelectEgm({});
      localStorage.removeItem('egmSession');
      localStorage.removeItem('checkSum');
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getImg();
    // eslint-disable-next-line
  }, [selectEgm]);

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
          {/* <div className={classes.btnBox}>
            <button className={classes.btn} style={accountBtn} onClick={() => leave('確定要離開嗎？')}>
              結算
            </button>

            <button className={classes.btn} style={maxBtn} onClick={maxBet}>
              MAX
            </button>
            <button className={classes.btn} style={autoBtn}>
              AUTO
            </button>
            <button className={classes.btn} style={spinBtn} onClick={spin}>
              SPIN
            </button>
          </div> */}
        </div>
      </div>
      <div className={classes.btnHandle}>
        <div className={classes.btnBox}>
          <TheButton text="AUTO" />
        </div>

        <div className={classes.btnBox}>
          <TheButton text="MAX" />
        </div>
        <div className={classes.btnBox} onClick={spin}>
          <TheButton text="SPIN" />
        </div>

        <div className={`${classes.leaveBtnBox}`} onClick={() => leave('確定要離開嗎？')}>
          <LeaveButton />
        </div>
      </div>
    </section>
  );
};

// const accountBtn = {
//   backgroundColor: '#ebdada',
//   borderColor: '#a49898',
//   boxShadow: '0 6px #816060',
//   color: '#a2798f',
// };

// const spinBtn = {
//   backgroundColor: '#0d6349',
//   color: 'azure',
//   borderColor: '#81f722',
//   boxShadow: '0px 8px #05271d',
// };

// const maxBtn = {
//   backgroundColor: '#042a5f',
//   color: 'rgb(255, 240, 240)',
//   borderColor: '#9aa9bf',
//   boxShadow: '0 7px #02152f',
// };

// const autoBtn = {
//   backgroundColor: '#e01313',
//   color: 'azure',
//   borderColor: '#f8cfcf',
//   boxShadow: '0 8px #430505',
// };

export default GamePlay;
