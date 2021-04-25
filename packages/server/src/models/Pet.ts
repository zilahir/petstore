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
 * @param pet
 */
export function insert(pet: Pet): Promise<IPet> {
	const newPet = new Pet(pet)
	return newPet.save()
}

export const getAll = (): Promise<Array<IPet>> => {
	return Pet.find({}).exec()
}

export const findByStatus = (status: Status): Promise<Array<IPet>> => {
	return Pet.find({
		status,
	})
		.populate('tags')
		.populate('category')
		.exec()
}

/**
 * @param petId
 * @param payload
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
 * @param petId
 */
export function FindPetById(petId: string): Promise<IPet> {
	return Pet.findOne({ id: petId }).populate('tags').populate('category').exec()
}

export default Pet
