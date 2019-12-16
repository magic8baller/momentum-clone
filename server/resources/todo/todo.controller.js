import {testUsers, testTodos} from '../../testData.js'

export const getMany = async (req, res, next) => {
	const todos = testTodos

	if (!todos) {
		return res.json({message: 'no todos found', success: false})
	}
	console.log('get all request', todos)
	res.json({message: 'got all todos!', data: todos, success: true})
}

export const createOne = (req, res, next) => {
	const todos = testTodos
	const newTodo = {
		...req.body, id: Date.now(), status: 'active', userId: 3,"createdAt": Date.now()}
		todos.push(newTodo)
		res.json({data:todos})
}
export const getOne = (req, res, next) => {
	const todoId = req.params.id
	const todo = testTodos.find(todo => todo.id == todoId)
	console.log('get 1 request:',todo)
	if (!todo) {
		return res.json({message: 'todo not found', success: false})
	}

	res.json({message: 'got 1 todo!', data: todo, success: true})
}

export const updateOne = (req, res, next) => {
	const todos = testTodos
	const todoId = req.params.id
	const updatedTodo = {...testTodos.find(todo => todo.id == todoId)}
	const todoIndex = todos.findIndex(todo => todo.id == todoId)

	todos[todoIndex] = {...req.body, updatedTodo}

	res.status(200).json({message: 'succes', newTodo: updatedTodo})
}