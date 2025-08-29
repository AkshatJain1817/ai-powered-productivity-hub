const {body} = require ('express-validator')

exports.signupValidators  = [
    body('email')
        .isEmail()
        .withMessage('Valid email is required'),
    body('password')
        .isLength()
        .withMessage('password must be at least 6 characters long'),
    body('name')
        .notEmpty()
        .withMessage('name is required'),
]

exports.loginValidators= [
    body('email').isEmail().withMessage('valid email is required'),
    body('password').notEmpty().withMessage('password is required')
]