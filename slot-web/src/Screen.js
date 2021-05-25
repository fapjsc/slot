import React, {useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from './context/socket';
function Screen(){
	const socket = useContext(SocketContext);
    const [isChannelReady,setChannelReady] = useState(false);
    const [isCallee,setCallee] = useState(false);
    var isStarted = false;
    const [localStream, setlocalStream] = useState(null);
    var remoteStream;
    var turnReady;
	var remoteVideo
    var pcConfig = {
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
    var sdpConstraints = {
      offerToReceiveAudio: true,
      offerToReceiveVideo: true
    };
	var room = 'foo';
	const [pc ,setPc] = useState(new RTCPeerConnection(pcConfig));
	console.log(pc);
    /////////////////////////////////////////////

 	useEffect(() => {
	    socket.on('created', function(room) {
	      console.log('Created room ' + room);
	      setCallee(true);
	    });

	    socket.on('full', function() {
	      console.log('Room ' + room + ' is full');
	    });

	    socket.on('join', function (room){
	      console.log('Another peer made a request to join room ' + room);
	      console.log('This peer is the initiator of room ' + room + '!');
	      setChannelReady(true);
	      console.log()
	    });

	    socket.on('joined', function(room) {
	      console.log('joined: ' + room);
	      setChannelReady(true);

	    });

	    socket.on('log', function(array) {
	      console.log.apply(console, array);
	    });

	    if (room !== '') {
	      socket.emit('create or join', room);
	      console.log('Attempted to create or  join room', room);
	    }

	    navigator.mediaDevices.getUserMedia({

	      audio: false,
	      video: {width : 300, height:360, deviceId : "880bdb9d33e0d5811a8010ac923bbaa3413c81e6cd4a202f5aace7cdc8c44e43"}
	    })
	    .then(gotStream)
	    .catch(function(e) {
	      alert('getUserMedia() error: ' + e.name);
	    });

	 }, []);

	useEffect(() => {
	    socket.on('message', async function(message) {
	      console.log('Client received message:', message);
	      console.log(pc,isCallee,isChannelReady);
	      if(! isStarted) wait(3000);
	      if (message.type === 'offer' && isCallee && isChannelReady) {
	        pc.setRemoteDescription(new RTCSessionDescription(message
	          ));
	        doAnswer();
	      } 
	      else if (message.type === 'answer' && isChannelReady) {
	        pc.setRemoteDescription(new RTCSessionDescription(message));
	      } 
	      else if (message.type === 'candidate' ) {
	        var candidate = new RTCIceCandidate({
	          sdpMLineIndex: message.label,
	          candidate: message.candidate
	        });
	        pc.addIceCandidate(candidate);
	      } 
	      else if (message === 'bye') {
	        handleRemoteHangup();
	      }
	    });
	},[isCallee,isChannelReady]);

	useEffect(() => {
		console.log("effect",isCallee,isChannelReady,localStream);
		if((isCallee == true || isChannelReady == true) &&localStream != null) {
	    	remoteVideo = document.querySelector('#remoteVideo');
		    console.log(socket);
		    maybeStart(pc);
		}
	}, [isCallee,isChannelReady,localStream,pc])

	const wait = (timer) => {
		return new Promise( resolve => {
			setTimeout(() =>{
				resolve();
			}, timer)
		});
	}
    function sendMessage(message) {
      console.log('Client sending message: ', message);
      socket.emit('message', message);
    }

    function maybeStart(pc) {
      console.log('>>>>>> creating peer connection');
      createPeerConnection();
      pc.addStream(localStream);
      isStarted = true;
      if(!isCallee) doCall();
    }

    function gotStream(stream) {
      console.log('Adding local stream.');
      setlocalStream(stream);
      sendMessage('got user media');
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
      sendMessage('bye');
    }

    function handleRemoteHangup() {
      console.log('Session terminated.');
      stop();
    }

    function stop() {
      isStarted = false;
      // pc.close();
      // setPc(null);
    }

    window.onbeforeunload = function() {
      sendMessage('bye');
    };

    /////////////////////////////////////////////////////////

    async function createPeerConnection() {
      try {
      	if(!isCallee){
	        pc.onicecandidate = handleIceCandidate;
	        pc.onaddstream = handleRemoteStreamAdded;
	        pc.onremovestream = handleRemoteStreamRemoved;
   		}
      } catch (e) {
        console.log('Failed to create PeerConnection, exception: ' + e.message);
        alert('Cannot create RTCPeerConnection object.');
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
        });
      } else {
        console.log('End of candidates.');
      }
    }

    function handleCreateOfferError(event) {
      console.log('createOffer() error: ', event);
    }

    function doCall() {
      console.log('Sending offer to peer');
      pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
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
      sendMessage(sessionDescription);
    }

    function onCreateSessionDescriptionError(error) {
      console.log('Failed to create session description: ' + error.toString());
    }
    const click = () => {
    	room = "sadsdf";
    	socket.emit("full")
    }
	return (
		<video id="remoteVideo" autoPlay> </video>
	);
}
export default Screen;