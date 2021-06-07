'use strict';

var fs = require('fs');
var cors = require('cors');
var express = require("express");
var app = express();

app.use(cors());

app.use("/", express.static(__dirname + "/"));

var server = require("http").Server(app);

var socketIO = require('socket.io')
server.listen(3333);

var io = socketIO.listen(server);
//與agent server device map同步
var device_map = [];
const axios = require('axios').default;
const agent_url = "http://192.168.10.240/"
io.on('connection', function(socket) {
    console.log("connected...");
    /*
    用途:
      發送log 給其他end 供debug
    運作:
      發送socket 事件
    */
    function log() {
        var array = ['Message from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
    }
    /*
    用途:
      頻道名稱轉換
    參數 : 
      room : 欲轉換的名稱
    運作:
      將名稱嘗試轉成數字，若為NaN ，為device map之值，將其轉成其對應索引
      若非NaN，為device map之索引，將其轉成對應之值，然後回傳
    */
    const convertRoom = (room) => {
        if(!isNaN(parseInt(room))) {
          var room = device_map[parseInt(room)];
        }
        else {
          var room = device_map.indexOf(room);
        }
        return room ;
    }
    /*
    用途:
      轉發兩端點之交換訊息
    參數 : 
      room : 交換雙方的頻道房間
    運作:
      先將房間名稱轉成端點相容形式，
      再進行廣播，透過夾帶參數判斷是否可以接收訊息
    */
    socket.on('message', function(message,room) {
        var device;
        log('Client said: ', message, room);
        room = convertRoom(room);
        //取得頻道名稱
        if(!isNaN(parseInt(room))) device = device_map[room];
        else device = room;

        io.sockets.in(device).emit('message', message, room);
    });
    /*
    用途:
      建立頻道房間
    參數 : 
      device: 房間名稱，用device id命名
    運作:
      先將房間建立者加入頻道房間，發送已建立事件，將房間名稱堆疊至device map
    */
    socket.on('create', async (device) => {
        var clientsInRoom = io.sockets.adapter.rooms[device];
        console.log(io.sockets.adapter.rooms,clientsInRoom);
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        log('Room ' + device + ' now has ' + numClients + ' client(s)');
        socket.join(device);
        log('Client ID ' + socket.id + ' created room ' + device);
        socket.emit('created', device);
        if(device_map.indexOf(device) == -1){
            device_map.push(device);
            pushAgent(device_map.length -1, device);
        }
        console.log(device_map);
    });
    /*
    用途:
      監聽除創建之外之人加入房間
    參數 : 
      room: react end的頻道房間名
    運作:
      透過device map找到其對應之device id加入房間，發送加入房間事件給camera end，
      依device_id 找到camera end需要提供offer 之connection，並回傳room狀態給react 
      end 做相應處理 
    */
    socket.on('join', function(room) {
        log('Received request to create or join room ' + room);
        var device_id = convertRoom(room);
        var clientsInRoom = io.sockets.adapter.rooms[device_id];
        var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
        log('Room ' + room + ' now has ' + numClients + ' client(s)');
        if (numClients === 1) {
            log('Client ID ' + socket.id + ' joined room ' + room);
            io.sockets.in(device_id).emit('join', device_id);
            socket.join(device_id);
            socket.emit('joined', room);
        } 
        else if(numClients > 1 ){ // max two clients
          socket.emit('full', room);
        }
        console.log(socket.id);
        socket.emit("status", numClients);
    });
    /*
    用途:
      監聽camera end某相機被拔除
    參數 : 
      device: 被拔除的相機id
    運作:
      發送給相同頻道房間的react end
    */
    socket.on('bye', function(device){
        var room = convertRoom(device) ; 
        socket.leave(device);
        console.log('received bye from '+ device );
        socket.broadcast.in(device).emit('bye');
    });
    /*
    用途:
      監聽react end 主動離開遊戲
    參數 : 
      room : react end 頻道名稱
    運作:
      讓發發送事件者離開其遊戲頻道
    */
    socket.on('leave', function(room){
        socket.leave(room);
        console.log("leave room");
    })
});

//更新agent server device_map
const pushAgent = (index, id) => {
  var request = {
      "indexIDMaps": [
      {
          "cameraIdx": index,
          "cameraID": id
      }
  ]
  }
  axios.put(agent_url+'/NotifyCameraApi', request);
}
//從agent server回復 device_map
const pullAgent = () => {
  axios.get(agent_url+'/NotifyCameraApi').then(data => {
    cameras = data.indexIDMaps;
    if(cameras.cameraIdx != null && cameras.cameraIdx >= 0) {
      device_map[cameras.cameraIdx] = cameras.cameraIdx  
    }

  });
}
// const mapAgent = (obj_array) => {
//   var request = {
//       "indexIDMaps": obj_array
//   }
//   axios.put(agent_url+'/NotifyCameraApi', request);
// }

