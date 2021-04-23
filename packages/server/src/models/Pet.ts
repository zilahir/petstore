import { Document, Model, model, Schema } from 'mongoose'
import { ICategory } from './Category'

export enum Status {
	available,
	pending,
	sold,
}

export interface IPet extends Document {
	name: string
	photoUrls: Array<string>
	status: Status
	user: ICategory['_id']
	tags: Array<ICategory['_id']>
}
