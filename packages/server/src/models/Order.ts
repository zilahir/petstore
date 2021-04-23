import { Document, Model, model, Schema } from 'mongoose'
import { IPet } from './pet'

export enum Status {
	placed,
	approved,
	delivered,
}

export interface IOrder extends Document {
	petId: IPet['_id']
	quantity: number
	shipDate: Date
	status: Status
	complete: boolean
}
