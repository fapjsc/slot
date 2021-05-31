// var deviceId;
// signal_server_url
// if(signal_server_url != "http://220.135.67.240:3443"){
//   deviceId = "a7117e38aa22ed4ebf83e272b54ef07adcf35691f1fe696d91d2c841883c5e8c"; 
// }
// else {
//   deviceId =null;
// }

const signal_server_url = "http://220.135.67.240:3333/";
const socket = io.connect( signal_server_url);
// var localStream = [];
var isStart =false;
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
// const addLocalStream = (stream) => {
//   console.log(element);
//   console.log('Adding local stream.');
//   peerConnection[stream.id] = new RTCPeerConnection(pcConfig);
//   peerConnection[stream.id].onicecandidate = handleIceCandidate;
//   peerConnection[stream.id].addStream(stream);
//   socket.emit('create or join', stream.id);
// }
const sendMessage = (message, room) => {
  console.log('Client sending message: ', message, room);
  socket.emit('message', message, room);
}
const doCall = async (room) => {
  await wait(1000);
  console.log('Sending offer to peer');
  peerConnection[room].createOffer().then(
    sessionDescription =>{
        peerConnection[room].setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        sendMessage(sessionDescription, room);
    }, room)
    .catch(handleCreateOfferError);
}
// const setLocalAndSendMessage = (sessionDescription) => {
//   peerConnection[room].setLocalDescription(sessionDescription);
//   console.log('setLocalAndSendMessage sending message', sessionDescription);
//   sendMessage(sessionDescription);

// }
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
  console.log('Client received message:', message,room);
  if (message.type === 'answer' ) {
      console.log(room);
      peerConnection[room].setRemoteDescription(new RTCSessionDescription(message));
  } 
  else if (message.type === 'candidate' && isStart) {
    var candidate = new RTCIceCandidate({
      sdpMLineIndex: message.label,
      candidate: message.candidate
    });
    peerConnection[room].addIceCandidate(candidate);
  } 
  else if (message === 'bye') {
    handleRemoteHangup();
  }
  console.log(peerConnection[room]);
});



// const addVideo = (stream) => {
//   var video = document.createElement("video");
//   console.log(video);
//   window.stream = stream;
//   video.srcObject = stream;
//   document.getElementById("video").appendChild(video);

// }
var Devices = navigator.mediaDevices.enumerateDevices();
// navigator.mediaDevices.getUserMedia({
//   audio: false,
//   video: {
//     deviceId: "2d8f7bbc7ca168f1c0ef0d7173f44aede422cb817aea27057d521b89f93a529c",
//     width : 300, height:360
//   }
// }).then(addVideo)
// .catch(function(e) {
//     console.log('getUserMedia() error: ' + e.name);
// })
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
        peerConnection[element.deviceId.substring(0,7)] = new RTCPeerConnection(pcConfig);
        peerConnection[element.deviceId.substring(0,7)].onicecandidate = handleIceCandidate;
        peerConnection[element.deviceId.substring(0,7)].addStream(stream);
        peerConnection[element.deviceId.substring(0,7)].room = element.deviceId.substring(0,7);
        console.log(peerConnection[element.deviceId.substring(0,7)]);
        socket.emit('create or join', element.deviceId.substring(0,7));
        console.log('Attempted to create or  join room', element.deviceId.substring(0,7));


      }, element)
      .catch(function(e) {
          console.log('getUserMedia() error: ' + e.name);
      })
    }
  });
})