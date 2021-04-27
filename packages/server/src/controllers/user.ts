import { Request, Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { findByUserName, deleteUser } from '../models/user'

/**
 *
 * @description returns a user by username
 * @param {Request} request express request
 * @param {Response} response express response
 */
export function getUserByUserName(request: Request, response: Response): void {
	const { username } = request.params
	const thisUsername = username as string
	findByUserName(thisUsername)
		.then(user => {
			response.status(HttpStatusCodes.OK).send(user)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}

/**
 *
 *
 * @description remove a User by username
 * @param {Request} request express request
 * @param {Response} response express response
 */
export function deleteUserByUserName(
	request: Request,
	response: Response,
): void {
	const { username } = request.params
	const thisUsername = username as string
	deleteUser(thisUsername)
		.then(user => {
			response.status(HttpStatusCodes.OK).send(user)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}
