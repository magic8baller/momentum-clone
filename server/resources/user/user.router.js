import express from 'express'
import * as userController from './user.controller.js'
const userRouter = express.Router()

// userRouter.get('/verify', userController.verifyUser)
userRouter.post('/register', userController.registerUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/logout', userController.logoutUser)
userRouter.get('/api/user', userController.getUsers)

export default userRouter