// src/socket.js
import { io } from "socket.io-client";

// Use your backend URL here
const SOCKET_URL = "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
});
