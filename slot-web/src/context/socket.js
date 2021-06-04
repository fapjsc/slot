import socketIOClient from "socket.io-client";
import React from "react";
const ENDPOINT = 'https://220.135.67.240:3333';
export const socket = socketIOClient.connect(ENDPOINT);
export const SocketContext = React.createContext();
