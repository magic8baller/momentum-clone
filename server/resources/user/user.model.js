import bcrypt from 'bcrypt'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true
	}
},
	{timestamps: true}
)

userSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next()
	}

	bcrypt.hash(this.password, 8, (err, hash) => {
		if (err) {
			return next(err)
		}

		this.password = hash
		next()
	})
})



export const User = mongoose.model('user', userSchema)