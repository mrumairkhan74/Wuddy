const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Friend_Request', 'BirthdayNotification', 'error', 'Accept_Friend_Request', 'meeting', 'message', 'general','Group_Added','Group_Message'],
        default: 'general'
    },
    read: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const NotificationModel = mongoose.model('Notification', notificationSchema)

module.exports = NotificationModel