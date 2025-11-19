const UserModel = require('../models/UserModel');
const PostModel = require('../models/PostModel');
const LikeModel = require('../models/LikeModel');
const {
    BadRequestError,
    NotFoundError,
} = require('../middleware/errors/httpErrors');

// Create a like
const createLike = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.user._id;

        const post = await PostModel.findById(postId);
        if (!post) throw new NotFoundError("Post not found");

        const existingLike = await LikeModel.findOne({ post: postId, user: userId });
        if (existingLike) {
            return res.status(200).json({ message: "Post already liked" });
        }

        const like = await LikeModel.create({ post: postId, user: userId });
        res.status(201).json({ message: "Post liked successfully", like });
    } catch (error) {
        next(error);
    }
};

// Unlike a post
const unlikePost = async (req, res, next) => {
    try {
        const { postId } = req.body;
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
        res.status(200).json({ success: true, likes, count: likes.length });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createLike,
    unlikePost,
    getLikesByPost,
};