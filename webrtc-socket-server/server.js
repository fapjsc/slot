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
  console.log('connection', socket.id);

  socket.on('createRoom', roomId => {
    socket.join(roomId);
    socket.emit('create-room-message', `room: ${roomId} 已經建立`);

    console.log(`${socket.id}建立 room: ${roomId}`);
  });

  socket.on('joinRoom', (roomId, cameraId, audioId) => {
    socket.join(roomId);
    console.log(`${socket.id} join Room: ${roomId} Camera: ${cameraId}, Audio: ${audioId}`);
    io.to(roomId).emit('sendCamera', socket.id, cameraId, audioId);
  });

  // socket.on('remoteUserSelectDevice', (deviceId, audioId) => {
  //   console.log('remoteUserSelectDevice', socket.id, deviceId, audioId);
  //   socket.to(broadcaster).emit('remoteUserSelectDevice', socket.id, deviceId, audioId);
  // });

  socket.on('disconnect', () => {
    console.log('disconnect=====');
    console.log(broadcaster);
    console.log(socket.id);
  });

  socket.on('closePeer', (id, stream) => {
    console.log('closePeer =====', id);
    socket.to(broadcaster).emit('closePeerCon', id);
  });

  socket.on('cameraErr', clientSocketId => {
    console.log(clientSocketId);
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
