
const signal_server_url = "http://localhost:3333/";
const socket = io.connect( signal_server_url);

//turn server 可能隨時關閉
const pcConfig = {
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
let peerConnection = [];
const wait = (timer) => {
  return new Promise( resolve => {
    setTimeout(() =>{
      resolve();
    }, timer)
  });
}
window.onbeforeunload = function(e) {
   connection_batch.forEach( async function(element, index) {
      socket.emit("bye", index);
  });  
};
const handleIceCandidate = (event) => {
  console.log('icecandidate event: ', event);
  var room = event.target.room;
  if (event.candidate) {
    sendMessage({
      type: 'candidate',
      label: event.candidate.sdpMLineIndex,
      id: event.candidate.sdpMid,
      candidate: event.candidate.candidate
    },room);
  } else {
    console.log('End of candidates.');
  }
}
const handleRemoteStreamRemoved = (event) => {
    console.log('Remote stream removed. Event: ', event);
}

const sendMessage = (message, room) => {
  console.log('Client sending message: ', message, room);
  socket.emit('message', message, room);
}
const doCall = async (room) => {
  await wait(100);
  console.log('Sending offer to peer');
  peerConnection[room].createOffer().then(
    sessionDescription =>{
        peerConnection[room].setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        sendMessage(sessionDescription, room);
    }, room)
    .catch(handleCreateOfferError);
}

const handleCreateOfferError  = (event) => {
  console.log('createOffer() error: ', event);
}
const onCreateSessionDescriptionError = (error) => {
  console.log('Failed to create session description: ' + error.toString());
}

socket.on('created', function(room) {
  console.log('Created room ' + room);
});

socket.on('full', function() {
  console.log('Room ' + room + ' is full');
});

socket.on('join', async function (room){
  console.log('Another peer made a request to join room ' + room);
  console.log('This peer is the initiator of room ' + room + '!');
  doCall(room);
});

socket.on('joined', function(room) {
  console.log('joined: ' + room);

});

socket.on('log', function(array) {
  console.log.apply(console, array);
});

socket.on('message', async function(message, room) {
  if(!isNaN(parseInt(room))) return;
  console.log('Client received message:', message,room);
  if (message.type === 'answer' ) {
      console.log(room);
      peerConnection[room].setRemoteDescription(new RTCSessionDescription(message));
  } 
  else if (message.type === 'candidate') {
    var candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate
    });
    peerConnection[room].addIceCandidate(candidate);
  } 
  console.log(peerConnection[room]);
});
var batch=0;
var connection_status = [] ;
console.log(navigator.mediaDevices.enumerateDevices());
const updateDevice = () => {

  Promise.all([navigator.mediaDevices.enumerateDevices()])
    .then(renderDevice).then(hangUpdevice);
}
const hangUpdevice = () => {
  console.log(connection_status);
   connection_status.forEach( async function(connected,device) {
      if(connected == false ) {
        socket.emit("bye", device);
        console.log("Interrupt "+ device);
      }
  });   
}
const renderDevice = (devices) => {
    return new Promise( async (resolve) => {
      connection_status.fill(false);
      devices[0].forEach( async function(element, index) {
        if(element.kind === "videoinput"){
          navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              deviceId: element.deviceId,
              width : 300, height:360
            }
          })
          .then(stream => {
            var device_str = "."+element.deviceId;
            console.log(peerConnection[device_str] );
            if(peerConnection[device_str] == null) {
              peerConnection[device_str] = new RTCPeerConnection(pcConfig);
              peerConnection[device_str].onicecandidate = handleIceCandidate;
              peerConnection[device_str].room = device_str;
              socket.emit('create', device_str);
              console.log('Attempted to create or  join room', device_str);
            }
            connection_status[device_str] = true;
            peerConnection[device_str].addStream(stream);
          }, element)
          .catch(function(e) {
              console.log('getUserMedia() error: ' + e.name);
          })
        }
      });
      await wait(2000);
      resolve();
    });
}
updateDevice()
navigator.mediaDevices.ondevicechange = function(event) {
  updateDevice();

}