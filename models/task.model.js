const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required: true,
        },
        done: {
            type: Boolean,
            default: false,
        }
    }
)

const taskSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        status: {
            type: String,
            enum: ['todo', 'in-progress', 'done'],
            default: 'todo',
        },
        priority: {
            type: String,
            enum: ['low', 'medium', 'high'],
            default: 'medium',
        },
        dueDate: {
            type: Date,
        },
        subtasks: [subtaskSchema],
        tags: [
            {
                type: String,
                trim: true,
            }
        ],
        aiSuggested: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;