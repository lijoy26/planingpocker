// socket.js
import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io.connect(location.origin); 
    }
    return socket;
};
