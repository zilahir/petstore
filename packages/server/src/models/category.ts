import { Document, Model, model, Schema } from 'mongoose'

export interface Category {
	name: string
}

export interface ICategory extends Document, Category {}

const categorySchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
})

const Category: Model<ICategory> = model('Category', categorySchema)

/**
 *
 *
 * @description creates a new Categroy
 * @param {object} category an object representtion of the new Category
 * @returns {object} the new Category
 */
export function insert(category: Category): Promise<ICategory> {
	const newCategory = new Category(category)
	return newCategory.save()
}

/**
 * @returns {Promise} Categories in a Promise
 */
export function getAll(): Promise<Array<ICategory>> {
	return Category.find({}).exec()
}

export default Category
