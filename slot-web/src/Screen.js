import { useEffect, useRef, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

// Context
import UserContext from './context/User/UserContext';

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

const Viewer = ({ closeWebRtcConnect, setCloseWebRtcConnect, leave, autoPlay, setAutoPlay, setSocketClient }) => {
  const remoteCamera = useRef();

  // Router Props
  const history = useHistory();

  const [socket, setSocket] = useState();

  // User Context
  const userContext = useContext(UserContext);
  const { selectEgm } = userContext;
  let cameraId = selectEgm.cameraId;
  let audioId = selectEgm.audioId;
  const webNumber = selectEgm.webNumber;

  const handleSocket = () => {
    // const socketConnect = io.connect(process.env.REACT_APP_SOCKET_CONNECT);
    const socketConnect = io.connect(process.env.REACT_APP_SOCKET_CONNECT__1);
    setSocket(socketConnect);
    setSocketClient(socketConnect);
  };

  const videoPlay = () => {
    console.log(remoteCamera);
    remoteCamera.current.play();
  };

  useEffect(() => {
    handleSocket();

    return () => {
      if (socket) {
        // peerConnection.close();
        socket.close();
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (autoPlay) {
      videoPlay();
      setAutoPlay(false);
    }
    // eslint-disable-next-line
  }, [autoPlay]);

  useEffect(() => {
    if (!socket) return;

    socket.on('connect', () => {
      console.log('connection', socket.id);
      socket.emit('joinRoom', webNumber, cameraId, audioId);
      // socket.emit('remoteUserSelectDevice', 'fbeeb7e467a9f690700523a7079e26205fb76d1ddcdef79075b9378602d3f65e', '75a59ed289aa13f5abcf465cc75583efccb2c744fd61e1c24f7c5362540b26dc');
      console.log(audioId);
    });

    socket.on('offer', (id, description) => {
      console.log('get offer', id);
      peerConnection = new RTCPeerConnection(pcConfig);
      peerConnection
        .setRemoteDescription(description)
        .then(() => peerConnection.createAnswer())
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit('answer', id, peerConnection.localDescription);
        });
      peerConnection.ontrack = event => {
        console.log(remoteCamera);
        if (!remoteCamera.current) return;
        if (remoteCamera.current.srcObject !== event.streams[0]) {
          remoteCamera.current.srcObject = event.streams[0];
          console.log(remoteCamera.current.srcObject.getTracks());
        }
      };

      // 當找到自己的candiDate後，發送給server，包含自己的socket id
      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socket.emit('candidate', id, event.candidate);
          console.log('candiDate', event.candidate.candidate);
        } else {
        }
      };

      peerConnection.onconnectionstatechange = event => {
        console.log(event.currentTarget.iceConnectionState);
        if (event.currentTarget.iceConnectionState === 'disconnected') {
          // peerConnection.close();
          socket.emit('joinRoom', webNumber, cameraId, audioId);
        }
      };

      console.log(peerConnection);
    });

    // 接收對方的 candidate 並加入自己的 RTCPeerConnection
    socket.on('candidate', (id, candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(e => console.log(e, 'can not find'));
    });

    socket.on('cameraErr', () => {
      // leave('Camera Error');
      alert('發生錯誤,請從新登入');
      history.replace('/');
      localStorage.clear();
    });

    socket.on('deviceChange', message => {
      console.log(message);
    });

    socket.on('disconnect', () => {
      console.log('socket disconnect');
    });

    window.onunload = window.onbeforeunload = () => {
      socket.close();
      // peerConnection.close();
    };

    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    if (!setCloseWebRtcConnect) return;
    if (closeWebRtcConnect && socket && peerConnection) {
      console.log('closePeer');
      socket.emit('closePeer', socket.id);
      socket.emit('unsubscribe', webNumber);
      socket.close();
      peerConnection.close();
    }
    setCloseWebRtcConnect(false);

    // eslint-disable-next-line
  }, [closeWebRtcConnect]);

  useEffect(() => {
    if (remoteCamera.current.srcObject) {
      console.log('got remote stream');
    } else {
      console.log('no remote stream');
    }
  }, [remoteCamera]);

  return <video onClick={videoPlay} ref={remoteCamera} autoPlay playsInline style={{ width: '100%', height: '100%' }} />;
};

export default Viewer;
