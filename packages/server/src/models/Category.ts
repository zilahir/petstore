import { Document, Model, model, Schema } from 'mongoose'

export interface ICategory extends Document {
	name: string
}
