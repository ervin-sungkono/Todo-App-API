import { validationResult } from 'express-validator/src/validation-result.js';
import Todo from '../model/todo.js';

export const getAllTodo = async (req, res, next) => {
    try{
        const [todos, _] = await Todo.findByUser(req.user.user_id);
        return res.status(200).send(todos);
    }catch(err){
        next(err);
    }   
}

export const findTodo = async (req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        let [todo, _] = await Todo.findById(id);
        todo = todo[0];
        if(todo.user_id === req.user.user_id){
            return res.status(200).send(todo);
        }
        return res.status(400).send({message: 'Invalid access.'});
    }catch(err){
        next(err);
    }
}

export const createTodo = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).send({ errors: errors.array() });    
        }
    
        const { title, due_date } = req.body;
        const todo = new Todo(title, due_date, req.user.user_id);
        await todo.create(); 
    
        return res.status(201).send({message: 'Todo created!'})
    }catch(err){
        return next(err);
    }
}

export const updateTodo = async (req, res, next) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).send({ errors: errors.array() });
        }

        const id = parseInt(req.params.id);
        let [todo, _] = await Todo.findById(id);
        todo = todo[0];
        if(todo.user_id === req.user.user_id){
            const { title, due_date, completed } = req.body;
            await Todo.update(id, title, due_date, completed);

            return res.status(204).send({message: 'Todo updated!'});
        }
        return res.status(400).send({message: 'Invalid access.'});
    }catch(err){
        next(err);
    }
}

export const deleteTodo = async (req, res, next) => {
    try{
        const id = parseInt(req.params.id);
        let [todo, _] = await Todo.findById(id);
        todo = todo[0];
        if(todo.user_id === req.user.user_id){
            await Todo.delete(id);

            return res.status(204).send({message: 'Todo deleted!'});
        }
        return res.status(400).send({message: 'Invalid access.'});
    }catch(err){
        next(err);
    }
}