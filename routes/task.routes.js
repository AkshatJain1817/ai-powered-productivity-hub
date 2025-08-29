const express = require ('express')
const { createtask, getTasks, getTask, updateTask, deleteTask } = require ('../controllers/task.controllers.js')
const { protect } = require ('../middleware/auth.middleware.js')
const { createTaskValidators, updateTaskValidators} = require('../middleware/validators/task.validator.js')
const { validate } = require ('../middleware/validators/validate.js')

const router=express.Router()

router.post("/create",createTaskValidators, validate, protect, createtask)
router.get("/", protect, getTasks)
router.get("/:id", protect, getTask)
router.put("/:id", updateTaskValidators, validate, protect, updateTask)
router.delete("/:id", protect, deleteTask)

module.exports = router;