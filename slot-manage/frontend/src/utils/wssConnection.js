import store from '../store';
import { setPlayingList } from '../store/actions/egmAction';

import { w3cwebsocket as W3CWebsocket } from 'websocket';

const SERVER = 'ws://220.135.67.240:8000/mngSocket';

let socket;
let tmpStr;

export const connectWithWss = () => {
  socket = new W3CWebsocket(SERVER);

  socket.onopen = () => {
    console.log('connect to wss');
  };

  socket.onmessage = message => {
    if (message.data === tmpStr) return;

    tmpStr = message.data;

    const dataFromServer = JSON.parse(message.data);

    // Set Playing Arr
    let playingArr = dataFromServer.StateList.filter(data => data.IsPlaying);
    let arr = [];
    playingArr.forEach(el => {
      arr.push(el.MapId);
    });

    store.dispatch(setPlayingList(arr));
  };
};
