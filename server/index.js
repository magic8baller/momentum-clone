import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import morgan from 'morgan'
import todoRouter from './resources/todo/todo.router.js'
const {PORT} = process.env
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))

app.use('/api/todo', todoRouter)

app.get('/', (req, res) => res.status(200).send('aloha'))

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))