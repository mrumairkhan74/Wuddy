const ChatModel = require('../models/ChatModel')
const MessageModel = require('../models/MessageModel')
const { BadRequestError, UnAuthorizedError, NotFoundError } = require('../middleware/errors/httpErrors')

// create chat and get old messages
const createOrGetMessage = async (req, res, next) => {
    try {
        const { receiverId } = req.body


        const userId = req.user?._id

        // find chat through chat id and is group or not
        let chat = await ChatModel.findOne({
            isGroupChat: false,
            members: {
                $all: [userId, receiverId]
            }
        })
            .populate('members', 'firstName lastName username profileImg')

        // if not then create new
        if (!chat) {
            chat = await ChatModel.create({
                members: [userId, receiverId],
                isGroupChat: false
            });
        }

        // result
        return res.status(200).json({
            success: true,
            chat
        })

    }
    catch (error) {
        next(error)
    }
}

// create group
const createGroup = async (req, res, next) => {
    try {
        const { chatName, members } = req.body
        const userId = req.user?._id;

        if (typeof members === "string") {
            members = JSON.parse(members)
        }
        //    checking input fields
        if (!chatName || !members || members.length + 1 < 2) {
            throw new BadRequestError('At Least 2 members request to create a group')
        }
        const allMembers = [...members, userId]

        // create group
        const groupChat = await ChatModel.create({
            chatName,
            members: allMembers,
            isGroupChat: true,
            groupAdmin: userId
        })

        await UserModel.findByIdAndUpdate(userId,
            { $push: { groups: groupChat._id } },
            { new: true }
        )
        // check all members in group
        const populatedGroup = await groupChat.populate('members', 'firstName lastName username profileImg')

        // result
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
        const { chatId } = req.params;
        const { chatName } = req.body
        // check chat id
        const chat = await ChatModel.findById(chatId)
        if (!chat) throw new NotFoundError("Chat Not Found")

        // check chat is group or just simple chat
        if (!chat.isGroupChat) throw new BadRequestError("This is Not group Chat")
        if (chat.groupAdmin.toString() !== userId.toString()) throw new UnAuthorizedError("You cannot rename Group only group Admin can rename")

        // update chat
        const updateChat = await ChatModel.findByIdAndUpdate(chatId,
            { chatName },
            { new: true }
        ).populate('members', 'firstName lastName username profileImg')

        // result
        return res.status(200).json({
            success: true,
            message: `${chat.chatName} is successfully updated to ${updateChat.chatName}`,
            chat: updateChat
        })
    }
    catch (error) {
        next(error)
    }
}

// add member to group 
const addToGroup = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const { memberId } = req.body

        // check chat id is correct or not
        const chat = await ChatModel.findById(chatId)
        if (!chat) throw new NotFoundError("Invalid Chat id")

        // check is member id is correct or not through userModel
        const member = await UserModel.findById(memberId)
        if (!member) throw new NotFoundError("Invalid memberId")

        // check login user id admin or not 
        if (chat.groupAdmin.toString() !== userId.toString()) throw new UnAuthorizedError("You Cannot Add Member! Only Admin Can")

        // add members to group and update 
        const updateChat = await ChatModel.findByIdAndUpdate(chatId,
            { $addToSet: { members: memberId } },
            { new: true }
        ).populate('members', 'firstName lastName username profileImg')

        await UserModel.findByIdAndUpdate(memberId,
            { $push: { groups: updateChat._id } },
            { new: true }
        )
        // result
        return res.status(200).json({
            success: true,
            message: `${member.username} added SuccessFully to ${chat.chatName}`,
            chat: updateChat
        })
    }
    catch (error) {
        next(error)
    }
}


const removeFromGroup = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const { memberId } = req.body
        const userId = req.user?._id

        const chat = await ChatModel.findById(chatId)
        if (!chat) throw new NotFoundError("Invalid chat Id")


        if (chat.groupAdmin.toString() !== userId.toString()) {
            throw new UnAuthorizedError("You Cannot remove this user only admin can remove ")
        }
        const member = await UserModel.findById(memberId)
        if (!member) throw new NotFoundError("Invalid member Id ")

        const updateChat = await ChatModel.findByIdAndUpdate(chatId,
            { $pull: { members: memberId } },
            { new: true }
        ).populate('members', ' firstName lastName username profileImg')

        await UserModel.findByIdAndUpdate(memberId,
            {
                $pull: { groups: updateChat._id }
            },
            { new: true }
        )
        return res.status(200).json({
            success: true,
            message: `${member.username} has been remove successfully`,
            chat: updateChat
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    createOrGetMessage,
    createGroup,
    renameGroup,
    addToGroup,
    removeFromGroup
}