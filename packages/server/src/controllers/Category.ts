import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { insert, ICategory } from '../models/Category'

type NewCateGoryRequest = Request & ICategory

export function insertNewCategory(
	request: NewCateGoryRequest,
	response: Response,
) {
	const { name } = request.body
	console.debug('name', name)
	insert({
		name,
	}).then((result: ICategory) => {
		response.status(HttpStatusCodes.OK).send(result)
	})
}
