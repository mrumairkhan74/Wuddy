const ChatModel = require('../models/ChatModel')
const MessageModel = require('../models/MessageModel')
const { BadRequestError, UnAuthorizedError, NotFoundError } = require('../middleware/errors/httpErrors')

// create chat and get old messages
const createOrGetMessage = async (req, res, next) => {
    try {
        const { receiverId } = req.body
        const userId = req.user?._id
        let chat = await ChatModel.findOne({
            isGroupChat: false,
            members: {
                $all: [userId, receiverId]
            }
        })
            .populate('members', 'firstName lastName username profileImg')

        if (!chat) {
            chat = await ChatModel.create({
                members: [userId, receiverId],
                isGroupChat: false
            });
        }
        return res.status(200).json(chat)

    }
    catch (error) {
        next(error)
    }
}

// create group
const createGroup = async (req, res, next) => {
    try {
        const { chatName, members } = req.body
        const userId = req.user?._id
        if (!chatName || members || members.length < 2) {
            throw new BadRequestError('At Least 2 members request to create a group')
        }
        const allMembers = [...members, userId]
        const groupChat = await ChatModel.create({
            chatName,
            members: allMembers,
            isGroupChat: true,
            groupAdmin: userId
        })

        const populatedGroup = await groupChat.populate('members', 'firstName lastName userName profileImg')
        return res.status(200).json({
            success: true,
            populatedGroup
        })
    }
    catch (error) {
        next(error)
    }
}
// rename group
const renameGroup = async (req, res, next) => {
    try {
        const userId = req.user?._id

        const { chatId, chatName } = req.body

        const chat = await ChatModel.findById(chatId)
        if (!chat) throw new NotFoundError("Chat Not Found")

        if (!chat.isGroupChat) throw new BadRequestError("This is Not group Chat")
        if (chat.groupAdmin.toString() !== userId.toString()) throw new UnAuthorizedError("You cannot rename Group only group Admin can rename")

        const updateChat = await ChatModel.findByIdAndUpdate(chatId,
            { chatName },
            { new: true }
        ).populate('members', 'firstName lastName username profileImg')

        return res.status(200).json({
            success: true,
            updateChat
        })
    }
    catch (error) {
        next(error)
    }
}