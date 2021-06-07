import React, {useState, useContext, useCallback, useEffect} from 'react';
import {SocketContext} from './context/socket';
function Screen(props){
	const socket = useContext(SocketContext);
  //turn server 可能隨時關閉，設定iceServer
  const [isChannelReady,setChannelReady] = useState(false);
  var remoteStream;
	var remoteVideo;
  //turn server 可能隨時關閉，設定iceServer
  var peerConnectionConfig = {
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
	var room = props.room;
	const [peerConnection ,setpeerConnection] = useState(null); 
 	useEffect(() => {
      setpeerConnection(new RTCPeerConnection(peerConnectionConfig));
      /*
      用途:
        監聽頻道滿人事件
      參數 : 
        room : 頻道名稱
      運作:
        頻道滿人時執行  
      */
	    socket.on('full', function() {
	      console.log('Room ' + room + ' is full');
	    });
        socket.on('reconnect', async () => {
          await wait(5000);
          socket.emit("join", room);
        });     
      /*
      用途:
        監聽頻道其他人加入
      參數 : 
        room : 頻道名稱
      運作:
        當他人加入時輸出加入的頻道房間名
      */
	    socket.on('join', function (room){
	      console.log('Another peer made a request to join room ' + room);
	      console.log('This peer is the initiator of room ' + room + '!');
	      setChannelReady(true);
	    });
      /*
      用途:
        確認加入頻道房間
      參數 : 
        room : 頻道名稱
      運作:
        當加入房間時輸出房間名稱
      */
	    socket.on('joined', function(room) {
	      console.log('joined: ' + room);
	      setChannelReady(true);

	    });
      /*
      用途:
        監聽signaling server頻道的狀況 
      參數 : 
        status :狀態碼
      運作:
        如果是0，沒有camera end，離開遊戲
        如果是2，已經有其他人連，離開遊戲
      */
        socket.on("status", (status) => {

            if( status == 0) stop("相機異常!!!");

            if( status== 2) stop("遊戲進行中 !!!");
        })
      /*
      用途:
        監聽signaling server收到的訊息 
      參數 : 
        array: signaling server回傳的訊息
      運作:
        輸出signaling server傳回的array
      */
	    socket.on('log', function(array) {
	      console.log.apply(console, array);
	    });
      /*
      用途:
        監聽camera end 對應相機的拔除
      參數 : 
        r: 事件的的頻道房間
      運作:
        當頻道不同，不做任何事
        如果頻道相同，執行handleRemoteHangup離開遊戲
      */
      socket.on("bye", () => {
        handleRemoteHangup();
      })
      if (room !== '') {
        socket.emit('join', room);
        console.log('Attempted to join room', room);
      }
	 }, []);

	useEffect(async () => {
      /*
      用途:
        監聽 用於webrtc connection訊息交換的訊息
      參數 : 
        message :另一端發送的訊息
        room : 發送端所在的頻道房間
      運作:
        第一行判斷是否在同頻道
        判斷如果型態是offer，將offer設為物件peerConnection 的Remote Description
        如果型態是candidate，使用addIceCandidate 方法將資訊加入peerConnection
      */
        socket.on('message', async function(message) {
            console.log(peerConnection);
            // if(room != flag) return;
            if(isChannelReady ==false || peerConnection ==null) return;
                console.log('Client received message:', message);
            if (message.type === 'offer') {
                await wait(500);
                peerConnection.setRemoteDescription(new RTCSessionDescription(message
            ));
                doAnswer();
            } 
            else if (message.type === 'candidate' ) {
                await wait(1000);
                var candidate = new RTCIceCandidate({
                    sdpMLineIndex: message.label,
                    candidate: message.candidate
                });
                peerConnection.addIceCandidate(candidate);
            } 
        });
        if(isChannelReady ==false || peerConnection ==null) return;
        console.log("effect",isChannelReady);
        remoteVideo = document.querySelector('#remoteVideo');
        console.log(socket);
        createPeerConnection();
	},[isChannelReady,peerConnection]);
  /*
  用途:
    在 async function 中實作等待
  參數 : 
    timer : 等待毫秒
  運作:
    在Promise中使用setTimeout ，在特定毫秒後發送reslove  
  */
	const wait = (timer) => {
		return new Promise( resolve => {
			setTimeout(() =>{
				resolve();
			}, timer)
		});
	}
  /*
  用途:
    負責另一端點做資訊交換
  參數 : 
    message: 傳遞資訊
    room : 資訊交換的頻道
  運作:
    發送socket message事件
  */
  function sendMessage(message, room) {
    console.log('Client sending message: ', message, room);
    socket.emit('message', message, room);
  }
  /*
  用途:
    當遠端stream加入，觸發，peerConnection物件的實作
  參數 : 
    event : 事件參數
  運作:
    發送socket message事件
  */
  function handleRemoteStreamAdded(event) {
    console.log('Remote stream added.');
    remoteStream = event.stream;
    remoteVideo.srcObject = remoteStream;
  }
  /*
  用途:
    遠端stream 刪除處置，peerConnection物件的實作
  參數 : 
    event : 事件參數
  運作:
    當peerConnection認定遠端stream已刪除，執行console.log
  */
  function handleRemoteStreamRemoved(event) {
    console.log('Remote stream removed. Event: ', event);
  }
  /*
  用途:
    camera end出錯時的處置
  運作:
    執行stop
  */
  function handleRemoteHangup() {
    console.log('Session terminated.');
    stop("相機異常!!!");
  }
  /*
  用途:
    離開遊戲
  參數:
    message : 將要提示的訊息
  運作:
    alert 訊息，告知signaling server 離開頻道再跳離遊戲
  */
  function stop(message) {
      alert(message);
      socket.emit("leave", room);
      props.leave();
  }
  /*
  用途:
    為peerConnection設定遠端stream加入及刪除時的實作
  運作:
    嘗試設定，抓錯誤
  */
  async function createPeerConnection() {
      try {
          peerConnection.onaddstream = handleRemoteStreamAdded;
          peerConnection.onremovestream = handleRemoteStreamRemoved;
      } catch (e) {
          console.log('Failed to create PeerConnection, exception: ' + e.message);
          alert('Cannot create RTCPeerConnection object.');
          return;
      }
  }
  /*
  用途:
    建立anwser設定description
  運作:
    等到anwser建立，執行setLocalAndSendMessage，出錯執行onCreateSessionDescriptionError
  */
  function doAnswer() {
      console.log('Sending answer to peer.');
      peerConnection.createAnswer().then(
        setLocalAndSendMessage,
        onCreateSessionDescriptionError
      );
  }
  /*
  用途:
    建立anwser設定description
  參數:
    sessionDescription : 
  運作:
    將anwser 設定為local description ，並發送anwser給同個頻道的camera end
  */
  function setLocalAndSendMessage(sessionDescription) {
      peerConnection.setLocalDescription(sessionDescription);
      console.log('setLocalAndSendMessage sending message', sessionDescription);
      sendMessage(sessionDescription,room);
  }
  /*
  用途:
    處理session建立的錯誤
  參數:
    error : 錯誤訊息
  運作:
    輸出error
  */
  function onCreateSessionDescriptionError(error) {
    console.log('Failed to create session description: ' + error.toString()); 
  }
        setInterval(() => {
            if(peerConnection == null) return;
            console.log()
        }, 3000)
    var lastBytesReceived = 0;
    var checkBytesReceived = setInterval(() => {
        if(peerConnection == null) return;
        Promise.all([peerConnection.getStats()]).then((stats) => {
            stats[0].forEach( (element) => {
                if(element.type == 'inbound-rtp'){
                    console.log(lastBytesReceived, element.bytesReceived );
                    if(lastBytesReceived == element.bytesReceived) {
                        stop("相機異常");
                    }
                    lastBytesReceived = element.bytesReceived 
                }
                                    // console.log(element);
                                    // console.log(element);
            });
        })
    }, 3000)  ;
	return (
		<video id="remoteVideo" autoPlay mute="true"> </video>
	);
}
export default Screen;