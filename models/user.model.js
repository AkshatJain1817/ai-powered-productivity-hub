const mongoose = require('mongoose');

const userSchema =  new mongoose.Schema(
    {
        name: {
            type: String,
            require : true,
            trim : true,
            minlength: 3,
            maxlength: 50   
        },
        email: {
            type: String,
            require : true,
            unique: true,
            trim : true,
            lowercase: true,
        },
        password:{
            type: String,
            require : true,
            minlength: 6,
        },
        avatar: {
            type: String,
            default: '',
        },
        lastLogin: {
            type: Date,
        },
        settings: {
            theme:{
                type:String,
                enum: ['light', 'dark'],
                default: 'light',
            },
            language: {
                type: String,
                default: 'en',
            },
        },

    },
    { timestamps: true }
)

const User = mongoose.model('User', userSchema);
module.exports = User;