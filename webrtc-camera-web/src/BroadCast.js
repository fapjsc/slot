import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import NoDevice from './NoDevice';

let userSelectDevice = 'f658f73a8c5e683c11d5b3a736cbcba15350adcf3d403c83b2fae82ed6e475b3'; // for test

// const signal_server_url = 'https://192.168.10.102:5000';
// const socket = io.connect('http://localhost:5000');
const socket = io.connect('http://192.168.10.101:5000/');

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
  const [allDevices, setAllDevices] = useState([]);
  const [currentDevice, setCurrentDevice] = useState();
  const [NoDevice, setNoDevice] = useState(false);
  // const [streamList, setStreamList] = useState([]);

  // Camera Dom
  const camera = useRef();
  // const camera2 = useRef([]);

  //獲取所有設備後，將kind為videoinput的物件設為 allDevices
  const getAllDevices = type => {
    // let devices = await navigator.mediaDevices.enumerateDevices();
    // console.log(devices, 'all devices');
    // let filterDevices = [];
    // devices.forEach(el => {
    //   if (el.kind === type) {
    //     filterDevices.push(el);
    //   }
    // });

    // console.log(filterDevices, 'filter devices');

    // setAllDevices(filterDevices);

    if (navigator.mediaDevices.getUserMedia) {
      const constraints = { audio: true, video: true };

      let onSuccess = stream => {
        // 確認瀏覽器是否支援
        if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
          console.log('enumerateDevices() not supported.');
          return false;
        }

        // Get Devices List .
        navigator.mediaDevices
          .enumerateDevices()
          .then(devices => {
            devices.forEach(device => {
              if (device.kind === type) {
                setAllDevices(allDevices => [...allDevices, device]);
                console.log(device.label, 'device label');
              }
            });
          })
          .catch(err => {
            console.log(err.name + ': ' + err.message);
          });
      };

      let onError = err => {
        console.log(err);
      };

      navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
    } else {
      console.log('getUserMedia not supported on your browser!');
      alert('瀏覽器不支援');
    }
  };

  // const getAllStream = async () => {
  //   allDevices.forEach(async device => {
  //     const stream = await navigator.mediaDevices.getUserMedia({
  //       audio: false,
  //       video: {
  //         deviceId: device.deviceId,
  //         width: 300,
  //         height: 300,
  //       },
  //     });
  //     setStreamList(streamList => [...streamList, stream]);
  //   });
  // };

  // 獲取使用者選擇的camera, id必須是navigator.mediaDevices.enumerateDevices()裡面的deviceId
  const getCurrentDevice = async id => {
    let selectDevice = allDevices.filter(el => el.deviceId === id);
    console.log(selectDevice, 'user select devices');
    setCurrentDevice(selectDevice);
  };

  // 獲取 user 選擇的stream
  const getSelectStream = async deviceId => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
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
    console.log(allDevices, '所有的video input');
    if (allDevices) {
      getCurrentDevice(userSelectDevice);
      // getAllStream();
    } else {
      console.log('no all devices');
      getAllDevices('videoinput');
    }

    // eslint-disable-next-line
  }, [allDevices]);

  // 獲取用戶選擇的設備
  useEffect(() => {
    console.log(currentDevice, 'current device');

    if (!currentDevice) return;

    if (!currentDevice.length) return;

    if (currentDevice) {
      const deviceId = currentDevice[0].deviceId;
      getSelectStream(deviceId);
      socket.emit('create', deviceId);
    }
    // eslint-disable-next-line
  }, [currentDevice]);

  // useEffect(() => {
  //   if (streamList.length > 0) {
  //     console.log(camera2);
  //     console.log(camera);
  //     streamList.forEach(stream => {});
  //   }
  // }, [streamList]);

  useEffect(() => {
    getAllDevices('videoinput');
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

  if (NoDevice) {
    return <h1>no device</h1>;
  } else {
    return (
      <>
        <div style={box}>
          <video ref={camera} playsInline autoPlay muted />
        </div>
        <div>
          <button onClick={() => getAllDevices('videoinput')}>refresh</button>
        </div>
        {/* <div style={box}>
              <video ref={camera2} playsInline autoPlay muted />
            </div> */}
      </>
    );
  }

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
