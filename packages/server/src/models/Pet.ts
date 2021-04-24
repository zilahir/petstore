import { Document, Model, model, Schema } from 'mongoose'
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
		required: true,
	},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'Category',
	},
	tags: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Tags',
		},
	],
})

const Pet: Model<IPet> = model('Pet', petSchema)

export const insert = (pet: Pet): Promise<IPet> => {
	const newPet = new Pet(pet)
	return newPet.save()
}

export const getAll = (): Promise<Array<IPet>> => {
	return Pet.find({}).exec()
}

export default Pet
