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

// let usbHd = '7324b1d00ac5e2592e3f26e14bee3b40be63ea5f0a56058bdc8d0f8df505941f';
// let macCamera = '0378feddb77dbd905379c76187e8ff3d69ecc1dbd7da3f75cbb3df19a0127dae';
// let usbCam = '78b0a66f8b0eda11f77a3666e32e02017800affd94ea78e104ceebae4d4dbcd6';
// let capture = '7e89ee5312876802b7aa93db2b44a7678757a0c54889fda6053431a2ee617b15';

const Viewer = () => {
  const remoteCamera = useRef();
  const history = useHistory();

  const [socket, setSocket] = useState();

  // User Context
  const userContext = useContext(UserContext);
  const { selectEgm } = userContext;
  console.log(selectEgm.cameraId);
  let cameraId = selectEgm.cameraId;

  const handleSocket = () => {
    const socketConnect = io.connect(process.env.REACT_APP_SOCKET_CONNECT);
    // const socketConnect = io.connect('http://localhost:5000');

    setSocket(socketConnect);
  };

  const videoPlay = () => {
    console.log(remoteCamera);
    remoteCamera.current.play();
  };

  useEffect(() => {
    handleSocket();

    return () => {
      console.log(socket);

      if (socket) {
        socket.close();
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on('connection', () => {
      console.log('connection', socket.id);
      // socket.emit('watcher');
      socket.emit('remoteUserSelectDevice', cameraId);
    });

    socket.on('broadcaster', () => {
      console.log('broadcaster');
      // socket.emit('watcher');
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
        }
      };

      peerConnection.onconnectionstatechange = event => {
        console.log(event.currentTarget.iceConnectionState);
        if (event.currentTarget.iceConnectionState === 'disconnected') {
          peerConnection.close();
          socket.emit('remoteUserSelectDevice', cameraId);
        }
      };

      console.log(peerConnection);
    });

    socket.on('candidate', (id, candidate) => {
      peerConnection.addIceCandidate(new RTCIceCandidate(candidate)).catch(e => console.error(e));
    });

    socket.on('cameraErr', () => {
      alert('device change');
    });

    socket.on('disconnect', () => {
      alert('socket disconnect');
      peerConnection.close();
      socket.close();
      history.replace('/home');
    });

    window.onunload = window.onbeforeunload = () => {
      socket.close();
      peerConnection.close();
    };

    // eslint-disable-next-line
  }, [socket]);

  useEffect(() => {
    if (remoteCamera.current.srcObject) {
      console.log('got remote stream');
    } else {
      console.log('no remote stream');
    }
  }, [remoteCamera]);

  return (
    <div style={box}>
      <video onClick={videoPlay} ref={remoteCamera} autoPlay playsInline controls style={{ width: '100%' }} />
    </div>
  );
};

const box = {
  width: '100%',
  height: '100%',
};

export default Viewer;
