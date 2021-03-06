import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { ITag, Tag, insert, getAll } from '../models/tag'

type NewTagCategoryReqest = Request & Tag

/**
 *
 *
 * @description creates a new tag
 * @param {NewTagCategoryReqest} request express request
 * @param {Response} response express response
 */
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

/**
 *
 *
 * @description returns all Categrories
 * @param {Request} request express request
 * @param {Response} response express response
 */
export function getAllTags(request: Request, response: Response): void {
	getAll()
		.then((result: ITag[]) => {
			return response.status(HttpStatusCodes.OK).send(result)
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}
