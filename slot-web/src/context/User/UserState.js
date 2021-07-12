import { useReducer } from 'react';
import UserReducer from './UserReducer';
import UserContext from './UserContext';

import { w3cwebsocket as W3CWebsocket } from 'websocket';

import { SET_API_TOKEN, SET_EGM_LIST, SET_SELECT_EGM, SET_ON_ACTION_EGM_LIST } from '../type';

const UserState = props => {
  // Init State
  const initialState = {
    apiToken: '',
    casinoToken: '',
    credit: null,
    emgList: [],
    selectEgm: {},
    onActionEgmList: [],
  };

  // Get Http Header
  const getHeaders = token => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
  };

  // Get Egm List
  const getEgmList = async data => {
    const { pc, casino, at } = data;
    console.log(pc, casino, at);
    console.log(state.apiToken);
    // const uri = 'http://220.135.67.240:8000/EgmApi/`PlayerLandingApi?pc=${pc}&casino=${casino}&at=${at}`';
    const uri = `http://220.135.67.240:8000/EgmApi?pc=${pc}&casino=${casino}&at=${at}`;
    const headers = getHeaders(state.apiToken);

    if (!headers) return;

    try {
      const res = await fetch(uri, { headers });
      const resData = await res.json();
      console.log(resData);
      if (resData.code === 17) setEgmList(resData.egmList);
    } catch (error) {
      console.log(error);
    }
  };

  // WebSocket Handler
  const webSocketHandler = uri => {
    const client = new W3CWebsocket(uri);

    // 1.建立連接
    client.onopen = () => {
      console.log('websocket client connected');
      console.log(state.apiToken, state.selectEgm);
      client.send(
        JSON.stringify({
          messageType: 'message',
          token: state.apiToken,
          egmSession: state.selectEgm.egmSession,
        })
      );
    };

    // 收到server回復
    client.onmessage = message => {
      // const dataFromServer = JSON.parse(message);
      if (message.data.includes('EgmPlayingState')) {
        const stateList = [];

        let str = message.data.replace('EgmPlayingState*>>*', '').replace('*^**<<*', '*^*');
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

          console.log(arr);
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

    client.onclose = () => {
      console.log('echo-protocol Client Closed');
    };
  };

  const setApiToken = token => {
    dispatch({ type: SET_API_TOKEN, payload: token });
  };

  const setEgmList = egmList => {
    dispatch({ type: SET_EGM_LIST, payload: egmList });
  };

  const setSelectEgm = egm => {
    console.log(egm);
    dispatch({ type: SET_SELECT_EGM, payload: egm });
  };

  const setOnActionEgmList = egmList => {
    dispatch({ type: SET_ON_ACTION_EGM_LIST, payload: egmList });
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

        setApiToken,
        setEgmList,
        setSelectEgm,
        getEgmList,
        webSocketHandler,
        setOnActionEgmList,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
