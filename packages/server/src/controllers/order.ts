import { Request, Response } from 'express'
import {
	IOrder,
	insert,
	Order,
	OrderStatus,
	inventory,
	get,
	deleteOrderById,
} from '../models/order'

import HttpStatusCodes from 'http-status-codes'

type NewOrderRequest = Request & Order

type FindOrderById = Request & { _id: string }

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
		status: OrderStatus.placed,
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

/**
 *
 * @description calls the Order model's insert function
 * and inserts a new order into the database
 * @param {Request} request express request
 * @param {Response} response express response
 */
export function getInventory(
	request: NewOrderRequest,
	response: Response,
): void {
	inventory()
		.then((result: IOrder[]) => {
			response.status(HttpStatusCodes.OK).send(result)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}

/**
 *
 * @description calls the Order model's get function
 * and returns the orders
 * @param {Request} request express request
 * @param {Response} response express response
 */
export function getAllOrders(
	request: NewOrderRequest,
	response: Response,
): void {
	get()
		.then((result: IOrder[]) => {
			response.status(HttpStatusCodes.OK).send(result)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}

/**
 *
 * @description calls the Order model's delete function
 * and returns the orders
 * @param {Request} request express request
 * @param {Response} response express response
 */
export function deleteOrder(request: FindOrderById, response: Response): void {
	const { orderId } = request.params
	const thisOrder = orderId as string
	deleteOrderById(thisOrder)
		.then((result: IOrder) => {
			response.status(HttpStatusCodes.OK).send(result)
			return
		})
		.catch(error => {
			response.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send(error)
		})
}
