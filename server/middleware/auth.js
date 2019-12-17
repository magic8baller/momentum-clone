import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const {JWT_SECRET} = process.env

const verifyToken = token =>
	new Promise((resolve, reject) => {
		jwt.verify(token, JWT_SECRET, (err, payload) => {
			if (err) return reject(err)
			resolve(payload)
		})
	})
export const authMiddleware = async function (req, res, next) {
	async (req, res, next) => {
		const bearer = req.headers.authorization

		if (!bearer || !bearer.startsWith('Bearer ')) {
			return res.status(401).end()
		}

		const token = bearer.split('Bearer ')[1].trim()
		let payload
		try {
			payload = await verifyToken(token)
		} catch (e) {
			return res.status(401).end()
		}

		const user = await User.findById(payload.id)
			.select('-password')
			.lean()
			.exec()

		if (!user) {
			return res.status(401).end()
		}

		req.user = user
		next()
	}
	// Get token from header
	// const token = req.header('x-auth-token');

	// // Check if not token
	// if (!token) {
	// 	return res.status(401).json({msg: 'No token, authorization denied'});
	// }

	// // Verify token
	// try {
	// 	await jwt.verify(token, JWT_SECRET, (error, decoded) => {
	// 		if (error) {
	// 			res.status(401).json({msg: 'Token is not valid'});
	// 		}
	// 		else {
	// 			req.user = decoded.user;
	// 			next();
	// 		}
	// 	});
	// } catch (err) {
	// 	console.error('something wrong with auth middleware')
	// 	res.status(500).json({msg: 'Server Error'});
	// }
};
