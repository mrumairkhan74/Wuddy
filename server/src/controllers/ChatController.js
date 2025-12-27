const ChatModel = require('../models/ChatModel')
const MessageModel = require('../models/MessageModel')
const { BadRequestError, UnAuthorizedError, NotFoundError } = require('../middleware/errors/httpErrors')
const UserModel = require('../models/UserModel')
const { notifyUser } = require('../utils/NotificationService')
const { uploadGroupImgToCloudinary } = require('../utils/CloudinaryUpload')
// create chat and get old messages
const createOrGetMessage = async (req, res, next) => {
    try {
        const { receiverId } = req.body


        const userId = req.user?._id

        if (!receiverId) throw new BadRequestError("ReceiverId is required")

        if (!receiverId.toString() === userId.toString()) {
            throw new BadRequestError("You cannot create chat with yourself")
        }
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
            chat = await chat.populate('members', 'firstName lastName username profileImg')
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
        let { chatName, members } = req.body;
        const userId = req.user?._id;

        if (typeof members === "string") {
            members = JSON.parse(members);
        }

        if (!chatName || !Array.isArray(members) || members.length < 1) {
            throw new BadRequestError(
                "At least 2 members are required to create a group"
            );
        }

        const allMembers = [...new Set([...members, userId.toString()])];

        let groupProfile = {};
        if (req.file) {
            const cloudinaryResult = await uploadGroupImgToCloudinary(req.file.buffer);
            groupProfile = {
                url: cloudinaryResult.secure_url,
                public_id: cloudinaryResult.public_id
            };
        }

        const groupChat = await ChatModel.create({
            chatName,
            members: allMembers,
            groupProfile,
            isGroupChat: true,
            groupAdmin: userId
        });

        await UserModel.updateMany(
            { _id: { $in: allMembers } },
            { $push: { groups: groupChat._id } }
        );

        for (const memberId of members) {
            notifyUser(
                userId,
                memberId,
                "Group_Added",
                `You have been added to ${groupChat.chatName}`
            ).catch(() => { });
        }

        const populatedGroup = await groupChat.populate([
            { path: "members", select: "firstName lastName username profileImg" },
            { path: "groupAdmin", select: "firstName lastName username profileImg" }
        ]);

        return res.status(200).json({
            success: true,
            populatedGroup
        });

    } catch (error) {
        next(error);
    }
};

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
        const userId = req.user?._id
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

        // check member is already added or not
        if (chat.members.includes(memberId)) throw new BadRequestError("User Already added")
        // add members to group and update 
        const updateChat = await ChatModel.findByIdAndUpdate(chatId,
            { $addToSet: { members: memberId } },
            { new: true }
        ).populate('members', 'firstName lastName username profileImg')

        await UserModel.findByIdAndUpdate(memberId,
            { $addToSet: { groups: updateChat._id } },
            { new: true }
        )
        await notifyUser(
            userId,
            memberId,
            "Group_Added",
            `You have been Added in ${chat.chatName}`
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

const getChatsOfUser = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const allChats = await ChatModel.find({ members: { $in: [userId] } }).populate('members', 'firstName lastName profileImg username')
            .populate('groupAdmin', 'firstName lastName profileImg username')
            .populate('latestMessage', 'text sender createdAt')
            .sort({ updatedAt: -1 })

        const privateChats = allChats.filter(c => !c.isGroupChat);
        const groupChats = allChats.filter(c => c.isGroupChat);

        // result
        return res.status(200).json({
            success: true,
            chat: {
                privateChats,
                groupChats
            }
        })

    }
    catch (error) {
        next(error)
    }
}
const getGroups = async (req, res, next) => {
    try {
        // const userId = req.user?._id
        const chat = await ChatModel.find()
        if (!chat) throw new NotFoundError("ChatGroup Not Found")
        return res.status(200).json({
            success: true,
            chat: chat
        })
    }
    catch (error) {
        next(error)
    }
}


const getChatById = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const chat = await ChatModel.findById(chatId)
            .populate('members', 'firstName lastName profileImg username ')

        if (!chat) throw new NotFoundError("Chat Not Found")
        return res.status(200).json({
            success: true,
            chat: chat
        })
    }
    catch (error) {
        next(error)
    }
}


const updateGroupProfile = async (req, res, next) => {
    try {
        const { chatId } = req.params;
        const userId = req.user?._id;

        const chat = await ChatModel.findById(chatId);
        if (!chat) throw new NotFoundError("Chat Not Found");
        if (chat.groupAdmin.toString() !== userId.toString()) {
            // User is group admin, allow profile update
            throw new UnAuthorizedError("Only group admin can update group profile");
        }


        let groupProfile = {};
        if (req.file) {
            const cloudinaryResult = await uploadGroupImgToCloudinary(req.file.buffer);
            groupProfile = {
                url: cloudinaryResult.secure_url,
                public_id: cloudinaryResult.public_id
            };
        }

        const updatedChat = await ChatModel.findByIdAndUpdate(
            chatId,
            { groupProfile },
            { new: true }
        ).populate('members', 'firstName lastName username profileImg');

        if (!updatedChat) throw new NotFoundError("Chat Not Found");

        return res.status(200).json({
            success: true,
            message: "Group profile updated successfully",
            chat: updatedChat
        });

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
    removeFromGroup,
    getGroups,
    getChatsOfUser,
    getChatById,
    updateGroupProfile
}