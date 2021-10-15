import socketClient from 'socket.io-client';
import { addNewMessageToList } from '../store/actions/chatActions';
import store from '../store/store';
const SERVER = 'http://220.135.67.240:8085';

let socket;

export const connectChatSocket = () => {
  socket = socketClient(SERVER);

  socket.on('connection', () => {
    console.log('connect');
  });

  socket.emit('joinRoom', { username: 'mike', room: 'room1' });

  // Message from server
  socket.on('message', message => {
    store.dispatch(addNewMessageToList(message));
    // Scroll down
  });

  socket.on('roomUsers', ({ users, room }) => {
    // console.log(users);
    // console.log(room);
  });
};

export const sendMessage = message => {
  console.log('call send');
  socket.emit('chatMessage', message, socket.id);
};
