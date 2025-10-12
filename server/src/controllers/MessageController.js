const UserModel = require('../models/UserModel')
const ChatModel = require("../models/ChatModel")
const MessageModel = require("../models/MessageModel")
const { BadRequestError, NotFoundError, UnAuthorizedError } = require('../middleware/errors/httpErrors')
const { notifyUser } = require('../utils/NotificationService')


// sendMessage
const sendMessage = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const { chatId, text, img } = req.body

        if (!chatId || (!text && !img)) {
            throw new BadRequestError("Chat ID and message content Required")
        }

        const chat = await ChatModel.findById(chatId).populate('members', 'firstName lastName username profileImg')

        if (!chat) throw new NotFoundError("Invalid Chat Id")

        const isMember = chat.members.some(m => m._id.toString() === userId.toString());
        if (!isMember) throw new UnAuthorizedError("you are not is this Group")

        const message = await MessageModel.create({
            chatId,
            sender: userId,
            text,
            img
        })

        chat.lastMessage = message._id
        await chat.save();


        const populatedMessage = await message.populate([
            { path: 'sender', select: 'firstName lastName username profileImg' },
            { path: 'chatId', select: 'chatName members isGroupChat' },
        ])

        if (chat.isGroupChat) {
            const receivers = chat.members.filter(m => m._id.toString() !== userId.toString());
            for (const receiver of receivers) {
                await notifyUser(
                    userId,
                    receiver._id,
                    'Group_Message',
                    `${req.user.username || "Someone"} send a message in ${chat.chatName}`
                );
            }
        } else {
            const receiver = chat.members.find(m => m._id.toString() !== userId.toString())
            if (receiver) {
                await notifyUser(
                    userId,
                    receiver._id,
                    'message',
                    `${req.user.username} send you a new message`
                );
            }
        }
        return res.status(200).json({
            success: true,
            message: populatedMessage
        })


    }
    catch (error) {
        next(error)
    }
}


const getMessage = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const userId = req.user?._id

        const chat = await ChatModel.findById(chatId)
        if (!chat) throw new NotFoundError("Invalid Chat Id ")


        const isMember = chat.members.some(m => m.toString() === userId.toString())
        if (!isMember) throw new UnAuthorizedError("You are not part of this Chat")

        const messages = await MessageModel.find({ chatId })
            .populate('sender', 'firstName lastName username profileImg')
            .sort({ createdAt: 1 })

        return res.status(200).json({
            success: true,
            count: messages.length,
            messages
        })
    }
    catch (error) {
        next(error)
    }
}
module.exports = {
    sendMessage,
    getMessage
}