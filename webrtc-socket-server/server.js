const express = require('express');
const http = require('http');
const https = require('https');
const fs = require('fs');
const options = {
  key: fs.readFileSync('./192.168.10.109-key.pem'),
  cert: fs.readFileSync('./192.168.10.109.pem'),
};

const app = express();

const httpsServer = https.createServer(options, app);

const io = require('socket.io')(httpsServer, {
  cors: {
    origin: 'https://192.168.10.105:3000',
    methods: ['GET', 'POST'],
  },
});

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
  console.log(`connection: [${socket.id}]`);

  // console.log(socketIO.engine.clientsCount);
  // console.log(`連線數量：[${io.engine.clientsCount}]`);
  // console.log(`房間數量：[${socket.rooms.size}]`);
  // for (let [key, value] of socket.rooms.entries()) console.log(`房間名稱：[${value}]`);

  socket.on('createRoom', roomId => {
    socket.join(roomId);
    io.to(roomId).emit('create-room-message', `room: ${roomId} 已經建立`);
    console.log(`房間數量：[${socket.rooms.size}]`);
    for (let [key, value] of socket.rooms.entries()) {
      console.log(`房間名稱：[${value}]`);
    }
  });

  socket.on('joinRoom', (roomId, cameraId, audioId) => {
    socket.join(roomId);
    console.log(`${socket.id} join Room: [${roomId}] Camera:[ ${cameraId}], Audio: [${audioId}]`);
    io.to(roomId).emit('sendCamera', socket.id, cameraId, audioId);

    const rooms = Object.keys(socket.rooms);
    console.log(rooms);
  });

  socket.on('unsubscribe', roomId => {
    console.log(`[${socket.id}] is leave [Room:${roomId}]`);
    socket.leave(roomId);
    socket.to(roomId).emit('userLeft', socket.id);
  });

  socket.on('refresh', roomId => {
    console.log('refresh===', roomId);
    socket.to(roomId).emit('refresh', roomId);
  });

  socket.on('refreshed', roomId => {
    console.log('==== call clientReload ======', roomId);
    socket.to(roomId).emit('clientReload');
  });

  socket.on('disconnect', () => {
    console.log('disconnect=====');
  });

  socket.on('closePeer', id => {
    console.log('closePeer =====', id);
    socket.to(broadcaster).emit('closePeerCon', id);
  });

  socket.on('cameraErr', roomId => {
    console.log(roomId, 'cameraErr');
    io.to(roomId).emit('camera-Err');
    // socket.to(clientSocketId).emit('cameraErr');
  });

  socket.on('deviceChange', message => {
    socket.emit('deviceChange', message);
  });

  // WebRTC Event
  socket.on('offer', (id, message) => {
    console.log('52', id, socket.id);
    // 發送camera web 的本地描述給client
    socket.to(id).emit('offer', socket.id, message); // id是client端的socketID, socket.id是camera web第一次建立連線的socketID, message是session
  });
  socket.on('answer', (id, message) => {
    console.log('answer', id);
    socket.to(id).emit('answer', socket.id, message);
  });
  socket.on('candidate', (id, message) => {
    socket.to(id).emit('candidate', socket.id, message);
    console.log(id, socket.id, '61');
  });
});

httpsServer.listen(5000, () => console.log('server is running on port 5000'));
