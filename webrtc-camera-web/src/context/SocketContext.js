import React, { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

const socket = io.connect(process.env.REACT_APP_SOCKET_CONNECT);

const peerConnections = {};

const ContextProvider = ({ children }) => {
  return <SocketContext.Provider value={{}}>{children}</SocketContext.Provider>;
};

export { ContextProvider, SocketContext };
