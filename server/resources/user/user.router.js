import express from 'express'
import expressValidator from 'express-validator'
import * as userController from './user.controller.js'
const userRouter = express.Router()

const {check} = expressValidator

// userRouter.get('/verify', userController.verifyUser)
userRouter.post('/register', [
	check('email').normalizeEmail().isEmail(),
	check('password').isLength({min: 8})
], userController.registerUser)
userRouter.post('/login', [
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Password is required').exists()
], userController.loginUser)
userRouter.get('/logout', userController.logoutUser)
userRouter.get('/api/user', userController.getUsers)

export default userRouter