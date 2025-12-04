const ChatModel = require('../models/ChatModel');
const UserModel = require('../models/UserModel');
const { sendMessage } = require('../controllers/MessageController');
const jwt = require("jsonwebtoken");

// -----------------------------------------
// Cookie parser for socket handshake
// -----------------------------------------
function getCookie(name, cookieString) {
    const cookies = cookieString?.split(";").map(c => c.trim()) || [];
    for (let c of cookies) {
        if (c.startsWith(name + "=")) {
            return decodeURIComponent(c.split("=")[1]);
        }
    }
    return null;
}

// -----------------------------------------
// JWT verify (for Socket.io)
// -----------------------------------------
function verifySocketToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
    } catch (err) {
        return null;
    }
}

// -----------------------------------------
// Main Socket.io handler
// -----------------------------------------
function socketHandler(io) {
    const onlineUsers = {}; // { userId: socketId }

    // Authentication middleware
    io.use((socket, next) => {
        const cookieHeader = socket.handshake.headers.cookie;
        const token = getCookie("token", cookieHeader);

        if (!token) return next(new Error("Unauthorized"));

        const decoded = verifySocketToken(token);
        if (!decoded) return next(new Error("Unauthorized"));

        socket.user = decoded; // contains _id
        next();
    });

    io.on("connection", async (socket) => {
        const userId = socket.user._id;
        onlineUsers[userId] = socket.id;

        // Mark user as online
        await UserModel.findByIdAndUpdate(userId, { activeStatus: true });

        console.log("User connected:", userId);
        io.emit("userStatusChanged", { userId, activeStatus: true });

        // Join user room
        socket.join(userId);

        // Join specific chat room
        socket.on("joinChat", (chatId) => {
            socket.join(chatId);
        });

        // Join multiple group chat rooms
        socket.on("joinGroup", (groupIds) => {
            groupIds.forEach(id => socket.join(id));
        });

        // Send message
        socket.on("sendMessage", async (data) => {
            try {
                const { chatId, senderId, text } = data;

                const fakeReq = {
                    body: { chatId, text },
                    user: { _id: senderId }
                };

                const fakeRes = {
                    status: () => ({
                        json: (d) => d
                    })
                };

                const result = await sendMessage(fakeReq, fakeRes, () => { });

                // Emit new message to chat room
                io.to(chatId).emit("newMessage", result.message || result);

            } catch (err) {
                console.error("sendMessage error:", err);
            }
        });

        // Handle disconnect
        socket.on("disconnect", async () => {
            delete onlineUsers[userId];
            await UserModel.findByIdAndUpdate(userId, { activeStatus: false });

            io.emit("userStatusChanged", { userId, activeStatus: false });
            console.log("User disconnected:", userId);
        });
    });
}

module.exports = socketHandler;
