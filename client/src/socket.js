// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_API; // Render backend HTTPS URL

export const socket = io(SOCKET_URL, {
  withCredentials: true,           // allow cookies for auth
  transports: ["polling", "websocket"], // polling fallback for proxies
  autoConnect: false,              // connect manually after setup
  secure: true,                    // required for HTTPS
});

// Connect manually after page load or after token is set
export const connectSocket = () => {
  if (!socket.connected) {
    socket.connect();
  }
};
