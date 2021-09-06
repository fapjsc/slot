import { w3cwebsocket as W3CWebsocket } from 'websocket';

const SERVER = 'ws://220.135.67.240:8000/mngSocket';

let socket;

export const connectWithWss = () => {
  socket = new W3CWebsocket(SERVER);

  socket.onopen = () => {
    console.log('connect to wss');
  };

  socket.onmessage = message => {
    const dataFromServer = JSON.parse(message.data);
    let playingArr = dataFromServer.StateList.filter(data => data.IsPlaying);

    let arr = [];
    playingArr.forEach(el => {
      arr.push(el.MapId);
    });
  };
};
