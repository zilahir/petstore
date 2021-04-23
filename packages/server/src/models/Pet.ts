import { Document, Model, model, Schema } from 'mongoose'
import { ICategory } from './category'

export enum Status {
	available,
	pending,
	sold,
}

export interface IPet extends Document {
	name: string
	photoUrls: Array<string>
	status: Status
	category: ICategory['_id']
	tags: Array<ICategory['_id']>
}

const petSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	photoUrls: [
		{
			type: String,
		},
	],
	status: {
		type: Boolean,
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

export default Pet
