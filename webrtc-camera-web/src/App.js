import { io } from 'socket.io-client';

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const signalServerUrl = "http://192.168.10.115:3333/";
const socket = io.connect(signalServerUrl);
const pcConfig = {
  'iceServers': [
    {
      'urls': 'stun:stun.l.google.com:19302'
    },
    {
      'urls': 'turn:18.191.253.152:3478',
      'username': 'alex',
      'credential': 'abcdefg'
    }
  ]
};

function App() {
  const [isStart, setIsStart] = useState(false);
  const [peerConnection, setPeerConnection] = useState([]);

  const wait = (timer) => {
    return new Promise(resolve => {
      setTimeout(() =>{
        resolve();
      }, timer)
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
