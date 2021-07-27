import { apiUrl } from '../../api/config';

import { useReducer } from 'react';
import { useHistory } from 'react-router-dom';
import UserReducer from './UserReducer';
import UserContext from './UserContext';

import { w3cwebsocket as W3CWebsocket } from 'websocket';
import ReconnectingWebSocket from 'reconnecting-websocket';

import {
  SET_API_TOKEN,
  SET_EGM_LIST,
  SET_SELECT_EGM,
  SET_ON_ACTION_EGM_LIST,
  SET_WS_CLIENT,
  SET_EGM_CONNECT_STATE_LIST,
  SET_EMG_CREDIT_STATE_LIST,
  SET_BUTTON_LIST,
  SET_LOGIN_DATA,
  SET_KICK_LIST,
  REMOVE_KICK_ITEM,
  SET_REVIEW_STATE,
} from '../type';

const UserState = props => {
  // Router Props
  const history = useHistory();

  // Init State
  const initialState = {
    apiToken: '',
    casinoToken: '',
    credit: null,
    emgList: [],
    selectEgm: {},
    onActionEgmList: [],
    wsClient: null,
    egmConnectList: [],
    egmCreditList: [],
    btnList: [],
    kickList: [],
    reviewState: false,
  };

  // Get Http Header
  const getHeaders = token => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
  };

  // User Review
  const userReview = async (token, data) => {
    const headers = getHeaders(token);
    if (!headers) return;

    const url = `${apiUrl}/PlayEgmCommentApi`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      console.log(resData);
    } catch (error) {
      console.log(error);
    }
  };

  // Choose Egm List
  const chooseEgm = async (data, machineDetails, apiToken) => {
    const { pc, casino, at } = data;
    const { mapId, egmIp, egmId, cameraId, audioId, cameraIndex, picName } = machineDetails;

    let url = `${apiUrl}/playerChooseEgmApi?pc=${pc}&casino=${casino}&at=${at}`;
    const headers = getHeaders(apiToken);
    if (!headers) return;

    let body = {
      mapId: machineDetails.mapId,
      egmId: machineDetails.egmId,
      egmIP: machineDetails.egmIp,
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const resData = await res.json();

      if (resData.code < 100000000) {
        setBtnList(resData.btnList);
        setSelectEgm({
          mapId: Number(mapId),
          egmId: Number(egmId),
          egmIp,
          cameraId,
          picName,
          audioId,
          cameraIndex,
        });

        localStorage.setItem('egmId', Number(egmId));
        localStorage.setItem('egmIp', egmIp);
        localStorage.setItem('mapId', Number(mapId));
        localStorage.setItem('cameraId', cameraId);
        localStorage.setItem('audioId', audioId);
        localStorage.setItem('picName', picName);
        localStorage.setItem('egmSession', resData.egmSession);
        localStorage.setItem('checkSum', resData.checkSum);
        localStorage.setItem('webNumber', cameraIndex);
        localStorage.setItem('btnList', JSON.stringify(resData.btnList));

        history.replace('/gameStart');
      } else {
        alert(resData.msg, '102');
        // console.log(resData.msg);
      }
    } catch (error) {
      console.log(error, 'res');
    }
  };

  // Get Egm List
  const getEgmList = async data => {
    const { pc, casino, token } = data;
    const uri = `${apiUrl}EgmApi?pc=${pc}&casino=${casino}&tk=${token}`;
    // console.log(uri);
    const headers = getHeaders();

    if (!headers) return;

    try {
      const res = await fetch(uri, {
        headers,
      });
      const resData = await res.json();

      if (resData.code === 100000004) {
        alert(resData.msg);
        localStorage.clear();
        history.replace('/');
      }

      if (resData.code === 17) setEgmList(resData.egmList);
    } catch (error) {
      console.log(error);
      alert('發生錯誤，請重新登入 134');
      localStorage.clear();
      history.replace('/');
    }
  };

  // WebSocket Handler
  const webSocketHandler = uri => {
    // const client = new W3CWebsocket(uri);
    const client = new ReconnectingWebSocket(uri);

    let stateArr = [];

    // 1.建立連接
    client.onopen = () => {
      setWsClient(client);
      console.log('websocket client connected');
    };

    // 收到server回復
    client.onmessage = message => {
      // console.log(message.data);
      // const dataFromServer = JSON.parse(message);
      if (client.readyState === client.OPEN) {
        const data = {
          messageType: 'message',
          token: localStorage.getItem('token'),
          egmSession: localStorage.getItem('egmSession'),
        };
        // console.log(data);

        client.send(JSON.stringify(data));
      }

      // Kick State
      if (message.data.includes('KickEgmNotify')) {
        let str = message.data.replace('KickEgmNotify*>>*', '').replace('*^**>>*', '*^*');

        let strArr = str.split('*^*');
        // console.log(strArr, 'str');

        strArr.forEach(el => {
          let kickObj = {};
          if (el !== '') {
            let arr = el.split('*|*');
            kickObj.egm = arr[0];
            kickObj.token = arr[1];

            setKickList(kickObj);
          }
        });
      }

      // Egm Create State
      if (message.data.includes('EgmCredit')) {
        let obj = {};
        let strArr = message.data.split('*|*');
        obj = {
          ip: strArr[3],
          map: strArr[1],
          id: strArr[2],
          credit: strArr[4],
        };

        setEgmCreditList(obj);
      }

      // Egm Connect State
      if (message.data.includes('EgmState')) {
        let obj = {};
        let strArr = message.data.split('*|*');
        obj = {
          ip: strArr[3],
          map: Number(strArr[1]),
          id: Number(strArr[2]),
          state: Number(strArr[4]),
        };

        setEgmConnectList(obj);
      }

      // console.log(stateArr, 'egm connect success');
      setEgmConnectList(stateArr);

      // Egm Playing State
      if (message.data.includes('EgmPlayingState')) {
        let stateList = [];

        let str = message.data.replace('EgmPlayingState*>>*', '').replace('*^**>>*', '*^*');
        let strArr = str.split('*^*');
        strArr.forEach(el => {
          let obj = {};
          if (el !== '') {
            let arr = el.split('*|*');
            obj.map = arr[0];
            obj.id = arr[1];
            obj.ip = arr[2];
            obj.state = arr[3];
          }
          stateList.push(obj);
        });

        if (stateList.length > 0) {
          let arr = [];
          stateList.forEach(el => {
            if (el.state === 'True') {
              arr.push(el.ip);
              // console.log(el.ip, '遊戲中');
            } else if (el.state === 'False') {
              // console.log(el.ip, '可以玩');
            }
          });

          console.log(arr, 'isPlaying...');
          arr.length > 0 ? setOnActionEgmList(arr) : setOnActionEgmList([]);
          // console.log(props.egmList);
        } else {
          console.log('no socket data');
        }
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

  const setApiToken = token => {
    dispatch({ type: SET_API_TOKEN, payload: token });
  };

  const setEgmList = egmList => {
    dispatch({ type: SET_EGM_LIST, payload: egmList });
  };

  const setSelectEgm = egm => {
    // console.log(egm);
    dispatch({ type: SET_SELECT_EGM, payload: egm });
  };

  const setOnActionEgmList = egmList => {
    dispatch({ type: SET_ON_ACTION_EGM_LIST, payload: egmList });
  };

  const setWsClient = client => {
    dispatch({ type: SET_WS_CLIENT, payload: client });
  };

  const setEgmConnectList = egmItem => {
    dispatch({ type: SET_EGM_CONNECT_STATE_LIST, payload: egmItem });
  };

  const setEgmCreditList = egmItem => {
    dispatch({ type: SET_EMG_CREDIT_STATE_LIST, payload: egmItem });
  };

  const setBtnList = btnList => {
    dispatch({ type: SET_BUTTON_LIST, payload: btnList });
  };

  const setLoginData = loginData => {
    dispatch({ type: SET_LOGIN_DATA, payload: loginData });
  };

  const setKickList = kickObj => {
    dispatch({ type: SET_KICK_LIST, payload: kickObj });
  };

  const removeKickItem = kickObj => {
    dispatch({ type: REMOVE_KICK_ITEM, payload: kickObj });
  };

  const setReviewState = value => {
    dispatch({ type: SET_REVIEW_STATE, payload: value });
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        apiToken: state.apiToken,
        casinoToken: state.casinoToken,
        credit: state.credit,
        egmList: state.egmList,
        selectEgm: state.selectEgm,
        onActionEgmList: state.onActionEgmList,
        wsClient: state.wsClient,
        egmConnectList: state.egmConnectList,
        egmCreditList: state.egmCreditList,
        btnList: state.btnList,
        loginData: state.loginData,
        kickList: state.kickList,
        reviewState: state.reviewState,

        setApiToken,
        setEgmList,
        setSelectEgm,
        getEgmList,
        webSocketHandler,
        setOnActionEgmList,
        setEgmConnectList,
        setBtnList,
        chooseEgm,
        setLoginData,
        removeKickItem,
        setReviewState,
        userReview,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
