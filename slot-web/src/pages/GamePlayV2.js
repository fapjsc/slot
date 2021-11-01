import { useState, useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

// Chat Socket
import { connectChatSocket } from '../lib/chatSocket';

// Hooks
import useHttp from '../hooks/useHttp';

// Api
import { getCurrentEgm, endGame, playerFeebBack, getPlayerInfo } from '../lib/api';

// Toast
import { toast } from 'react-toastify';

// Utils
import { _remoteLocalStorageItem, _getLocalStorageItem } from '../utils/helper';

// Components
import GamePlaySideBar from './demo/GamePlaySideBar';
import DragVideo from './demo/DragVideo';
import CustomFeedBack from '../pages/demo/CustomFeedBack';
// import SubBtnHolder from '../components/button/sub/SubBtnHolder';

// Widgets
import MachineWidget from '../components/widget/MachineWidget';
import ChatWidget from '../components/widget/ChatWidget';
// import ButtonWidget from '../components/widget/ButtonWidget';

// Images
import HeaderBackImg from '../asset/v2/header.jpg';

// Style
import classes from './GamePlayV2.module.scss';

// Suit
import { Loader } from 'rsuite';

let streamList = [];

const GamePlayV2 = ({ history }) => {
  const [rotate, setRotate] = useState(false);
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [chatWidgetOpen, setChatWidgetOpen] = useState(false);
  const [btnWidgetOpen, setBtnWidgetOpen] = useState(false);
  const [customFeedBackOpen, setCustomFeedBackOpen] = useState(false);

  // Redux store
  const { selectEgmData } = useSelector(state => state.egm);

  // HTTP
  // Get Current Egm
  const {
    data: getCurrentEgmData,
    status: getCurrentEgmStatus,
    error: getCurrentEgmError,
    sendRequest: getCurrentEgmRequest,
  } = useHttp(getCurrentEgm);

  // Get Player Info
  const {
    status: getPlayerInfoStatus,
    error: getPlayerInfoError,
    // data: playerInfo,
    sendRequest: getPlayerInfoRequest,
  } = useHttp(getPlayerInfo);

  // Custom Feedback
  const {
    status: playerFeedBackStatus,
    error: playerFeedBackError,
    // data: playerReviewData,
    sendRequest: sendPlayerFeedBackRequest,
  } = useHttp(playerFeebBack);

  // End Game
  const {
    data: endGameData,
    status: endGameStatus,
    error: endGameError,
    sendRequest: endGameRequest,
  } = useHttp(endGame);

  // 偵測手機轉向
  useEffect(() => {
    window.addEventListener('resize', () => {
      reportWindowSize();
    });

    // Resize helper
    const reportWindowSize = () => {
      if (window.innerHeight > window.innerWidth) setRotate(false); // 直向
      if (window.innerHeight < window.innerWidth) setRotate(true); // 橫向
    };

    // 偵測手機鍵盤是否彈出,主要是android手機會因為鍵盤彈出而改變螢幕尺寸,進而觸發resize event,導致版面跑版
    if (window.screen.height > window.innerHeight + window.screen.height * 0.3) {
      window.removeEventListener('resize', null);
    }

    reportWindowSize();

    return () => {
      window.removeEventListener('resize', null);
    };
  }, []);

  // Connect to chat socket
  useEffect(() => {
    connectChatSocket();
  }, []);

  // FeedBack Request Listen
  useEffect(() => {
    if (playerFeedBackStatus === 'completed' && !playerFeedBackError) {
      toast.success('您的建議已經送出');
      const endGameReqData = _getLocalStorageItem('endGame');
      endGameRequest(endGameReqData);
    }
  }, [endGameRequest, playerFeedBackError, playerFeedBackStatus]);

  // End Game Request Listen
  useEffect(() => {
    if (endGameStatus === 'completed' && !endGameError) {
      history.replace('/home');
      _remoteLocalStorageItem('endGame');
      toast.success('結算成功');
    }
  }, [endGameData, endGameStatus, endGameError, history]);

  // Get Stream
  useEffect(() => {
    if (selectEgmData && selectEgmData.gameStream) {
      streamList.push(selectEgmData.gameStream);
    }
  }, [selectEgmData]);

  // Error Listen
  useEffect(() => {
    if (getCurrentEgmError) toast.error(getCurrentEgmError);
    if (getPlayerInfoError) toast.error(getPlayerInfoError);
    if (playerFeedBackError) toast.error(playerFeedBackError);
    if (endGameError) toast.error(endGameError);
  }, [playerFeedBackError, getPlayerInfoError, getCurrentEgmError, endGameError]);

  //==== Window Event====//
  // user重整網頁時重新獲取player info and current egm data
  window.onload = event => {
    const getCurrentEgmReqData = _getLocalStorageItem('getCurrentEgm');
    const getPlayerInfoReqData = _getLocalStorageItem('getPlayerInfo');
    getCurrentEgmRequest(getCurrentEgmReqData);
    getPlayerInfoRequest(getPlayerInfoReqData);
  };

  //==== JSX ====//
  const beforeVideoLoad = (
    <div
      style={{
        height: rotate ? window.innerHeight : window.innerHeight / 2,
        width: rotate ? window.innerWidth / 2 : window.innerWidth,
        backgroundColor: 'black',
      }}
    />
  );

  return (
    <section className={classes.container}>
      {/* Loading... */}
      {getPlayerInfoStatus === 'pending' ||
        getCurrentEgmStatus === 'pending' ||
        (endGameStatus === 'pending' && (
          <Loader size="md" inverse style={loaderStyle} backdrop content="Loading..." vertical />
        ))}

      {/* Custom FeedBacd */}
      <CustomFeedBack
        open={customFeedBackOpen}
        handleClose={() => setCustomFeedBackOpen(false)}
        selectEgm={selectEgmData}
        sendPlayerFeedBackRequest={sendPlayerFeedBackRequest}
        endGameRequest={endGameRequest}
      />

      {/* Machine Header */}
      <div
        style={{
          backgroundImage: `url(${HeaderBackImg})`,
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          height: '6%',
          width: '100vw',
        }}
      />

      {/* Media Stream */}
      <div>
        {streamList.length === 0 && beforeVideoLoad}
        {streamList.length > 0 && (
          <DragVideo rotate={rotate} urlList={streamList} btnWidgetOpen={btnWidgetOpen} />
        )}
      </div>

      {/* Side Bar */}
      <div className={classes.sideBarBox}>
        <GamePlaySideBar
          sideBarOpen={sideBarOpen}
          chatOpen={chatWidgetOpen}
          btnOpen={btnWidgetOpen}
          setSideBarOpen={setSideBarOpen}
          setChatOpen={setChatWidgetOpen}
          setBtnOpen={setBtnWidgetOpen}
          setCustomFeedBackOpen={setCustomFeedBackOpen}
        />
      </div>

      {/* Widgets */}
      {/* Machine Bottom */}
      {getCurrentEgmStatus === 'completed' && (
        <>
          <MachineWidget
            open={true}
            placement="bottom"
            height="48%"
            machineName={getCurrentEgmData && getCurrentEgmData.btnStyle}
            // machineName="Aruze"
          />

          {/* <SubBtnHolder /> */}
        </>
      )}

      <ChatWidget
        open={chatWidgetOpen}
        setOpen={setChatWidgetOpen}
        placement={rotate ? 'left' : 'bottom'}
        height={rotate ? '100%' : '80%'}
        width={rotate ? '50%' : '100%'}
      />
    </section>
  );
};

const loaderStyle = {
  zIndex: 2,
};

export default GamePlayV2;
