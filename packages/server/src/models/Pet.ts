import { Document, Model, model, NativeError, Schema } from 'mongoose'
import { ICategory } from './category'
import { ITag } from './tag'

export enum Status {
	available,
	pending,
	sold,
}

export interface Pet {
	name: string
	photoUrls: Array<string>
	status: Status
	category: ICategory['_id']
	tags: Array<ITag['_id']>
}

export interface IPet extends Document, Pet {}

const petSchema: Schema = new Schema({
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
		default: Status.available,
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
 * @description finds pet by petId
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
export function findByStatus(status: Status): Promise<Array<IPet>> {
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
export function patchById(petId: string, payload: Pet): Promise<IPet> {
	return new Promise((resolve, reject) => {
		Pet.findOne({ id: petId }, function (err: NativeError, pet: IPet) {
			if (err) reject(err)

			console.debug('pet', pet)

			Object.keys(payload).map((key: keyof Pet) => {
				pet[key] = payload[key]
			})

			pet.save(function (err, updatedPet) {
				if (err) return reject(err)
				resolve(updatedPet)
			})
		})
	})
}

/**
 * @param {string} petId the Id of the Pet
 * @returns {Promise} the found Pet in a Promise
 */
export function FindPetById(petId: string): Promise<IPet> {
	return Pet.findOne({ id: petId }).populate('tags').populate('category').exec()
}

export default Pet
