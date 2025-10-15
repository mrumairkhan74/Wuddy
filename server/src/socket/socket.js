const ChatModel = require('../models/ChatModel')
const MessageModel = require('../models/MessageModel')
const { sendMessage } = require('../controllers/MessageController')
function socketHandler(io) {
    io.on("connection", (socket) => {
        console.log("user connected", socket.id);


        socket.on('join', (userId) => {
            socket.join(userId)
            console.log(`user connected ${userId}`)
        });

        socket.on('joinGroup', (groupIds) => {
            groupsIds.forEach((id) => socket.join(id));
            console.log('Joined Groups', groupIds)
        })

        socket.on('sendMessage', async (data) => {
            try {
                const { chatId, senderId, text, members } = data

                const fakeReq = { body: { chatId, text, img }, user: { _id: senderId } }
                const fakeRes = {
                    status: () => ({ json: (msg) => msg })
                }

                const next = (err) => { if (err) console.error(err) };

                const result = await sendMessage(fakeReq, fakeRes, next)

                io.to(chatId).emit('newMessage', result.message)
            }
            catch (err) {
                console.error("Error handling sendMessage:", err);
            }
        });

    });
}


module.exports = socketHandler