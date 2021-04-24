import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { Pet, insert, IPet, getAll, Status, findByStatus } from '../models/pet'

type NewPetRequest = Request & Pet
type FindPetByStausRequest = Request & Status

/**
 *
 * @description calls the Pet modal's insert function
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

/**
 *
 * @description calls the Pet modal's getAll function
 * and inserts a new pet into the database
 * @param {Request} request the express request
 * @param {Response} response express response
 */
export function getAllPets(request: Request, response: Response): void {
	getAll()
		.then(pets => {
			response.status(HttpStatusCodes.OK).send(pets)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}

/**
 *
 *
 * @description finds pet by status
 * @param {FindPetByStausRequest} request express request
 * @param {Response} response express response
 */
export function findPetsByStatus(
	request: FindPetByStausRequest,
	response: Response,
): void {
	const { status } = request.query
	const chosenStatus = (status as unknown) as Status
	findByStatus(chosenStatus)
		.then(pets => {
			response.status(HttpStatusCodes.OK).send(pets)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}
