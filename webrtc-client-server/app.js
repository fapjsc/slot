

//turn server 可能隨時關閉，設定iceServer
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

let peerConnection = [];
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
  實作伺服器關閉或重整前置
參數 : 
  e : 無用
運作:
  告知signaling server所有由此camera end的deviceId
*/

window.onbeforeunload = function(e) {
    Object.entries(device_status).forEach(([device]) => {
        socket.emit("bye", device);
    });  
};
/*
用途:
  IceCandidate message發送，peerConnection物件的實作
參數 : 
  event : 事件參數
運作:
  當peerConnection認定找到候選路徑，發送message給加入至room的react end
*/
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
/*
用途:
  遠端stream 刪除處置，peerConnection物件的實作
參數 : 
  event : 事件參數
運作:
  當peerConnection認定遠端stream已刪除，執行console.log
*/
const handleRemoteStreamRemoved = (event) => {
    console.log('Remote stream removed. Event: ', event);
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
const sendMessage = (message, room) => {
    console.log('Client sending message: ', message, room);
    socket.emit('message', message, room);
}
/*
用途:
  發送offer
參數 : 
  room : 資訊交換的頻道
運作:
  非同步運作，先建立offer，
  再將頻道對應的connection的LocalDescription設為傳送的offer
*/
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
/*
用途:
  建立offer錯誤處理
參數 : 
  event : 事件參數
運作:
  當錯誤發生，將event 輸出
*/
const handleCreateOfferError  = (event) => {
    console.log('createOffer() error: ', event);
}
/*
用途:
  設定local session錯誤處理
參數 : 
  event : 事件參數
運作:
  當錯誤發生，將event 輸出
*/
const onCreateSessionDescriptionError = (error) => {
    console.log('Failed to create session description: ' + error.toString());
}
/*
用途:
  signaling server重啟後頻道狀態更新
運作:
  重新加入camera end 到他自己的頻道
  會先等待signaling server 同步 agent server 的map
*/
  socket.on("reconnect", async () => {
    await wait(1000);
    updateDevice();
  })
/*
用途:
  確認頻道房間建立
參數 : 
  room : 頻道名稱
運作:
  當頻道建立console log
*/
socket.on('created', function(room) {
    console.log('Created room ' + room);
});
/*
用途:
  監聽頻道其他人加入
參數 : 
  room : 頻道名稱
運作:
  當他人加入時輸出加入的頻道房間名
*/
socket.on('join', async function (room){
    console.log('Another peer made a request to join room ' + room);
    console.log('This peer is the initiator of room ' + room + '!');
    doCall(room);
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
});
/*
用途:
  監聽signaling server收到的訊息及狀況 
參數 : 
  array: 回傳訊息
運作:
  輸出signaling server傳回的array
*/
socket.on('log', function(array) {
    console.log.apply(console, array);
});
/*
用途:
  監聽 用於webrtc connection訊息交換的訊息
參數 : 
  message :另一端發送的訊息
  room : 發送端所在的頻道房間
運作:
  第一行判斷頻道名稱是否合法，
  判斷如果型態是anwser，將anwser設為物件peerConnection 的Remote Description
  如果型態是candidate，使用addIceCandidate 方法將資訊加入peerConnection
*/
socket.on('message', async function(message, room) {
    if(room[0] != '.') return;
  // if(!isNaN(parseInt(room))) return;
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
var device_status = [] ;
/*
用途:
  取得新增相機和刪除相機，與signaling server device_map 同步

運作:
  透過Promise物件非同步依序執行
  - navigator.mediaDevices.enumerateDevices()
  - renderDevice 
  - hangUpDevice 
問題:
  無法確保hangUpDevice 在renderDevice完全更新device_status後做
*/
const updateDevice = () => {
  console.log(navigator.mediaDevices.enumerateDevices());
  Promise.all([navigator.mediaDevices.enumerateDevices()])
    .then(fillStatus)
    .then(renderDevice)
    .then(hangUpDevice);
}
/*
用途:
  透過signaling server告知此device的頻道房間已不可用

運作:
  前個步驟更新完device_status後，找出device_status值為false
  的索引值，告知signaling server 
*/
const hangUpDevice = (status) => {
  console.log(status);
   Object.entries(status).map( ([device, value]) => {
      if(value == false ) {
        socket.emit("bye", device);
        console.log("Interrupt "+ device);
      }
  });   
}
const fillStatus = (device) => {
    return new Promise(async resolve => {
      Object.entries(device_status).map( function([index, value]) {
        device_status[index] = false;
      });
      await wait(1000);
      console.log(device_status);
        console.log("devices_status OK");
      resolve(device);
    })
}
/*
用途:
  針對device新增建立新的connection和透過device_status取得刪除device資訊

參數 :
  devices : 上個Promise傳回的device資訊
運作:
  對新加入的device新增peer connection並加入 stream 、建立頻道房間
  為新的device建立device_status索引，device_status是布林陣列，
  再次執行時，所有值會先設為false，再foreach 每個抓到的device
  將其個別device_status 設為true，某些device沒抓到，
  他先前保留在device_status的值必為false，即拔除的device

*/
const renderDevice = (devices) => {
    return new Promise( async (resolve) => {
        var device_str;
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
                device_str = "."+element.deviceId;
                console.log(peerConnection[device_str] );
                if(peerConnection[device_str] == null) {
                    peerConnection[device_str] = new RTCPeerConnection(pcConfig);
                    peerConnection[device_str].onicecandidate = handleIceCandidate;
                    peerConnection[device_str].room =  device_str;
                }
                peerConnection[device_str].addStream(stream);
                device_status[device_str] = true;
                socket.emit('create', device_str);
                console.log('Attempted to create or  join room', device_str);
            }, element)
            .catch(function(e) {
                console.log('getUserMedia() error: ' + e.name);
            })
        }
      });
      await wait(1000);
      console.log("render OK")
      resolve(device_status);
    });
}


/*
用途:
  監聽硬體變更
參數 : 
  event : 事件參數
運作:
  執行updateDevice
*/
navigator.mediaDevices.ondevicechange = function(event) {
    updateDevice();

}
console.log(socket);
updateDevice();

