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
        const { status, priority, sortBy, order = "asc", page=1, limit = 10, search}=req.query

        const pageNum = Number(page) || 1;
        const limitNum = Number(limit) || 10

        let filter = {user: req.user._id}
        if(status) filter.status = status;
        if(priority) filter.priority=priority

        if(search){
            filter.$or = [
                {title: {$regex: search,$options:"i"}},
                {description: {$regex: search, $options: "i"}},
            ]
        }

        let sortOptions={}
        if(sortBy) {
            sortOptions[sortBy]=order==="desc" ? -1 : 1
        }else{
            sortOptions = { createdAt: -1 }
        }
        const tasks = await Task.find(filter)
            .sort(sortOptions)
            .skip((page-1)*limit)
            .limit(Number(limit))

        const total = await Task.countDocuments(filter)

        res.json({
            success: true,
            total,
            page: Number(page),
            pages: Math.ceil(total/limit),
            tasks,
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