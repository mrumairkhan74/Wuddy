const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        enum: ['urgent', 'work', 'meeting', 'important'],
        required: true
    },
    deadline: {
        type: Date,
    },
    time: {
        type: String,
        required: true
    }
}, { timestamps: true });


const TaskModel = mongoose.model('Task', taskSchema)
module.exports = TaskModel