import { useReducer } from 'react';
import SocketContext from './socket-context';

import io from 'socket.io-client';

const initState = {
  socketClient: null,
};

const socketReducer = (state, action) => {
  // do something...
  if ((action.type = 'SET_SOCKET_CLIENT')) {
    return {
      ...state,
      socketClient: action.payload,
    };
  }
  return initState;
};

const SocketProvider = props => {
  // Socket Reducer
  const [socketState, dispatch] = useReducer(socketReducer, initState);

  // ==========
  // Function
  // ==========
  // Connect Socket
  const connect = uri => {
    const socket = io.connect(uri);
    console.log(socket);

    if (!socket) return;

    setSocketClient(socket);

    socket.on('connect', () => {
      console.log(' *** connect *** ');
    });

    socket.on('disconnect', () => {
      console.log('*** SocketIO disconnected!');
    });

    socket.on('connect_error', err => {
      console.log('*** SocketIO client connect error! ***  ' + err);
    });

    socket.on('connect_timeout', () => {
      console.log('*** SocketIO client connect timeout!');
    });

    socket.on('error', () => {
      console.log('*** SocketIO error occors !');
    });
  };

  // Set Socket Client
  const setSocketClient = client => {
    dispatch({ type: 'SET_SOCKET_CLIENT', payload: client });
  };

  const socketContext = {
    socketClient: socketState.socketClient,
    connect,
  };

  return <SocketContext.Provider value={socketContext}>{props.children}</SocketContext.Provider>;
};

export default SocketProvider;
