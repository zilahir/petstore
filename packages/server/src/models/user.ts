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

/**
 * @description finds a user by a given username
 * @param {string} username the username we are looking for
 * @returns {Promise} a User in a Promise
 */
export function findByUserName(username: string): Promise<IUser | null> {
	return User.findOne({
		username,
	}).exec()
}

/**
 * @param {string} username the username of the User
 * @returns {Promise} the removed User in a Promise
 */
export function deleteUser(username: string): Promise<IUser | null> {
	return User.findOneAndDelete({ username }).exec()
}

export default User
