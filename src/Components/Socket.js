// socket.js
import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
    if (!socket) {
        const socketURL = window.location.origin.includes("localhost")
        ? "http://localhost:80" : window.location.origin;
        socket = io(socketURL);
    }
    return socket;
};
