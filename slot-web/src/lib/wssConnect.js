// import { w3cwebsocket as W3CWebsocket } from 'websocket';
import ReconnectingWebSocket from 'reconnecting-websocket';

import store from '../store';
import * as egmActions from '../actions/egmActions';

//==== WebSocket ====//
const wsUri = 'ws://220.135.67.240:8000/';

const socketEventTypes = {
  WS_SET_EGM_CONNECT_SUCCESS_STATE: 'WS_SET_EGM_CONNECT_SUCCESS_STATE',
  WS_SET_EGM_CONNECT_FAIL_STATE: 'WS_SET_EGM_CONNECT_FAIL_STATE',
  WS_SET_EGM_PLAYING_STATE: 'WS_SET_EGM_PLAYING_STATE',
  WS_SET_EGM__CREDIT: 'WS_SET_EGM__CREDIT',
  WS_SET_EGM_KICK: 'WS_SET_EGM_KICK',
};

let playingStateTmp;
let kickStateTmp;
let egmConnectSuccessArrTmp = [];
let egmConnectFailArrTmp = [];
let egmCreditArrTmp = [];

let client;

export const connectWithWebSocket = () => {
  const egmStateWebSocketUri = `${wsUri}stateQuote`;
  client = new ReconnectingWebSocket(egmStateWebSocketUri);

  // 1.建立連接
  client.onopen = () => {
    console.log('websocket client connected');
  };

  // 收到server回復
  client.onmessage = message => {
    if (client.readyState === client.OPEN) {
      if (store.getState().egm.selectEgmData.egmSession) {
        const egmSession = store.getState().egm.selectEgmData.egmSession;
        const data = {
          messageType: 'message',
          token: localStorage.getItem('token'),
          egmSession,
        };
        client.send(JSON.stringify(data));
        // console.log('send', egmSession);
      }
    }

    // Egm Connect State
    if (message.data.includes('EgmState')) {
      let obj = {};
      let strArr = message.data.split('*|*');
      obj = {
        map: Number(strArr[1]),
        state: Number(strArr[4]),
      };

      if (obj.state === 1) {
        const connectSuccessData = {
          event: socketEventTypes.WS_SET_EGM_CONNECT_SUCCESS_STATE,
          egmConnectSuccess: obj.map,
        };
        handleSocketActions(connectSuccessData);
      } else {
        const connectFailData = {
          event: socketEventTypes.WS_SET_EGM_CONNECT_FAIL_STATE,
          egmConnectFail: obj.map,
        };
        handleSocketActions(connectFailData);
      }
    }

    // Kick state
    if (message.data.includes('KickEgmNotify')) {
      if (message.data === kickStateTmp) return;
      kickStateTmp = message.data;
      let str = message.data.replace('KickEgmNotify*>>*', '').replace('*^**>>*', '*^*');
      let strArr = str.split('*^*');
      console.log(strArr, 'kkk');

      let kickData = {};
      let kickItem = {};

      strArr.forEach(el => {
        if (el !== '') {
          let arr = el.split('*|*');
          kickItem.egm = arr[0];
          kickItem.token = arr[1];
        }
      });

      console.log(kickItem, 'kkk');

      if (!kickItem.egm || !kickItem.token) return;

      kickData = {
        event: socketEventTypes.WS_SET_EGM_KICK,
        kickItem,
      };

      handleSocketActions(kickData);
    }

    // // Egm Playing State
    if (message.data.includes('EgmPlayingState')) {
      if (playingStateTmp === message.data) return;
      playingStateTmp = message.data;
      let str = message.data.replace('EgmPlayingState*>>*', '').replace('*^**>>*', '*^*');
      let strArr = str.split('*^*');
      let egmPlayingStateList = [];
      strArr.forEach(el => {
        let obj = {};
        if (el !== '') {
          let arr = el.split('*|*');
          obj.map = arr[0];
          obj.state = arr[3];
        }

        // if (!obj.map || !obj.state) return;

        if (obj.state === 'True') egmPlayingStateList.push(Number(obj.map));
      });

      const playingData = {
        event: socketEventTypes.WS_SET_EGM_PLAYING_STATE,
        egmPlayingStateList,
      };

      handleSocketActions(playingData);
    }

    // Credit
    if (message.data.includes('EgmCredit')) {
      let obj = {};
      let strArr = message.data.split('*|*');
      obj = {
        map: Number(strArr[1]),
        credit: Number(strArr[4]),
        // ip: strArr[3],
        // id: strArr[2],
      };

      const creditData = {
        event: socketEventTypes.WS_SET_EGM__CREDIT,
        egmCreditState: obj,
      };

      handleSocketActions(creditData);
    }
  };

  client.onerror = () => {
    console.log('Connection Error');
  };

  client.onclose = e => {
    console.log('Client Closed');
    console.log(e);
  };
};

const handleSocketActions = data => {
  switch (data.event) {
    // Connect success
    case socketEventTypes.WS_SET_EGM_CONNECT_SUCCESS_STATE:
      const { egmConnectSuccess } = data;

      let tmp = egmConnectSuccessArrTmp.find(el => el === egmConnectSuccess);

      if (tmp) return;

      egmConnectSuccessArrTmp.push(egmConnectSuccess);

      const failIndex = egmConnectFailArrTmp.findIndex(el => el === egmConnectSuccess);

      if (failIndex !== -1) {
        store.dispatch(egmActions.removeFailConnectList(egmConnectSuccess));
        egmConnectFailArrTmp.splice(failIndex, 1);
      }

      break;

    // Connect fail
    case socketEventTypes.WS_SET_EGM_CONNECT_FAIL_STATE:
      const { egmConnectFail } = data;
      let tmpFail = egmConnectFailArrTmp.find(el => el === egmConnectFail);
      if (tmpFail) return;

      egmConnectFailArrTmp.push(egmConnectFail);
      store.dispatch(egmActions.setEgmConnectFailList(egmConnectFail));

      const successIndex = egmConnectSuccessArrTmp.findIndex(el => el === egmConnectFail);

      if (successIndex !== -1) {
        egmConnectSuccessArrTmp.splice(successIndex, 1);
      }

      break;

    // Playing state
    case socketEventTypes.WS_SET_EGM_PLAYING_STATE:
      const { egmPlayingStateList } = data;
      store.dispatch(egmActions.setEgmPlayingList(egmPlayingStateList));
      break;

    // Credit State
    case socketEventTypes.WS_SET_EGM__CREDIT:
      const { egmCreditState } = data;

      let creditTmp = egmCreditArrTmp.find(
        el => el.map === egmCreditState.map && el.credit === egmCreditState.credit
      );
      if (creditTmp) return;

      const existsItem = egmCreditArrTmp.find(el => el.map === egmCreditState.map);

      if (existsItem) {
        egmCreditArrTmp = egmCreditArrTmp.map(el =>
          el.map === egmCreditState.map ? egmCreditState : el
        );
      } else {
        egmCreditArrTmp.push(egmCreditState);
      }

      store.dispatch(egmActions.setEgmCreditList(egmCreditState));
      break;

    // Kick State
    case socketEventTypes.WS_SET_EGM_KICK:
      const { kickItem } = data;
      store.dispatch(egmActions.setKickList(kickItem));
      break;

    default:
      break;
  }
};
