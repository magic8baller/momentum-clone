import {testUsers} from '../../testData.js'
import HttpError from '../../middleware/ErrorHandler.js'
export const getUsers = (req, res, next) => {
	res.json({users: testUsers})
}
export const registerUser = (req, res, next) => {
	const newUser = {...req.body, id: Date.now(), createdAt: Date.now()}

	testUsers.push(newUser)

	res.status(201).json({user: newUser})
}
export const loginUser = (req, res, next) => {
	const {email, password} = req.body
	const foundUser = testUsers.find(user => user.email === email)

	if (!foundUser || foundUser.password !== password) {
		throw new HttpError('no user with these credentials exist', 401)
	}

res.json({message: 'Logged in!'})
}

export const logoutUser = (req, res, next) => {

}