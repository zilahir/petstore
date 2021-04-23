import { Document, Model, model, Schema } from 'mongoose'

interface Category {
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

export const insert = (category: Category): Promise<ICategory> => {
	const newCategory = new Category(category)
	return newCategory.save()
}

export default Category
