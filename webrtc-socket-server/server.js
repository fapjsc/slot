const express = require('express');
// const https = require('https');
const http = require('http');
const fs = require('fs');
const options = {
  // key: fs.readFileSync('./192.168.10.101-key.pem'),
  // cert: fs.readFileSync('./192.168.10.101.pem'),
};

const app = express();
const httpsServer = http.createServer(options, app);

const io = require('socket.io')(httpsServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let broadcaster;

io.sockets.on('connection', socket => {
  // socket.join('room 237', () => {
  //   let rooms = Objects.keys(socket.rooms);
  //   console.log(rooms, '-======='); // [ <socket.id>, 'room 237' ]
  // });

  console.log('connection');
  socket.emit('connection');
  // Base Event
  socket.on('broadcaster', () => {
    broadcaster = socket.id;
    socket.emit('broadcaster');
    console.log('broadcaster', broadcaster);
  });
  // socket.on('watcher', deviceId => {
  //   console.log('watcher', socket.id, deviceId);
  //   socket.to(broadcaster).emit('watcher', socket.id, deviceId);
  // });

  socket.on('remoteUserSelectDevice', deviceId => {
    console.log('remoteUserSelectDevice', socket.id, deviceId);
    socket.to(broadcaster).emit('remoteUserSelectDevice', socket.id, deviceId);
  });

  socket.on('disconnect', () => {
    console.log('disconnect=====');
    console.log(broadcaster);
  });

  socket.on('cameraErr', clientSocketId => {
    socket.to(clientSocketId).emit('cameraErr');
  });

  // WebRTC Event
  socket.on('offer', (id, message) => {
    console.log('52', id, socket.id);
    // 發送camera web 的本地描述給client
    socket.to(id).emit('offer', socket.id, message); // id是client端的socketID, socket.id是camera web第一次建立連線的socketID, message是session
  });
  socket.on('answer', (id, message) => {
    socket.to(id).emit('answer', socket.id, message);
  });
  socket.on('candidate', (id, message) => {
    socket.to(id).emit('candidate', socket.id, message);
    console.log(id, socket.id, '61');
  });
});

httpsServer.listen(5000, () => console.log('server is running on port 5000'));
