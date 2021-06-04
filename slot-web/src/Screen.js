import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

// peerConnection Options
const pcConfig = {
  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302', // 使用來設定iceServer,用來當作打通NAT作用。
    },
    {
      urls: 'turn:18.191.253.152:3478',
      username: 'alex',
      credential: 'abcdefg',
    },
  ],
};
let peerConnection;
const Viewer = ({ leave }) => {
  const remoteCamera = useRef();
  const history = useHistory();

  const [socket, setSocket] = useState();

  const handleSocket = () => {
    const socket = io.connect('https://192.168.10.102:5000');
    socket.on('offer', (id, description) => {
      console.log('get offer');
      peerConnection = new RTCPeerConnection(pcConfig);
      peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit('answer', id, peerConnection.localDescription);
        });
      peerConnection.ontrack = event => {
        console.log(event);
        console.log(event.streams[0]);
        if (remoteCamera.current.srcObject !== event.streams[0]) {
          remoteCamera.current.srcObject = event.streams[0];
          console.log(remoteCamera.current.srcObject);
        }
      };
      peerConnection.onicecandidate = event => {
        console.log(event);
        if (event.candidate) {
          socket.emit('candidate', id, event.candidate);
        }
      };

      console.log(peerConnection);
    });

    socket.on('candidate', (id, candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(e => console.error(e));
    });

    socket.on('connect', () => {
      socket.emit('watcher');
    });

    socket.on('broadcaster', () => {
      console.log('broad');
      socket.emit('watcher');
    });

    socket.on('disconnect', () => {
      alert('socket disconnect');
      history.replace('/home');
    });

    // 監聽 Server 斷線
    socket.on('disconnectPeer', () => {
      alert('server or camera disconnect');
    });

    window.onunload = window.onbeforeunload = () => {
      socket.close();
      peerConnection.close();
    };
    setSocket(socket);
  };

  useEffect(() => {
    handleSocket();
    return () => {};
  }, []);

  useEffect(() => {
    if (remoteCamera.current.srcObject) {
      console.log('got remote stream');
    } else {
      console.log('no remote stream');
      console.log(peerConnection);
    }
  }, [remoteCamera]);

  return (
    <div style={box}>
      <h2>Viewer</h2>
      <video ref={remoteCamera} playsInline autoPlay muted style={{ width: 300 }} />
    </div>
  );
};

const box = {
  width: 300,
  height: 300,
  backgroundColor: '#ddd',
  margin: '60px auto',
  position: 'relative',
  textAlign: 'center',
};

export default Viewer;
