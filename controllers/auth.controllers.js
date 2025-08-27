const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')

//===================SIGNUP========================
exports.signup = async (req,res) => {
    try {
        const {name, email, password} = req.body;

        const existinguser = await User.findOne({email});
        if(existinguser){
            return res.status(400).json({ success: false, message: "Email already exists"})
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
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//===================LOGIN========================
exports.login = async (req, res) => {
    try {
        const {email, password} = req.body

        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({success: false, message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).json({success:false,message:"incorrect password"})
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
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}