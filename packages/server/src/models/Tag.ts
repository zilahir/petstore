import { Document, Model, model, Schema } from 'mongoose'

export interface ITag extends Document {
	name: string
}
