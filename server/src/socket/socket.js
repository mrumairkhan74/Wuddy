const ChatModel = require('../models/ChatModel')
const { sendMessage } = require('../controllers/MessageController')
const { verifyAccessToken } = require('../middleware/verifyToken')
function socketHandler(io) {
    io.use((socket, next) => {
        const token = socket.handshake.headers.cookie?.split('token=')[1];
        if (!token) return next(new Error("Unauthorized"));


        try {
            // Use your existing verifyAccessToken logic
            const decoded = verifyAccessToken(token);
            socket.user = decoded; // attach user info to the socket
            next();
        } catch (err) {
            next(new Error("Unauthorized"));
        }
    });

    io.on("connection", (socket) => {
        console.log("User connected", socket.id);

        // Join individual user room
        socket.on('joinUser', (userId) => {
            socket.join(userId);
            console.log(`User connected: ${userId}`);
        });

        // Join chat room
        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            console.log(`User joined chat room: ${chatId}`);
        });

        // Join multiple group chats
        socket.on('joinGroup', (groupIds) => {
            groupIds.forEach((id) => socket.join(id));
            console.log('Joined Groups', groupIds);
        });

        // Handle sending a message
        socket.on('sendMessage', async (data) => {
            try {
                const { chatId, senderId, text } = data;

                const fakeReq = { body: { chatId, text }, user: { _id: senderId } };
                const fakeRes = { status: () => ({ json: (data) => data }) };
                const next = (err) => { if (err) console.error(err) };

                const result = await sendMessage(fakeReq, fakeRes, next);
                io.to(chatId).emit('newMessage', result?.message || result);
            } catch (err) {
                console.error("Error handling sendMessage:", err);
            }
        });
    });
}

module.exports = socketHandler;
