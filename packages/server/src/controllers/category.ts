import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { insert, Category, ICategory } from '../models/category'

type NewCateGoryRequest = Request & Category

/**
 *
 *
 * @description creates a new category
 * @param {NewCateGoryRequest} request express request
 * @param {Response} response express response
 */
export function insertNewCategory(
	request: NewCateGoryRequest,
	response: Response,
): void {
	const { name } = request.body
	insert({
		name,
	})
		.then((result: ICategory) => {
			return response.status(HttpStatusCodes.OK).send(result)
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}
