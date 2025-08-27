const Task = require ('../models/task.model.js')

exports.createtask = async (req, res) => {
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
        res.status(500).json({
            success: false,
            message: error.message
        })
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
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getTask = async (req, res) => {
    try {
        const task = await Task.findOne({ _id: req.params.id, user: req.user._id})
        if(!task) res.status(404).jsin({
            success: false,
            message: "task not found"
        })

        res.status(200).json({
            success: true,
            task
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id, user: req.user._id},
            req.body,
            {new: true, runValidators: true}
        )

        if(!task) return res.status(404).json({ success: false, message: "task not found"});
        
        res.status(200).json({
            success: true,
            task
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}

exports.deleteTask = async (req, res)=> {
    try{
        const task = await Task.findOneAndDelete(
            {_id: req.params.id, user: req.user._id}
        )
        if(!task) return res.status(404).json({ success: false, message: "task not found"});
        res.status(200).json({
            success: true,
            message: "task deleted successfully"
        })
    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message
        })
    }
}