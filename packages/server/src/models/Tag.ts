import { Document, Model, model, Schema } from 'mongoose'

export interface ITag extends Document {
	name: string
}

const tagSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
})

const Tag: Model<ITag> = model('Tag', tagSchema)

export default Tag
