
const signal_server_url = "http://192.168.10.115:3333/";
const socket = io.connect(signal_server_url);
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

let isStart = false;
let peerConnection = [];

const wait = (timer) => {
  return new Promise( resolve => {
    setTimeout(() =>{
      resolve();
    }, timer)
  });
};

window.onbeforeunload = function(e) {
  socket.emit("bye");
};

const handleIceCandidate = (event) => {
  console.log('icecandidate event: ', event);
  let room = event.target.room;
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

const handleRemoteHangup = () => {
}

socket.on("hello", (message) => {
  console.log("Hi, "+ message);
})

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
  else if (message.type === 'candidate' && isStart) {
    let candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate
    });
    peerConnection[room].addIceCandidate(candidate);
  } 
  console.log(peerConnection[room]);
});


let Devices = navigator.mediaDevices.enumerateDevices();

console.log(Devices);
Promise.all([Devices]).then(devices => {
  console.log(devices);
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
        console.log('Adding local stream.');
        let device_str = "."+element.deviceId.substring(0,7);
        peerConnection[device_str] = new RTCPeerConnection(pcConfig);
        peerConnection[device_str].onicecandidate = handleIceCandidate;
        peerConnection[device_str].addStream(stream);
        peerConnection[device_str].room = device_str;
        console.log(peerConnection[device_str]);
        socket.emit('create', device_str);
        console.log('Attempted to create or  join room', device_str);


      }, element)
      .catch(function(e) {
          console.log('getUserMedia() error: ' + e.name);
      })
    }
  });
})