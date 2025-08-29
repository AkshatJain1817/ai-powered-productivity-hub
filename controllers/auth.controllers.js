const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js');
const AppError = require('../utils/AppError.js');

//===================SIGNUP========================
exports.signup = async (req,res,next) => {
    try {
        const {name, email, password} = req.body;

        const existinguser = await User.findOne({email});
        if(existinguser){
            return next(new AppError("email already exists", 400))
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            name,
            email,
            password: hashedPassword
        })

        await user.save()

        res.status(200).json({
            success: true,
            message:"User created successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}

//===================LOGIN========================
exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email});
        if(!user){
            return next(new AppError("User not found", 404))
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return next(new AppError("incorrect password", 401))
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        )

        res.status(200).json({
            sucess: true,
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            }
        })
    } catch (error) {
        next(error)
    }
}