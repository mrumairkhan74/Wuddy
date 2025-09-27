const UserModel = require('../models/UserModel')
const TaskModel = require('../models/TaskModel')
const { NotFoundError } = require('../middleware/errors/httpErrors')

const createTask = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        if (!userId) throw new NotFoundError("Invalid userId")
        const { title, deadline, time, tag } = req.body;
        const task = await TaskModel.create({
            title,
            deadline,
            time,
            tag,
            user: userId
        })

        await UserModel.findByIdAndUpdate(userId, {
            $push: { tasks: task._id }
        }, { new: true })

        return res.status(200).json({
            status: true,
            message: "Task Created Successfully",
            task: task
        })

    }
    catch (error) {
        next(error)
    }
}


const getTask = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const task = await TaskModel.find({user:userId}).populate('user', 'firstName lastName')

        return res.status(200).json({
            success: true,
            task: task
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    createTask,
    getTask
}