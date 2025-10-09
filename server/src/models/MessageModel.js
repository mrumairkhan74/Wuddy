const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    text: {
        type: String,
        trim: true
    },
    img: {
        type: String
    },
    seenBy: [{
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    }]
}, { timestamps: true })

const MessageModel = mongoose.model('Messages', messageSchema)

module.exports = MessageModel