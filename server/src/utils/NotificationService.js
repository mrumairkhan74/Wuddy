const NotificationModel = require("../models/NotificationModel");

const notifyUser = async (senderId, receiverId, type, message) => {
  try {
    if (!receiverId) {
      throw new Error("Receiver ID is required for notification");
    }

    if (String(senderId) === String(receiverId)) {
      throw new Error("Sender and receiver cannot be the same");
    }

    const notification = new NotificationModel({
      sender: senderId,
      receiver: receiverId,
      type,
      message,
    });

    await notification.save();
    console.log(`📩 Notification created from ${senderId} to ${receiverId}`);

    return notification;
  } catch (error) {
    console.error("❌ Error in notification creation:", error.message);
    throw error; // let the controller handle response
  }
};

module.exports = { notifyUser };
