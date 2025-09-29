const NotificationModel = require("../models/NotificationModel")
const { NotFoundError } = require('../middleware/verifyToken')
// const sendEmail = require('./sendEmail')

const notifyUser = async (senderId, receiverId, type, message) => {
    try {
        const notification = new NotificationModel({
            sender: senderId,
            receiver: receiverId,
            type,
            message
        });
        await notification.save();
        console.log(`📩 Notification created from ${senderId} to ${receiverId}`);

        return notification;
    }
    catch (error) {
        console.log({ error: "Error in notification Creation", error })
    }
}

module.exports = { notifyUser }