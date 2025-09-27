const UserModel = require('../models/UserModel')
const TaskModel = require('../models/TaskModel')
const { NotFoundError, UnAuthorizedError } = require('../middleware/errors/httpErrors')


// Created Task
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

// My Task
const getTask = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const task = await TaskModel.find({ user: userId }).populate('user', 'firstName lastName')

        return res.status(200).json({
            success: true,
            tasks: task
        })
    }
    catch (error) {
        next(error)
    }
}

// delete task
const deleteTask = async (req, res, next) => {
    try {
        const userId = req.user?._id
        const { id } = req.params
        const task = await TaskModel.findById(id)
        if (task.user.toString() !== userId) {
            throw new UnAuthorizedError("You Cannot Delete this Task")
        }

        await TaskModel.findByIdAndDelete(id)

        await UserModel.findByIdAndUpdate(userId, {
            $pull: { tasks: task._id }
        });

        return res.status(200).json({ message: "Task Removed Successfully" })
    }
    catch (error) {
        next(error)
    }
}

// Update Task
const updateTask = async (req, res, next) => {
    try {
        const userId = req.user?._id;
        const { id } = req.params
        const update = req.body

        const task = await TaskModel.findById(id)
        if (task.user.toString() !== userId) throw new UnAuthorizedError("You Cannot Update Task")
        const updated = await TaskModel.findByIdAndUpdate(id, update, { new: true })

        return res.status(200).json({
            success: true,
            task: updated,
            message: "Task Updated Successfully"
        })

    }
    catch (error) {
        next(error)
    }
}


module.exports = {
    createTask,
    getTask,
    deleteTask,
    updateTask
}