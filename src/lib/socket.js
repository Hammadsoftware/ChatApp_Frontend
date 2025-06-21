// lib/socket.js
// src/lib/socket.js
import { io } from "socket.io-client";

// Connect to your backend (which allows http://localhost:3000)
const socket = io("https://chatapp-l3am.onrender.com", {
  withCredentials: true, // Required if using cookies/auth
});

export default socket;
