import { Response } from 'express'
import HttpStatusCodes from 'http-status-codes'

import Request from '../../types/Request'
import { uploadFile, getAll } from '../models/file.model'

/**
 *
 *
 * @description uloads an image
 * @param {Request} request express request
 * @param {Response} response express response
 */
export function uploadImage(request: Request, response: Response): void {
	uploadFile(request)
		.then((serverResponse: any) => {
			response.status(HttpStatusCodes.OK).send(serverResponse)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}

/**
 *
 *
 * @description returns a single iamge
 * @param {Request} request express request
 * @param {Response} response express response
 */
export function getAllFiles(request: Request, response: Response): void {
	getAll()
		.then(result => {
			response.status(HttpStatusCodes.OK).send(result)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}
