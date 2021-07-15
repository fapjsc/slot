import ApiController from '../api/apiController';
import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Context
import UserContext from '../context/User/UserContext';

// Components
import Screen from '../Screen';

// Style
import classes from './GamePlay.module.scss';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

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

  // Function
  const handleChange = e => {
    setCashIn(Number(e.target.value));
  };

  const leave = async title => {
    if (window.confirm(title)) {
      setOpen(true);
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

  // window.onbeforeunload = function (event) {
  //   return beforeUnload(event);
  // };

  // const beforeUnload = event => {
  //   event = event ? event : window.event ? window.event : null;
  //   var myIE = getBrowser();
  //   if (myIE === 'IE') {
  //     // IE
  //     const cy = event.clientY || event.target.event.clientY;
  //     const ak = event.altKey || event.target.event.altKey;

  //     if (cy < 0 || ak) {
  //       return '確定要離開本頁面嗎？';
  //     }
  //   } else {
  //     // Firefox、Chrome
  //     const nodeName = event.currentTarget.document.activeElement.nodeName;
  //     if (nodeName !== 'A') {
  //       history.replace('/home');
  //       return '確定要離開本頁面嗎？';
  //     }
  //   }
  // };

  /*** * 獲取當前瀏覽器類型 */
  // const getBrowser = () => {
  //   const userAgent = navigator.userAgent; //取得瀏覽器的userAgent字符串

  //   const isOpera = userAgent.indexOf('Opera') > -1;
  //   if (isOpera) {
  //     //判斷是否Opera瀏覽器
  //     return 'Opera';
  //   }

  //   if (userAgent.indexOf('Firefox') > -1) {
  //     //判斷是否Firefox瀏覽器
  //     return 'FF';
  //   }
  //   if (userAgent.indexOf('Chrome') > -1) {
  //     return 'Chrome';
  //   }
  //   if (userAgent.indexOf('Safari') > -1) {
  //     //判斷是否Safari瀏覽器
  //     return 'Safari';
  //   }
  //   if (userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera) {
  //     //判斷是否IE瀏覽器
  //     return 'IE';
  //   }
  // };

  // UseEffect
  useEffect(() => {
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

      <main className={classes.slotMachine}>
        <div className={classes.slotBanners} style={{ backgroundImage: 'url(' + imgObj + ')' }} />
        <div className={classes.slotScreen}>
          <Screen leave={leave} closeWebRtcConnect={closeWebRtcConnect} setCloseWebRtcConnect={setCloseWebRtcConnect} />
        </div>

        <div className={classes.optionBox}>
          <div className={classes.inputBox}>
            <input value={cashIn} onChange={handleChange} placeholder="點數" />
            <button className={classes.slotButton} onClick={() => pointCash(cashIn)}>
              投幣
            </button>
          </div>
          <div className={classes.btnBox}>
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
          </div>
        </div>
      </main>
    </section>
  );
};

const accountBtn = {
  backgroundColor: '#ebdada',
  borderColor: '#a49898',
  boxShadow: '0 6px #816060',
  color: '#a2798f',
};

const spinBtn = {
  backgroundColor: '#0d6349',
  color: 'azure',
  borderColor: '#81f722',
  boxShadow: '0px 8px #05271d',
};

const maxBtn = {
  backgroundColor: '#042a5f',
  color: 'rgb(255, 240, 240)',
  borderColor: '#9aa9bf',
  boxShadow: '0 7px #02152f',
};

const autoBtn = {
  backgroundColor: '#e01313',
  color: 'azure',
  borderColor: '#f8cfcf',
  boxShadow: '0 8px #430505',
};

export default GamePlay;
