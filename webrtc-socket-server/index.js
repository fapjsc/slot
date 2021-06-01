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
var device_map = [];
io.on('connection', function(socket) {
  console.log("connected...");
  socket.on("hello",(message) => {
    console.log(message+ " send message");
    socket.emit("hello", message);
    // socket.emit("hello", "His ,"+ message+" !!");
  })
  // convenience function to log server messages on the client
  function log() {
    var array = ['Message from server:'];
    array.push.apply(array, arguments);
    socket.emit('log', array);
  }

  socket.on('message', function(message, room) {

    if(!isNaN(parseInt(room))) {
      var room = device_map[parseInt(room)];
    }
    else {
      var room = device_map.indexOf(room);
    }
    log('Client said: ', message, room);
    // for a real app, would be room-only (not broadcast)

    socket.broadcast.emit('message', message, room);
  });

  socket.on('create', (device) => {
      var clientsInRoom = io.sockets.adapter.rooms[device];
      var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
      log('Room ' + device + ' now has ' + numClients + ' client(s)');
      socket.join(device);
      log('Client ID ' + socket.id + ' created room ' + device);
      socket.emit('created', device);
      device_map.push(device);
  });

  socket.on('join', function(room) {
    log('Received request to create or join room ' + room);
    var device_id = device_map[parseInt(room)];
    var clientsInRoom = io.sockets.adapter.rooms[device_id];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    log('Room ' + device_id + ' now has ' + numClients + ' client(s)');
    if (numClients === 1) {
      log('Client ID ' + socket.id + ' joined room ' + device_id);
      io.sockets.in(device_id).emit('join', device_id);
      socket.join(device_id);
      socket.emit('joined', room);
    } 
    else if(numClients > 1 ){ // max two clients
      socket.emit('full', room);
    }
  });
  socket.on("getDeviceId",(room) => {
    socket.emit("getDeviceId", device_map[parseInt(room)]);
  });

  socket.on('bye', function(){
    device_map.length = 0;
    console.log('received bye');
    socket.broadcast.emit('bye');
  });
  socket.on('leave', function(room){
    socket.leave(room);
    console.log("leave room");
  })
});

const printClientNum = () => {
      var device_id = device_map[parseInt(room)];
    var clientsInRoom = io.sockets.adapter.rooms[device_id];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    log('Room ' + device_id + ' now has ' + numClients + ' client(s)');
}
