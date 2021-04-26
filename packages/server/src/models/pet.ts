import { Document, Model, model, Schema } from 'mongoose'
import { ICategory } from './category'
import { ITag } from './tag'
import { IUser } from './user'

export enum Status {
	avaliable = 'avaliable',
	pennding = 'pending',
	sold = 'sold',
}

export interface Pet {
	userId: IUser['_id']
	name: string
	photoUrls: Array<string>
	status: Status
	category: ICategory['_id']
	tags: Array<ITag['_id']>
}

export interface IPet extends Document, Pet {}

const petSchema: Schema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	name: {
		type: String,
		required: true,
		unique: false,
	},
	photoUrls: [
		{
			type: String,
		},
	],
	status: {
		type: String,
		enum: Object.values(Status),
		default: Status.avaliable,
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Tag',
		},
	],
})

const Pet: Model<IPet> = model('Pet', petSchema)

/**
 *
 *
 * @description creaates a new Pet
 * @param {object} pet an object representtion of the new Pet
 * @returns {Pet} the new Pet
 */
export function insert(pet: Pet): Promise<IPet> {
	const newPet = new Pet(pet)
	return newPet.save()
}

/**
 *
 *
 * @description finds pet by petId
 * @returns {Promise} the find Pets in a Promise
 */
export const getAll = (): Promise<Array<IPet>> => {
	return Pet.find({}).exec()
}

/**
 * @param {string} status the desired stauts of Pets
 * @returns {Promise} the found Pets in a Promise
 */
export const findByStatus = (status: Status): Promise<Array<IPet>> => {
	return Pet.find({
		status,
	})
		.populate('tags')
		.populate('category')
		.exec()
}

/**
 * @param {string} petId the Id of the Pet
 * @param {object} payload Object representatino of the Pet
 * @returns {Promise} the Pet in a Promise
 */
export function patchById(petId: string, payload: Pet): Promise<IPet | null> {
	return Pet.findOneAndUpdate({ id: petId }, payload).exec()
}

/**
 * @param {string} petId the Id of the Pet
 * @returns {Promise} the found Pet in a Promise
 */
export function findPetById(petId: string): Promise<IPet | null> {
	return Pet.findOne({ _id: petId })
		.populate('tags')
		.populate('category')
		.exec()
}

/**
 * @param {string} petId the Id of the Pet
 * @returns {Promise} the found Pet in a Promise
 */
export function deletePet(petId: string): Promise<IPet | null> {
	return Pet.findOneAndDelete({ _id: petId }).exec()
}

/**
 * @param {string} userId the Id of the User
 * @returns {Promise} the found Pet in a Promise
 */
export function findByUser(userId: string): Promise<Array<IPet>> {
	return Pet.find({ userId }).populate('tags').populate('category').exec()
}

export default Pet
