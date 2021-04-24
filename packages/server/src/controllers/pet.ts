import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { Pet, insert, IPet } from '../models/pet'

type NewPetRequest = Request & Pet

/**
 *
 * @description calls the Pet modal insert function
 * and inserts a new pet into the database
 * @param {NewPetRequest} request express request
 * @param {Response} response express response
 */
export function insertNewPet(request: NewPetRequest, response: Response): void {
	const { name, photoUrls, status, category, tags } = request.body
	insert({
		name,
		photoUrls,
		status,
		category,
		tags,
	})
		.then((result: IPet) => {
			response.status(HttpStatusCodes.OK).send(result)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}
