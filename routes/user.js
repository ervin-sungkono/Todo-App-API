import express from 'express';
import * as userController from '../controllers/userController.js';
import validator from 'express-validator';
import auth from '../middleware/auth.js'

const router = express.Router();

// VALIDATE
const {body} = validator;
const validateLoginUser = [
    body('email')
        .exists().withMessage('email doesn\'t exists.'),
    body('password')
        .exists().withMessage('password doesn\'t exists')
];
const validateCreateUser = [
    body('username')
        .exists().withMessage('username doesn\'t exists.'),
    body('password')
        .exists().withMessage('password doesn\'t exists')
        .isLength({min: 5}).withMessage('password must be at least 5 characters long.'),
    body('confirmPassword')
        .exists().withMessage('confirm password doesn\'t exists')
        .custom((value, { req }) => {
            if(value !== req.body.password){
                throw new Error();
            }
            return true;
        }).withMessage('confirm password doesn\'t match'),
    body('email')
        .exists().withMessage('email doesn\'t exists')
        .isEmail().withMessage('email is invalid.')
];
// ROUTES
router.get('/',auth,userController.getUser);
router.post('/register',validateCreateUser,userController.createUser);
router.post('/login',validateLoginUser, userController.loginUser);

export default router;