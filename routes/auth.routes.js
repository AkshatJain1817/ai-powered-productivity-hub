const express = require ('express')
const { signup, login} = require ('../controllers/auth.controllers.js')
const { signupValidators, loginValidators } = require('../middleware/validators/auth.validator.js')
const { validate } = require('../middleware/validators/validate.js')


const router = express.Router()

router.post('/signup',signupValidators, validate, signup)
router.post('/login', loginValidators, validate, login)

module.exports = router