const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        filename:{
            type: String,
            required: true,
        },
        fileUrl:{
            type: String,
            required: true,
            default: ''
        },
        text: {
            type: String,
            default: '',
            required: true,
        },
        summary: {
            type: String,
            default: '',
        },
        insughts: {
            type: [String],
            default: [],
        },
        aiProcessed: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
)

const Document = mongoose.model('Document', documentSchema);
module.exports = Document;