const {body}=require('express-validator')

exports.createTaskValidators = [
    body('title').notEmpty().withMessage('title is required'),
    body('status').optional().isIn(['todo', 'in-progress','done']).withMessage('invalid status value'),
    body('priority').optional().isIn(['low','medium','high']).withMessage('invalid priority value'),
    body('dueDate').optional().isISO8601().withMessage('due date must be a valid date')
]

exports.updateTaskValidators = [
    body('title').optional().notEmpty().withMessage('title can not be empty'),
    body('status').optional().isIn(['todo', 'in-progress','done']).withMessage('invalid status value'),
    body('priority').optional().isIn(['low','medium','high']).withMessage('invalid priority value'),
    body('dueDate').optional().isISO8601().withMessage('due date must be a valid date')
]