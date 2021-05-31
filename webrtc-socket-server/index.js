'use strict';

// var os = require('os');
// var nodeStatic = require('node-static');
var fs = require('fs');
var cors = require('cors');
var express = require("express");
var app = express();
app.use(cors());
// app.use(index);

app.use("/", express.static(__dirname + "/"));
// var options = {
//   key: fs.readFileSync('./server.key'),
//   ca: [fs.readFileSync('./server.csr')],
//   cert: fs.readFileSync('./server.crt')
// };
var server = require("http").Server(app);

var socketIO = require('socket.io')
server.listen(3333);
// app.get('/', function(req, res) {
//     res.sendfile(__dirname + '/index.html');
// });
// app.get('/js/main.js', function(req, res) {
//     res.sendfile(__dirname + '/js/main.js');
// });
// app.get('/js/main.js', function(req, res) {
//     res.sendfile(__dirname + '/js/main.js');
// });
// var options = {
//   key: fs.readFileSync('./server.key'),
//   ca: [fs.readFileSync('./server.csr')],
//   cert: fs.readFileSync('./server.crt')
// };
// var options = {}; 
// var app = http.createServer(options, function (req, res) {
//   // res.end('hello world\n');  
//     fileServer.serve(req, res);
// }).listen(3443);
var io = socketIO.listen(server);

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
    log('Client said: ', message, room);
    // for a real app, would be room-only (not broadcast)

    socket.broadcast.emit('message', message, room);
  });

  socket.on('create or join', function(room) {
    log('Received request to create or join room ' + room);

    var clientsInRoom = io.sockets.adapter.rooms[room];
    var numClients = clientsInRoom ? Object.keys(clientsInRoom.sockets).length : 0;
    log('Room ' + room + ' now has ' + numClients + ' client(s)');

    if (numClients === 0) {
      socket.join(room);
      log('Client ID ' + socket.id + ' created room ' + room);
      socket.emit('created', room);

    } else if (numClients === 1) {
      log('Client ID ' + socket.id + ' joined room ' + room);
      io.sockets.in(room).emit('join', room);
      socket.join(room);
      socket.emit('joined', room);
    } else { // max two clients
      socket.emit('full', room);
    }
  });
  
  socket.on('ipaddr', function() {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
      ifaces[dev].forEach(function(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
          socket.emit('ipaddr', details.address);
        }
      });
    }
  });

  socket.on('bye', function(){
    console.log('received bye');
  });
  socket.on('leave', function(room){
    socket.leave(room);
    console.log("leave room");
  })
  socket.on("check to connect" , function(){
    socket.in(room).emit("check to connect" , numClients);
  })
});
