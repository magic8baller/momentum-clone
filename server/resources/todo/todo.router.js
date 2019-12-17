import express from 'express'
import expressValidator from 'express-validator'
import * as todoControllers from './todo.controller.js'
const todoRouter = express.Router()
const {check} = expressValidator
todoRouter.get('/', todoControllers.getMany)
todoRouter.post('/', [check('text').not().isEmpty()],todoControllers.createOne)

todoRouter.get('/:id', todoControllers.getOne)
todoRouter.put('/:id', todoControllers.updateOne, [check('text').not().isEmpty()])
todoRouter.delete('/:id', todoControllers.removeOne)

export default todoRouter