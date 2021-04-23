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
	}).then((result: ITag) => {
		response.status(HttpStatusCodes.OK).send(result)
	})
}
