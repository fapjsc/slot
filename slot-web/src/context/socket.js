import socketIOClient from "socket.io-client";
import React from "react";
const ENDPOINT = 'http://localhost:3333/';
export const socket = socketIOClient.connect(ENDPOINT);
export const SocketContext = React.createContext();
