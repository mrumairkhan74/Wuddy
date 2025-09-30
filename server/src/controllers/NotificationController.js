const NotificationModel = require("../models/NotificationModel")
const { NotFoundError } = require('../middleware/errors/httpErrors')





const getNotification = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const notification = await NotificationModel.find({ receiver: userId })
            .populate('sender', 'firstName lastName profileImg')
            .sort({ createdAt: -1 })

        return res.json(notification);
    }
    catch (error) {
        next(error)
    }
}


const readNotification = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { id } = req.params;
        const notification = await NotificationModel.findById(id)
        if (!notification) throw new NotFoundError("Not Notification available")

        await NotificationModel.findByIdAndUpdate({ receiver: userId }, { read: true }, { new: true })

        return res.status(200).json({ message: "Notification read Successfully" })
    }
    catch (error) {
        next(error)
    }
}

module.exports = { getNotification, readNotification }