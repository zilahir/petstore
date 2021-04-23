import { Document, Model, model, Schema } from 'mongoose'

export interface Tag {
	name: string
}

export interface ITag extends Document, Tag {}

const tagSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
})

const Tag: Model<ITag> = model('Tag', tagSchema)

export const insert = (tag: Tag): Promise<ITag> => {
	const newTag = new Tag(tag)
	return newTag.save()
}

export default Tag
