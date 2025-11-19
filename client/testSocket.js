const { io } = require("socket.io-client");

const socket = io("http://localhost:5000");

socket.on("connect", () => {
  console.log("Connected to server:", socket.id);

  // Join room
  socket.emit("join", "user123");

  // Send a test message
  socket.emit("sendMessage", {
    chatId: "testRoom",
    senderId: "user123",
    text: "Hello from client test!"
  });
});

socket.on("newMessage", (data) => {
  console.log("Received new message:", data);
});
