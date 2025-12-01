const ChatModel = require('../models/ChatModel');
const UserModel = require('../models/UserModel'); // make sure you have this
const { sendMessage } = require('../controllers/MessageController');
const { verifyAccessToken } = require('../middleware/verifyToken');

function socketHandler(io) {
    const onlineUsers = {}; // { userId: socketId }

    io.use((socket, next) => {
        const token = socket.handshake.headers.cookie?.split('token=')[1];
        if (!token) return next(new Error("Unauthorized"));

        try {
            const decoded = verifyAccessToken(token);
            socket.user = decoded;
            next();
        } catch (err) {
            next(new Error("Unauthorized"));
        }
    });

    io.on("connection", async (socket) => {
        const userId = socket.user._id;
        onlineUsers[userId] = socket.id;

        // Set user online in DB
        await UserModel.findByIdAndUpdate(userId, { isOnline: true });

        console.log(`User connected: ${userId}`);

        // Notify others
        io.emit("userStatusChanged", { userId, isOnline: true });

        // Join individual user room
        socket.on('joinUser', (userId) => {
            socket.join(userId);
        });

        // Join chat room
        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
        });

        // Join multiple group chats
        socket.on('joinGroup', (groupIds) => {
            groupIds.forEach((id) => socket.join(id));
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

        // Handle disconnect
        socket.on('disconnect', async () => {
            delete onlineUsers[userId];
            await UserModel.findByIdAndUpdate(userId, { isOnline: false });
            io.emit("userStatusChanged", { userId, isOnline: false });
            console.log(`User disconnected: ${userId}`);
        });
    });
}

module.exports = socketHandler;
