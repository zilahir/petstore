import { Request, Response } from 'express'
import { IOrder, insert, Order, OrderStatus } from '../models/order'

import HttpStatusCodes from 'http-status-codes'

type NewOrderRequest = Request & Order
/**
 *
 * @description calls the Order model's insert function
 * and inserts a new order into the database
 * @param {Request} request express request
 * @param {Response} response express response
 */
export function insertNewOrder(
	request: NewOrderRequest,
	response: Response,
): void {
	const { userId, petId } = request.body
	insert({
		userId,
		petId,
		complete: false,
		status: OrderStatus.pending,
		quantity: 1,
	})
		.then((result: IOrder) => {
			response.status(HttpStatusCodes.OK).send(result)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}
