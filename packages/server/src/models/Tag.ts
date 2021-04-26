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

/**
 *
 *
 * @description creates a new tag
 * @param {object} tag object representation of the new Tag
 * @returns {Promise} Tag in a romise
 */
export function insert(tag: Tag): Promise<ITag> {
	const newTag = new Tag(tag)
	return newTag.save()
}

/**
 * @returns {Promise} Categories in a Promise
 */
export function getAll(): Promise<Array<ITag>> {
	return Tag.find({}).exec()
}

export default Tag
