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
  console.log('connection');
  // Base Event
  socket.on('broadcaster', () => {
    console.log('broad caster');
    broadcaster = socket.id;
    socket.emit('broadcaster');
    console.log('broadcaster');
  });
  socket.on('watcher', () => {
    console.log('watcher', socket.id);
    socket.to(broadcaster).emit('watcher', socket.id);
    // socket.emit('watcher', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('disconnect=====');
    console.log(broadcaster);
    socket.to(broadcaster).emit('disconnectPeer', socket.id);
  });

  socket.on('leave', () => {
    socket.emit('user leave');
    console.log('user leave');
  });

  // WebRTC Event
  socket.on('offer', (id, message) => {
    console.log('offer');
    socket.to(id).emit('offer', socket.id, message);
  });
  socket.on('answer', (id, message) => {
    console.log('answer');
    socket.to(id).emit('answer', socket.id, message);
  });
  socket.on('candidate', (id, message) => {
    console.log('candidate');
    socket.to(id).emit('candidate', socket.id, message);
  });
});

httpsServer.listen(5000, () => console.log('server is running on port 5000'));
