import express from 'express';
import * as todoController from '../controllers/todoController.js';
import validator from 'express-validator';
import auth from '../middleware/auth.js';

const router = express.Router();

// VALIDATE
const {body} = validator;
const validateTodos = [
    body('title')
        .exists().withMessage('title doesn\'t exists'),
    body('due_date')
        .exists().withMessage('due_date doesn\'t exists')
        .isDate().withMessage('Not a valid date.')
];
// ROUTES
router
    .route('/')
    .get(auth,todoController.getAllTodo)
    .post(auth,validateTodos,todoController.createTodo);

router
    .route('/:id')
    .get(auth,todoController.findTodo)
    .patch(auth,validateTodos,todoController.updateTodo)
    .delete(auth,todoController.deleteTodo);

export default router;