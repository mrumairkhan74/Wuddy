const PostModel = require('../models/PostModel')
const UserModel = require('../models/UserModel')
// error
const { NotFoundError, BadRequestError, UnAuthorizedError, ConflictError } = require('../middleware/errors/httpErrors')

// cloudinary 
const { uploadPostsImagesToCloudinary, uploadPostVideosToCloudinary } = require('../utils/CloudinaryUpload')
const { notifyUser } = require('../utils/NotificationService')



const createPost = async (req, res, next) => {
    try {
        const { text } = req.body;
        const userId = req.user?._id;
        if (!userId) throw new BadRequestError("User Not found");

        if (!text && !req.files?.postImg && !req.files?.postVideo) {
            throw new BadRequestError("Post must Contain Text, Images or Videos");
        }

        let postImg = [];
        if (req.files?.postImg) {
            postImg = await Promise.all(
                req.files.postImg.map(async (img) => {
                    const uploaded = await uploadPostsImagesToCloudinary(img.buffer);
                    return { url: uploaded.secure_url, public_id: uploaded.public_id };
                })
            );
        }

        let postVideo = [];
        if (req.files?.postVideo) {
            postVideo = await Promise.all(
                req.files.postVideo.map(async (vid) => {
                    const uploaded = await uploadPostVideosToCloudinary(vid.buffer);
                    return { url: uploaded.secure_url, public_id: uploaded.public_id };
                })
            );
        }

        const post = await PostModel.create({
            createdBy: userId,
            text,
            postImg,
            postVideo
        });

        await UserModel.findByIdAndUpdate(userId, {
            $push: { posts: post._id }
        });

        res.status(200).json({
            success: true,
            message: "Post Created Successfully",
            post: post
        });
    } catch (error) {
        next(error);
    }
};


// all post
const getPosts = async (req, res, next) => {
    try {
        const posts = await PostModel.find()
            .populate('createdBy', 'firstName lastName username profileImg createdAt')
            .sort({ createdAt: -1 })
        return res.status(200).json({
            success: true,
            posts: posts
        })
    }
    catch (error) {
        next(error)
    }
}


// deletePost
const deletePost = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const { id } = req.params
        const post = await PostModel.findById(id)

        if (post.createdBy.toString() !== userId) {
            throw new UnAuthorizedError("You are not authorized to delete this post")
        }
        await PostModel.findByIdAndDelete(id)
        await UserModel.findByIdAndUpdate(userId, {
            $pull: { posts: post._id }
        })

        return res.status(200).json({
            success: true,
            message: "Post Deleted Successfully"
        })
    }
    catch (error) {
        next(error)
    }
}

// update post
const updatePost = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { id } = req.params;
        const { text } = req.body;

        const post = await PostModel.findById(id);
        if (!post) {
            throw new NotFoundError("Post not found");
        }

        if (post.createdBy.toString() !== userId) {
            throw new UnAuthorizedError("Unauthorized to update this post");
        }

        // Only update text
        if (text) {
            post.text = text;
            await post.save();
        }

        return res.status(200).json({
            success: true,
            message: "Post text successfully updated",
            post
        });

    } catch (error) {
        next(error);
    }
};



// all my post
const myPosts = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const posts = await PostModel.find({ createdBy: userId })
            .populate('createdBy', 'firstName lastName profileImg')
            .sort({ createdAt: -1 })
        if (posts.length === 0) throw new NotFoundError("No Post Available")

        return res.status(200).json({
            success: true,
            message: "All Posts your Posts",
            posts: posts
        })
    }
    catch (error) {
        next(error)
    }
}

const getPostByUserId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await PostModel.find({ createdBy: id }).populate("createdBy", "firstName lastName createdAt profileImg")
        return res.status(200).json({
            success: true,
            posts
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    createPost,
    getPosts,
    deletePost,
    updatePost,
    myPosts,
    getPostByUserId
}