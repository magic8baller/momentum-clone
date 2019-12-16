import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import todoRouter from './resources/todo/todo.router.js'
import HttpError from './middleware/ErrorHandler.js'
dotenv.config()
const {PORT} = process.env
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use('/api/todo', todoRouter)

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

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))