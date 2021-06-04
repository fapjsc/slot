import { useEffect, useRef, useState, createRef } from 'react';
import io from 'socket.io-client';
import NoDevice from './NoDevice';

// const signal_server_url = 'https://192.168.10.102:5000';
const socket = io.connect('https://192.168.10.102:5000');

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

const peerConnections = {};

const BroadCast = () => {
  // Init State
  const [allDevices, setAllDevices] = useState();
  const [streamList, setStreamList] = useState([]);
  const [currentDevice, setCurrentDevice] = useState();

  // Camera Dom
  const camera = useRef();
  const camera2 = useRef([]);

  //獲取所有設備後，將kind為videoinput的物件設為 allDevices
  const getAllDevices = async () => {
    let devices = await navigator.mediaDevices.enumerateDevices();
    let filterDevices = [];
    devices.forEach(el => {
      if (el.kind === 'videoinput') filterDevices.push(el);
    });
    setAllDevices(filterDevices);
  };

  const getAllStream = async () => {
    allDevices.forEach(async device => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: device.deviceId,
          width: 300,
          height: 300,
        },
      });

      setStreamList(streamList => [...streamList, stream]);
    });
  };

  // 獲取使用者選擇的camera, id必須是navigator.mediaDevices.enumerateDevices()裡面的deviceId
  const getCurrentDevice = async id => {
    const macCam = '30e5aed60d5f2a71ea807bf3841fcbe45647800028fc88fd8221d2a9e455ec7a'; // 測試ID
    const webCam = 'c5323518eb6a0cf8979032a5f3a4c82749c3de9e2ff0ff981d860ad6038b5808'; // 測試ID
    let selectDevice = allDevices.filter(el => el.deviceId === webCam);
    setCurrentDevice(selectDevice);
  };

  // 獲取 user 選擇的stream
  const getSelectStream = async deviceId => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          deviceId: deviceId,
          width: 300,
          height: 300,
        },
      });
      // console.log(stream);
      camera.current.srcObject = stream;
      socket.emit('broadcaster');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log(camera);
    if (allDevices) {
      getCurrentDevice();
      // getAllStream();
    } else {
      console.log('no all devices');
    }

    // eslint-disable-next-line
  }, [allDevices]);

  useEffect(() => {
    if (streamList.length > 0) {
      console.log(camera2);
      console.log(camera);
      streamList.forEach(stream => {});
    }
  }, [streamList]);

  useEffect(() => {
    getAllDevices();
    socket.on('connection', () => {
      console.log('connection');
    });
    socket.on('watcher', id => {
      const peerConnection = new RTCPeerConnection(pcConfig);
      peerConnections[id] = peerConnection;
      let stream = camera.current.srcObject;
      // 將 stream 和 media track 加到 peerConnection
      stream.getTracks().forEach(track => {
        peerConnection.addTrack(track, stream);
      });
      // Candidate Event
      peerConnection.onicecandidate = event => {
        if (event.candidate) {
          socket.emit('candidate', id, event.candidate);
        }
      };
      peerConnection
        .createOffer()
        .then(sdp => peerConnection.setLocalDescription(sdp))
        .then(() => {
          socket.emit('offer', id, peerConnection.localDescription);
          console.log('offer');
        });
    });
    socket.on('answer', (id, description) => {
      peerConnections[id].setRemoteDescription(description);
    });
    socket.on('candidate', (id, candidate) => {
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });
    // Listen User Leave
    socket.on('leave', () => {
      alert('user leave');
    });
    socket.on('disconnectPeer', id => {
      alert('user leave');
      if (peerConnections[id]) {
        peerConnections[id].close();
        delete peerConnections[id];
      } else {
        console.log('No peerConnections');
      }
    });
    window.onunload = window.onbeforeunload = () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    if (currentDevice) {
      const deviceId = currentDevice[0].deviceId;
      getSelectStream(deviceId);
      socket.emit('create', deviceId);
    } else {
      console.log('no current device');
    }

    // eslint-disable-next-line
  }, [currentDevice]);

  return (
    <>
      <div style={box}>
        <video ref={camera} playsInline autoPlay muted />
      </div>
      {/* <div style={box}>
            <video ref={camera2} playsInline autoPlay muted />
          </div> */}
    </>
  );

  // if (streamList.length) {
  //   return (
  //     <div>
  //       {streamList.map((el, i) => {
  //         console.log(camera2, '2');
  //         console.log(camera, '1');
  //         return (
  //           <div style={box}>
  //             <video ref={camera} src={} playsInline autoPlay muted />
  //             <video ref={camera2} playsInline autoPlay muted />
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  // } else {
  //   return <h1>no stream</h1>;
  // }
};

const box = {
  width: 350,
  height: 350,
  backgroundColor: 'grey',
  margin: '60px auto',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

export default BroadCast;
