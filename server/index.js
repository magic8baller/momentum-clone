import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import HttpError from './middleware/ErrorHandler.js'
import todoRouter from './resources/todo/todo.router.js'
import userRouter from './resources/user/user.router.js'
dotenv.config()
import {authMiddleware} from './middleware/auth.js'

const {PORT} = process.env
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use('/api/todo', authMiddleware, todoRouter)
app.use('/', userRouter)

app.use((req, res, next) => {
	const error = new HttpError('This route does not exist', 404)
	throw error
})
app.use((error, req, res, next) => {
	if (res.headerSent) {
		return next(error)
	}
	res.status(error.code || 500)
	res.json({message: error.message || 'An unknown error occurred'})
})

app.get('/', (req, res) => res.status(200).send('aloha'))

export const start = async (req, res) => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		})
		console.log('DB Connected')
		app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))

	} catch (error) {
		console.error(error.message)
	}
}

start()