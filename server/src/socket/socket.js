const ChatModel = require('../models/ChatModel');
const UserModel = require('../models/UserModel');
const { createMessage } = require('../services/createMessageService');
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
    } catch {
        return null;
    }
}

// -----------------------------------------
// Main Socket.io handler
// -----------------------------------------
function socketHandler(io) {

    io.use((socket, next) => {
        const cookieHeader = socket.handshake.headers.cookie;
        const token = getCookie("token", cookieHeader);

        if (!token) return next(new Error("Unauthorized"));

        const decoded = verifySocketToken(token);
        if (!decoded) return next(new Error("Unauthorized"));

        socket.user = decoded; // {_id}
        next();
    });

    io.on("connection", async (socket) => {
        const userId = socket.user._id;
        // console.log(`User connected: ${userId}`);

        await UserModel.findByIdAndUpdate(userId, { activeStatus: true });
        io.emit("userStatusChanged", { userId, activeStatus: true });

        // personal room
        socket.join(userId);

        socket.on("joinChat", (chatId) => {
            // console.log("Joined chat:", chatId, "user:", userId);
            socket.join(chatId);
        });

        socket.on("joinGroup", (groupIds) => {
            groupIds.forEach(id => socket.join(id));
        });

        // ✅ FIXED SEND MESSAGE
        socket.on("sendMessage", async ({ chatId, text, img }) => {
            try {
                const message = await createMessage({
                    chatId,
                    userId,
                    text,
                    img
                });
                // console.log("Message received:", text, "from", userId);
                io.to(chatId).emit("newMessage", message);

            } catch (err) {
                console.error("Socket sendMessage error:", err.message);
            }
        });

        socket.on("disconnect", async () => {
            await UserModel.findByIdAndUpdate(userId, { activeStatus: false });
            io.emit("userStatusChanged", { userId, activeStatus: false });
        });
    });
}

module.exports = socketHandler;
