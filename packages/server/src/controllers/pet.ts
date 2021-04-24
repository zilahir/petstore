import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { Pet, insert, IPet } from '../models/pet'

type NewPetRequest = Request & Pet

export function insetNewPet(request: NewPetRequest, response: Response): void {
	const { name, photoUrls, status, category, tags } = request.body
	insert({
		name,
		photoUrls,
		status,
		category,
		tags,
	}).then((result: IPet) => {
		response.send(HttpStatusCodes.OK).send(result)
	})
}
