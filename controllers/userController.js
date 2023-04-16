import { validationResult } from 'express-validator/src/validation-result.js';
import bcrypt from 'bcryptjs';
import User from '../model/user.js';

export const getUser = async (req, res, next) => {
    try{
        const [user, _] = await User.findUser(req.user.email);
        return res.send({
            user_id: user[0].user_id,
            username: user[0].username,
            email: user[0].email,
            token: user[0].token
        });
    }catch(err){
        next(err);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).send({ errors: errors.array() });
        }

        const { email, password } = req.body;

		let [user, _] = await User.findUser(email);
		user = user[0];
       
        if (user && await bcrypt.compare(password, user.password)) {
            user.token = User.updateToken(user.user_id, user.username ,user.email);
            return res.status(200).json({ 
                message: 'Logged in',
                username: user.username,
                email: user.email,
                token: user.token
            });	
        }
        return res.status(400).send({ message: 'Invalid credentials' });
    }catch (err) {
    	return next(err);
    }
}

export const createUser = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).send({ errors: errors.array() });
        }

        let {username, email, password} = req.body;

        email = email.toLowerCase();
		const [userExists, _] = await User.findUser(email);
		if(userExists.length) {
			return res.status(409).send({ message:'User already exists.' });
		}

        const encryptedPassword = await bcrypt.hash(password,10);

		const user = new User(username, email, encryptedPassword);
		await user.create();
		return res.status(201).send({ message:'Register success.' });
    }catch(err){
        return next(err);
    }
}