import { useEffect, useRef, useState, useContext } from 'react';
import io from 'socket.io-client';
// import { v4 as uuidv4 } from 'uuid';

// Context
import DeviceContext from './context/device/DeviceContext';

// Style
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const socket = io.connect(process.env.REACT_APP_SOCKET_CONNECT);

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
  const [allVideo, setAllVideo] = useState([]);
  const [allAudio, setAllAudio] = useState([]);
  const [noDevice, setNoDevice] = useState(false);
  const [currentDevice, setCurrentDevice] = useState(); // Camera
  const [currentAudio, setCurrentAudio] = useState(); // Audio
  const [flag, setFlag] = useState('');
  // const [egmList, setEgmList] = useState([]);
  const [selectEgm, setSelectEgm] = useState('');
  const [egmIp, setEgmIp] = useState('');

  // Device Context
  const deviceContext = useContext(DeviceContext);
  const { setDeviceMap, getEgmList, egmList, setDeviceIsChange, deviceIsChange } = deviceContext;

  // Camera Dom
  const camera = useRef();
  // const sendRemote = useRef();

  //獲取所有設備後，將kind為videoinput的物件設為 allDevices
  const getAllDevices = async () => {
    await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
    let devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices, 'all devices');

    let AudioArr = [];
    devices.forEach(el => {
      if (el.kind === 'audioinput') {
        AudioArr.push(el);
      }
    });

    console.log(AudioArr, 'all audio device');
    setAllAudio(AudioArr);

    let VideoArr = [];
    devices.forEach(el => {
      if (el.kind === 'videoinput') {
        VideoArr.push(el);
      }
    });
    console.log(VideoArr, 'all video device');
    setAllVideo(VideoArr);
  };

  // 獲取本地選擇的stream
  const getSelectStream = async deviceId => {
    console.log(window.stream);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          deviceId: { exact: deviceId },
          width: { ideal: 1080 },
          height: { ideal: 1080 },
        },
      });
      camera.current.srcObject = stream;

      // socket.emit('broadcaster');
    } catch (error) {
      console.log(error);
    }
  };

  // 遠端使用者選擇egm後，依據對應的device id 獲取並返回camera stream
  const remoteStream = async (cameraId, audioId) => {
    console.log('接收到的device ID', cameraId);
    console.log('接收到的audio ID', audioId);
    if (cameraId) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: audioId,
          },
          video: {
            deviceId: { exact: cameraId },
            width: 509, //1280
            height: 432, //800
          },
        });

        return stream;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('沒有camera id..');
    }
  };

  // 本地隨機產生flag id
  // const getFlag = () => {
  //   setFlag(uuidv4());
  // };

  // 本地選擇設備後獲取 stream 以及 device info
  const handleChangeDevice = e => {
    console.log(e.target.id);
    let cameraId;
    if (e.target.id === 'camera') {
      const selectCamera = allVideo.filter(device => device.deviceId === e.target.value);
      console.log(selectCamera, 'select camera');
      if (selectCamera.length === 1) {
        cameraId = selectCamera[0].deviceId;
        getSelectStream(cameraId); // device stream
        setCurrentDevice(selectCamera[0]); // device info
      } else {
        // alert('沒有設備');
      }
    }

    if (e.target.id === 'audio') {
      const selectAudio = allAudio.filter(audio => audio.deviceId === e.target.value);
      console.log(selectAudio, 'select audio');
      if (selectAudio.length === 1) {
        setCurrentAudio(selectAudio[0]);
      }
    }
  };

  const handleSelectEgm = e => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index];
    // console.log(optionElement.id);
    setEgmIp(optionElement.id);
    setSelectEgm(e.target.value);
  };

  const handleDeviceMap = (flag, egm, cameraId, deviceLabel, egmIp, audioLabel, audioDeviceId) => {
    const deviceObj = {
      flag,
      egm,
      cameraId,
      deviceLabel,
      egmIp,
      audioLabel,
      audioDeviceId,
    };
    setDeviceMap(deviceObj);
    cleanDeviceForm();
  };

  const cleanDeviceForm = deviceId => {
    setFlag('');
  };

  useEffect(() => {
    getAllDevices();
    // setEgmList([9, 10]);
    getEgmList(process.env.REACT_APP_AGENT_SERVER);
    navigator.mediaDevices.ondevicechange = event => {
      getAllDevices();
    };
    socket.on('connection', () => {
      console.log('connection===========');
      console.log(socket.id);
      socket.emit('join');
    });

    // 收到answer後設定remote description
    socket.on('answer', (id, description) => {
      console.log('answer', id);
      peerConnections[id].setRemoteDescription(description);
      console.log(peerConnections[id]);
    });

    socket.on('candidate', (id, candidate) => {
      console.log('candidate', id, candidate.candidate);
      peerConnections[id].addIceCandidate(new RTCIceCandidate(candidate));
    });

    socket.on('closePeerCon', id => {
      console.log('closePeerCon =====', id);
      if (!peerConnections[id]) return;
      socket.close();

      console.log(peerConnections[id]);

      // peerConnections[id].removeTrack();
      // const track = stream.getVideoTracks()[0];
      // const sender = peerConnections[id].addTrack(track, stream);
      // peerConnections[id].removeTrack(sender);
      peerConnections[id].close();
      console.log(peerConnections[id], '1234');
    });

    socket.on('disconnect', () => {
      console.log('socket disconnect');
    });

    // 關閉瀏覽器後socket斷線
    // window.onunload = window.onbeforeunload = () => {
    //   socket.close();
    // };

    // return () => {};
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (deviceIsChange) {
      socket.emit('device-is-change');

      setDeviceIsChange(false);
    }

    // eslint-disable-next-line
  }, [deviceIsChange]);

  useEffect(() => {
    if (!allVideo.length) setNoDevice(true);
    if (allVideo.length && egmList.length) {
      // 遠端User 選擇EGM後觸發
      socket.on('remoteUserSelectDevice', async (socketId, deviceId, audioId) => {
        console.log('remoteUserSelectDevice', socketId);
        console.log('get audio id', audioId);
        console.log('get camera id', deviceId);
        // console.log(egmList);
        // const temp = allVideo.find(el => el.deviceId === deviceId);
        // console.log(temp);
        // if (!temp) {
        //   socket.emit('cameraErr', socketId);
        //   return;
        // }

        try {
          const stream = await remoteStream(deviceId, audioId);
          console.log(stream.getTracks());

          const peerConnection = new RTCPeerConnection(pcConfig);
          peerConnections[socketId] = peerConnection;

          console.log(peerConnections[socketId], 'peer');

          console.log(stream);
          console.log(stream.getTracks());

          // 將 stream 和 media track 加到 peerConnection
          stream.getTracks().forEach(track => {
            peerConnection.addTrack(track, stream);
          });

          // Candidate Event, 當找到本地的candiDate後發送給server，包含自己的socket id
          peerConnection.onicecandidate = event => {
            if (event.candidate) {
              socket.emit('candidate', socketId, event.candidate);
            }
          };

          // 創建offer以及設定local description
          peerConnection
            .createOffer()
            .then(sdp => peerConnection.setLocalDescription(sdp))
            .then(() => {
              socket.emit('offer', socketId, peerConnection.localDescription);
              navigator.mediaDevices.ondevicechange = event => {
                console.log(event);
                socket.emit('cameraErr', socketId);
              };
              console.log(peerConnections);
            });

          peerConnection.oniceconnectionstatechange = event => {
            console.log(event, 'oniceconnectionstatechange');
          };
        } catch (error) {
          console.warn('fail to get stream', error);
        }
      });

      setNoDevice(false);
    }

    // eslint-disable-next-line
  }, [allVideo]);

  return (
    <Card className="shadow-lg p-3 mb-5 bg-white rounded">
      <h1 className="text-center my-4">BroadCast</h1>
      {false ? (
        <div className="text-center">
          <h1 className="text-center mt-4">no device</h1>
          <Button className="w-25" size="sm" onClick={setAllVideo}>
            刷新
          </Button>
        </div>
      ) : (
        <Card.Body>
          <Form>
            {/* FLAG */}
            <Form.Group as={Row} controlId="flag" className="">
              <Form.Label column sm="2">
                EGM IP
              </Form.Label>
              <Col sm="8" className="">
                <Form.Control readOnly defaultValue={egmIp} />
              </Col>
              {/* <Col sm="2" className="">
                <Button size="sm" onClick={getFlag}>
                  生成
                </Button>
              </Col> */}
            </Form.Group>

            {/* EGM */}
            <Form.Group as={Row} controlId="egm">
              <Form.Label column sm="2">
                EGM ID
              </Form.Label>
              <Col sm="8">
                <Form.Control as="select" onChange={handleSelectEgm} defaultValue="選擇EGM">
                  <option disabled>選擇EGM</option>
                  {egmList ? (
                    egmList.map(egm => (
                      <option id={egm.egmIp} key={egm.egmIp}>
                        {egm.egmId}
                      </option>
                    ))
                  ) : (
                    <option>找不到EGM</option>
                  )}
                </Form.Control>
              </Col>
              {/* <Col sm="2" className="">
                <Button size="sm" onClick={() => getEgmList('192.168.10.60')}>
                  刷新
                </Button>
              </Col> */}
            </Form.Group>

            {/* CAMERA */}
            <Form.Group as={Row} controlId="camera">
              <Form.Label column sm="2">
                攝影機
              </Form.Label>
              <Col sm="8" className="">
                <Form.Control as="select" onChange={handleChangeDevice} defaultValue="選擇攝影機">
                  <option disabled>選擇攝影機</option>
                  {allVideo.length ? allVideo.map(el => <option key={el.deviceId}>{el.deviceId}</option>) : <option>找不到設備</option>}
                </Form.Control>
              </Col>
              <Col sm="2" className="">
                <Button size="sm" onClick={getAllDevices}>
                  刷新
                </Button>
              </Col>
            </Form.Group>

            {/* Audio */}
            <Form.Group as={Row} controlId="audio">
              <Form.Label column sm="2">
                音頻
              </Form.Label>
              <Col sm="8" className="">
                <Form.Control as="select" onChange={handleChangeDevice} defaultValue="選擇音頻">
                  <option disabled>選擇音頻</option>
                  {allAudio.length ? allAudio.map(el => <option key={el.deviceId}>{el.deviceId}</option>) : <option>找不到設備</option>}
                </Form.Control>
              </Col>
              <Col sm="2" className="">
                <Button size="sm" onClick={getAllDevices}>
                  刷新
                </Button>
              </Col>
            </Form.Group>
          </Form>

          {/* VIDEO Stream */}
          <div style={box}>
            <video ref={camera} playsInline autoPlay muted style={{ width: 300 }} />
          </div>

          <Form.Group as={Row} className="">
            <Col sm="10" className="mx-auto text-center">
              <Button
                disabled={!selectEgm || !currentDevice}
                size="lg"
                className="w-25 p-2"
                variant="primary"
                onClick={() => handleDeviceMap(flag, +selectEgm, currentDevice.deviceId, currentDevice.label, egmIp, currentAudio.label, currentAudio.deviceId)}
              >
                確定
              </Button>
            </Col>
          </Form.Group>
        </Card.Body>
      )}
    </Card>
  );
};

const box = {
  width: 320,
  backgroundColor: '#ddd',
  margin: '30px auto',
  padding: 10,
};

export default BroadCast;
