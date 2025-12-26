require("dotenv").config();
const app = require("./src/App");
const http = require("http");
const { Server } = require("socket.io");
const socketHandler = require("./src/socket/socket");

app.set("trust proxy", 1);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URI,
    credentials: true
  },
  transports: ["polling", "websocket"],
  allowEIO3: true
});

socketHandler(io);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server running on ${port}`);
});
