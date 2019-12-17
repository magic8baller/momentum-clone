import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema(
	{
		text: {
			type: String,
			required: true,
			maxlength: 100
		},
		status: {
			type: String,
			required: true,
			enum: ['active', 'complete'],
			default: 'active'
		},
		createdBy: {
			type: mongoose.SchemaTypes.ObjectId,
			ref: 'user',
			required: true
		}
	},
	{timestamps: true}
)

export const Todo = mongoose.model('todo', todoSchema)