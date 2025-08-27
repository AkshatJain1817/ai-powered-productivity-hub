const jwt = require ('jsonwebtoken')
const User = require ('../models/user.model.js')
const bcrypt = require('bcryptjs')

exports.protect = async (req, res, next)=> {
    let token = req.headers['authorization']
    if(token && token.startsWith('Bearer')){
        try{
            token = token.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select('-password')

            if(!user){
                return res.status(401).json({ success:false, message:"please login first"})
            }

            req.user = user;
            next()
        }catch(error){
            res.status(401).json({
                success:false,
                message: "not authorized: please login"
            })
        }
    }else{
        res.status(401).json({
            success:false,
            message: "no token provided"
        })
    }
}