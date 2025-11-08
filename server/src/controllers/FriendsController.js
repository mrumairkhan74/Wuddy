const UserModel = require('../models/UserModel');
const { notifyUser } = require('../utils/notificationService');
const { BadRequestError, NotFoundError } = require('../middleware/errors/httpErrors');

const sendFriendRequest = async (req, res, next) => {
    try {
        const senderId = req.user?._id;
        const receiverId = req.params.id

        if (senderId.toString() === receiverId) {
            throw new BadRequestError('You cannot send a friend request to yourself.');
        }
        const sender = await UserModel.findById(senderId)
        const receiver = await UserModel.findById(receiverId)
        console.log("sender", senderId)
        console.log("receiver", receiverId)
        if (!receiver) {
            throw new NotFoundError('User not found.');
        }

        if (receiver.friendRequests.includes(senderId)) {
            throw new BadRequestError('Friend request already sent.');
        }
        if (receiver.friends.includes(senderId)) {
            throw new BadRequestError('You are already friends.');
        }

        receiver.friendRequests.push(senderId);
        await receiver.save();
        sender.sentRequests.push(receiverId);
        await sender.save();

        await notifyUser(
            senderId,
            receiverId,
            "Friend_Request",
            `has sent you a friend request.`
        )

        res.status(200).json({ message: 'Friend request sent successfully.' });
    }
    catch (error) {
        next(error)
    }
}


const acceptFriendRequest = async (req, res, next) => {
    try {
        const receiverId = req.user?._id;
        const senderId = req.params.id

        if (receiverId.toString() === senderId) {
            throw new BadRequestError('You cannot accept a friend request from yourself.');
        }
        const receiver = await UserModel.findById(receiverId)
        const sender = await UserModel.findById(senderId)

        if (!sender) {
            throw new NotFoundError('User not found.');
        }

        if (!receiver.friendRequests.includes(senderId)) {
            throw new BadRequestError('No friend request from this user.');
        }
        if (receiver.friends.includes(senderId)) {
            throw new BadRequestError('You are already friends.');
        }

        receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId);
        receiver.friends.push(senderId);
        await receiver.save();

        sender.sentRequests = sender.sentRequests.filter(id => id.toString() !== receiverId.toString());
        sender.friends.push(receiverId);
        await sender.save();

        await notifyUser(
            receiverId,
            senderId,
            "Accept_Friend_Request",
            `has accept your friend request.`
        )

        res.status(200).json({ message: 'Friend request accepted successfully.' });
    }
    catch (error) {
        next(error)
    }
}

const rejectFriendRequest = async (req, res, next) => {
    try {
        const receiverId = req.user?._id;
        const { senderId } = req.params

        if (receiverId.toString() === senderId) {
            throw new BadRequestError('You cannot reject a friend request from yourself.');
        }
        const receiver = await UserModel.findById(receiverId)
        const sender = await UserModel.findById(senderId)

        if (!sender) {
            throw new NotFoundError('User not found.');
        }

        if (!receiver.friendRequests.includes(senderId)) {
            throw new BadRequestError('No friend request from this user.');
        }
        if (receiver.friends.includes(senderId)) {
            throw new BadRequestError('You are already friends.');
        }

        receiver.friendRequests = receiver.friendRequests.filter(id => id.toString() !== senderId);
        await receiver.save();

        sender.sentRequests = sender.sentRequests.filter(id => id.toString() !== receiverId.toString());
        await sender.save();

        res.status(200).json({ message: 'Friend request rejected successfully.' });
    }
    catch (error) {
        next(error)
    }
}

const removeFriend = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { friendId } = req.params

        if (userId.toString() === friendId) {
            throw new BadRequestError('You cannot remove yourself from friends.');
        }
        const user = await UserModel.findById(userId)
        const friend = await UserModel.findById(friendId)

        if (!friend) {
            throw new NotFoundError('User not found.');
        }

        if (!user.friends.includes(friendId)) {
            throw new BadRequestError('This user is not in your friends list.');
        }

        user.friends = user.friends.filter(id => id.toString() !== friendId);
        await user.save();

        friend.friends = friend.friends.filter(id => id.toString() !== userId.toString());
        await friend.save();

        res.status(200).json({ message: 'Friend removed successfully.' });
    }
    catch (error) {
        next(error)
    }
}


const getFriendsList = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const user = await UserModel.findById(userId).populate('friends', 'firstName lastName profileImg');

        if (!user) {
            throw new NotFoundError('User not found.');
        }

        res.status(200).json({ friends: user.friends });
    }
    catch (error) {
        next(error)
    }
}

const getFriendRequests = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const user = await UserModel.findById(userId).populate('friendRequests', 'firstName lastName profileImg');

        if (!user) {
            throw new NotFoundError('User not found.');
        }

        res.status(200).json({
            friendRequests: user.friendRequests,
            friendRequestCount: user.friendRequests.length
        });
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    sendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    removeFriend,
    getFriendsList,
    getFriendRequests
}