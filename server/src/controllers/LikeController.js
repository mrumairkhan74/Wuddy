const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');
const LikeModel = require('../models/LikeModel');
const {
    BadRequestError,
    NotFoundError,
} = require('../middleware/errors/httpErrors');
const { notifyUser } = require("../utils/NotificationService");
// Create a like
const createLike = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;

        const post = await PostModel.findById(postId);
        if (!post) throw new NotFoundError("Post not found");

        const alreadyLiked = await LikeModel.findOne({ post: postId, user: userId });
        if (alreadyLiked) {
            return res.status(200).json({ message: "Post already liked" });
        }

        const like = await LikeModel.create({ post: postId, user: userId });

        if (post.createdBy.toString() !== userId.toString()) {
            await notifyUser(
                userId,
                post.createdBy,
                "Post_Liked",
                "has liked your post."
            );
        }

        return res.status(201).json({
            message: "Post liked successfully",
            like
        });

    } catch (error) {
        next(error);
    }
};


// Unlike a post
const unlikePost = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;

        const like = await LikeModel.findOneAndDelete({ post: postId, user: userId });
        if (!like) {
            return res.status(404).json({ message: "Like not found" });
        }

        res.status(200).json({ message: "Post unliked successfully" });
    } catch (error) {
        next(error);
    }
};

// Get likes for a post
const getLikesByPost = async (req, res, next) => {
    try {
        const { postId } = req.params;

        const likes = await LikeModel.find({ post: postId }).populate('user', 'firstName lastName profileImg');
        res.status(200).json({ success: true, likes: likes, count: likes.length });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createLike,
    unlikePost,
    getLikesByPost,
};