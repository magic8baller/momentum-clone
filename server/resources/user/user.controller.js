import dotenv from 'dotenv'
dotenv.config()
const {JWT_SECRET} = process.env
import expressValidator from 'express-validator'
// import {testUsers} from '../../testData.js'
import {User} from './user.model.js'
const {validationResult} = expressValidator
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const getUsers = (req, res, next) => {
	const users = User.find({})
	return res.send(users)
}
export const registerUser = async (req, res, next) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	}

	const {email, password} = req.body;

	try {
		let user = await User.findOne({email});

		if (user) {
			return res
				.status(400)
				.json({errors: [{msg: 'User already exists'}]});
		}

		user = new User({
			email,
			password
		});


		await user.save();

		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(
			payload,
			JWT_SECRET,
			{expiresIn: 360000},
			(err, token) => {
				if (err) throw err;
				res.json({token});
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
}
export const loginUser = async (req, res, next) => {

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({errors: errors.array()});
	}

	const {email, password} = req.body;

	try {
		let user = await User.findOne({email});

		if (!user) {
			return res
				.status(400)
				.json({errors: [{msg: 'Invalid Credentials'}]});
		}


	const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res
				.status(400)
				.json({errors: [{msg: 'Invalid Credentials'}]});
		}

		const payload = {
			user: {
				id: user.id
			}
		};

		jwt.sign(
			payload,
			JWT_SECRET,
			{expiresIn: 360000},
			(err, token) => {
				if (err) throw err;
				res.json({token});
			}
		);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server error');
	}
}


export const logoutUser = (req, res, next) => {

}
