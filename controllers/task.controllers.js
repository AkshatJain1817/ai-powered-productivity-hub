const Task = require ('../models/task.model.js')
const AppError = require('../utils/AppError.js')

exports.createtask = async (req, res, next) => {
    try {
        const task = new Task ({
            ...req.body,
            user: req.user._id,
        })

        await task.save()
        res.status(201).json({
            success: true,
            task
        })
    } catch (error) {
        next(error)
    }
}

exports.getTasks = async (req, res) => {
    try{
        const tasks = await Task.find({user: req.user._id}).sort({createdAt: -1})
        res.status(200).json({
            success: true,
            tasks
        })
    }catch(error){
        next(error)
    }
}

exports.getTask = async (req, res, next) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id})
        if(!task) {
            return next(new AppError("Task not found", 404));
        }

        res.status(200).json({
            success: true,
            task
        })
    } catch (error) {
        next(error)
    }
}

exports.updateTask = async (req, res, next) => {
    try {
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id, user: req.user._id},
            req.body,
            {new: true, runValidators: true}
        )

        if(!task) return next(new AppError("task not found", 404))
        
        res.status(200).json({
            success: true,
            task
        })
    } catch (error) {
        next(error)
    }
}

exports.deleteTask = async (req, res, next)=> {
    try{
        const task = await Task.findOneAndDelete(
            {_id: req.params.id, user: req.user._id}
        )
        if(!task) return next(new AppError("task not found", 404))
        res.status(200).json({
            success: true,
            message: "task deleted successfully"
        })
    }catch(error){
        next(error)
    }
}