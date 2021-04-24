import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { ITag, Tag, insert } from '../models/tag'

type NewTagCategoryReqest = Request & Tag

export function insertNewTag(
	request: NewTagCategoryReqest,
	response: Response,
): void {
	const { name } = request.body
	insert({
		name,
	})
		.then((result: ITag) => {
			return response.status(HttpStatusCodes.OK).send(result)
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}
