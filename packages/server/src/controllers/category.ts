import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { insert, Category, ICategory } from '../models/category'

type NewCateGoryRequest = Request & Category

export function insertNewCategory(
	request: NewCateGoryRequest,
	response: Response,
): void {
	const { name } = request.body
	insert({
		name,
	}).then((result: ICategory) => {
		response.status(HttpStatusCodes.OK).send(result)
	})
}
