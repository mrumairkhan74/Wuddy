require('dotenv').config();
const app = require('./src/App')

const http = require('http')
const { Server } = require('socket.io');
const socketHandler = require('./src/socket/socket');

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URI,
        methods: ["GET", "POST"],
        credentials: true
    }
})

// socket connection
socketHandler(io)


const port = process.env.PORT
server.listen(port, () => {
    console.log(`server running on ${port}`)
})