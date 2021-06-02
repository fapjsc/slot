import React, {useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from './context/socket';
function Screen(props) {
  const socket = useContext(SocketContext);
  const [isChannelReady,setChannelReady] = useState(false);
  const [pc ,setPc] = useState(null);
  let room = props.room; 
  let isStarted = false;
  let remoteStream;
  let turnReady;
  let remoteVideo;
  let pcConfig = {
    'iceServers': [{
      'urls': 'stun:stun.l.google.com:19302'
    },
            {
              'urls': 'turn:18.191.253.152:3478',
              'username': 'alex',
              'credential': 'abcdefg'
          }
          ]
  };
  // Set up audio and video regardless of what devices are present.
  let sdpConstraints = {
    offerToReceiveAudio: true,
    offerToReceiveVideo: true
  };
  useEffect(() => {
      setPc(new RTCPeerConnection);
      socket.on('full', function() {
        console.log('Room ' + room + ' is full');
      });

      socket.on('join', function (room){
        console.log('Another peer made a request to join room ' + room);
        console.log('This peer is the initiator of room ' + room + '!');
        setChannelReady(true);
      });

      socket.on('joined', function(room) {
        console.log('joined: ' + room);
        setChannelReady(true);

      });

      socket.on('log', function(array) {
        console.log.apply(console, array);
        let clinet_num = array[1].split(" ")[4];

        if( clinet_num == 0) {
          alert("相機異常!!!");
          props.leave();
        }

        if( clinet_num == 2){
          alert("遊戲進行中 !!!");
          props.leave();
        }

      });

      socket.on("bye", () => {
        alert("相機異常!!!");
        handleRemoteHangup();
      })
      if (room !== '') {
        socket.emit('join', room);
        console.log('Attempted to join room', room);
      }
   }, []);

  useEffect(async () => {
      socket.on('message', async function(message, flag) {
                    console.log(pc);
        if(room != flag) return;
        if(isChannelReady ==false || pc ==null) return;
        console.log('Client received message:', message);
        if (message.type === 'offer') {
          await wait(500);
          pc.setRemoteDescription(new RTCSessionDescription(message
            ));
          doAnswer();
        } 
        else if (message.type === 'candidate' ) {
          await wait(1000);
          let candidate = new RTCIceCandidate({
            sdpMLineIndex: message.label,
            candidate: message.candidate
          });
          pc.addIceCandidate(candidate);
        } 
      });
  },[isChannelReady,pc]);

  useEffect(async () => {
    console.log("effect",isChannelReady);
    if (isChannelReady == false || pc ==null) return;
    remoteVideo = document.querySelector('#remoteVideo');
    console.log(socket);
    maybeStart();
  }, [isChannelReady,pc])

  const wait = (timer) => {
    return new Promise( resolve => {
      setTimeout(() =>{
        resolve();
      }, timer)
    });
  }
  function sendMessage(message, room) {
    console.log('Client sending message: ', message, room);
    socket.emit('message', message, room);
  }

  function maybeStart() {
    console.log('>>>>>> creating peer connection');
    createPeerConnection();
    isStarted =true;
  }


  function handleRemoteStreamAdded(event) {
    console.log('Remote stream added.');
    remoteStream = event.stream;
    remoteVideo.srcObject = remoteStream;
  }

  function handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
  }

  function hangup() {
    console.log('Hanging up.');
    stop();
  }

  function handleRemoteHangup() {
    console.log('Session terminated.');
    stop();
  }

  function stop() {
    setChannelReady(false);
    socket.emit("leave", room);
    props.leave();
    // socket.removeAllListeners();

  }
  window.onbeforeunload = function() {
      ;  
  };
  /////////////////////////////////////////////////////////

  async function createPeerConnection() {
    try {
      // pc.onicecandidate = handleIceCandidate;
      pc.onaddstream = handleRemoteStreamAdded;
      pc.onremovestream = handleRemoteStreamRemoved;
    } catch (e) {
      console.log('Failed to create PeerConnection, exception: ' + e.message);
      alert('Cannot create RTCPeerConnection object.');
      if(pc == null) maybeStart();
      return;
    }
  }

  function handleIceCandidate(event) {
    console.log('icecandidate event: ', event);
    if (event.candidate) {
      sendMessage({
        type: 'candidate',
        label: event.candidate.sdpMLineIndex,
        id: event.candidate.sdpMid,
        candidate: event.candidate.candidate
      }, room);
    } else {
      console.log('End of candidates.');
    }
  }

  function handleCreateOfferError(event) {
    console.log('createOffer() error: ', event);
  }

  function doAnswer() {
    console.log('Sending answer to peer.');
    pc.createAnswer().then(
      setLocalAndSendMessage,
      onCreateSessionDescriptionError
    );
  }

  function setLocalAndSendMessage(sessionDescription) {
    pc.setLocalDescription(sessionDescription);
    console.log('setLocalAndSendMessage sending message', sessionDescription);
    sendMessage(sessionDescription,room);
  }

  function onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description: ' + error.toString());
  }

  return (
    <video id="remoteVideo" autoPlay mute="true"> </video>
  );
}

export default Screen;