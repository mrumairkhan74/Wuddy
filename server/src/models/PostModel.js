const mongoose = require('mongoose')


const postSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        trim: true
    },
    postImg: [{
        url: String,
        public_id: String
    }],
    postVideo: [{
        url: String,
        public_id: String
    }]
}, { timestamps: true })


const PostModel = mongoose.model('Posts', postSchema);

module.exports = PostModel