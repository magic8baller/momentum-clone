import express from 'express'
const todoRouter = express.Router()
import * as todoControllers from './todo.controller.js'
todoRouter.route('/')
.get(todoControllers.getMany)
.post(todoControllers.createOne)

todoRouter.route('/:id')
.get(todoControllers.getOne)
.put(todoControllers.updateOne)
.delete(todoControllers.removeOne)

export default todoRouter