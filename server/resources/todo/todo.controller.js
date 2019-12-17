import {Todo} from './todo.model.js'
import HttpError from '../../middleware/ErrorHandler.js'
import expressValidator from 'express-validator'
const {validationResult} = expressValidator
export const getMany = async (req, res, next) => {
	const todos = Todo.find({})

	if (!todos || !todos.length) {
		return next(
			new HttpError('No todos exist in database', 404)
		)

	}
	console.log('get all request', todos)
	res.json({message: 'got all todos!', data: todos, success: true})
}

export const createOne = async (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		throw new HttpError('Invalid input, please enter text', 422)
	}
	// const todos = testTodos

	const newTodo = await Todo.create({
		...req.body})
		newTodo.save()
		res.json({data:newTodo})
}
export const getOne = (req, res, next) => {
	const todoId = req.params.id
	const todo = testTodos.find(todo => todo.id == todoId)
	console.log('get 1 request:',todo)
	if (!todo) {
		return next(
		new HttpError('No todo with this ID exists in database', 404)
		)
	}

	res.json({message: 'got 1 todo!', data: todo, success: true})
}

export const updateOne = (req, res, next) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		throw new HttpError('Invalid input, please enter text', 422)
	}
	const todos = testTodos
	const todoId = req.params.id
	const updatedTodo = {...testTodos.find(todo => todo.id == todoId)}
	if (!updatedTodo) {
		return next(
			new HttpError('No todo with this id exists in database', 404)
		)
	}
	const todoIndex = todos.findIndex(todo => todo.id == todoId)

	todos[todoIndex] = {...req.body, updatedTodo}

	res.status(200).json({message: 'succes', newTodo: updatedTodo})
}

export const removeOne = (req, res, next) => {
	const todoId = req.params.id
	let todos = testTodos

	if (!todos.find(todo => todo.id == todoId)) {
		next( new HttpError('Could not find a todo with that ID', 404))
	}
	todos = todos.filter(todo => todo.id != todoId)
	console.log(todos)
	res.status(200).json({message: 'Deleted todo', success: true})
}