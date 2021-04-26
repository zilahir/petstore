import { Document, Model, model, Schema } from 'mongoose'

export interface UserInterface {
	email: string
	password: string
	username: string
	firstName: string
	lastName: string
	phone: string
	userStatus: string
}

/**
 *
 * @param email:string
 * @param password:string
 */
export interface IUser extends Document, UserInterface {}

const userSchema: Schema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	userStatus: {
		type: String,
		required: false,
		default: 'active',
	},
})

const User: Model<IUser> = model('User', userSchema)

export default User
