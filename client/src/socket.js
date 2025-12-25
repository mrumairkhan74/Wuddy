// src/socket.js
import { io } from "socket.io-client";

// Use your backend URL here
const SOCKET_URL = import.meta.env.VITE_BACKEND_SOCKET_API;

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
});
