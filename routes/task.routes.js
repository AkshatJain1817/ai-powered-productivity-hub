const express = require ('express')
const { createtask, getTasks, getTask, updateTask, deleteTask } = require ('../controllers/task.controllers.js')
const { protect } = require ('../middleware/auth.middleware.js')

const router=express.Router()

router.post("/create", protect, createtask)
router.get("/", protect, getTasks)
router.get("/:id", protect, getTask)
router.put("/:id", protect, updateTask)
router.delete("/:id", protect, deleteTask)

module.exports = router;