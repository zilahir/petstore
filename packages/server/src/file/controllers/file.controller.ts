import { Response, Request } from 'express'
import HttpStatusCodes from 'http-status-codes'

import { uploadFile, getAll, FileInterface } from '../models/file.model'

/**
 *
 *
 * @description uloads an image
 * @param {Request} request express request
 * @param {Response} response express response
 */
export function uploadImage(
	request: Request & FileInterface,
	response: Response,
): void {
	uploadFile(request)
		.then((serverResponse: string) => {
			response.status(HttpStatusCodes.OK).send({
				url: serverResponse,
			})
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
