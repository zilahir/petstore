import { Document, Model, model, Schema } from 'mongoose'
import Pet, { IPet } from './pet'
import { IUser } from './user'

export enum OrderStatus {
	placed = 'placed',
	approved = 'approved',
	delivered = 'delivered',
}

export interface Order {
	userId: IUser['_id']
	petId: IPet['_id']
	quantity: number
	status: OrderStatus
	complete: boolean
}

export interface IOrder extends Document, Order {}

const orederSchema: Schema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	petId: {
		type: Schema.Types.ObjectId,
		ref: 'Pet',
	},
	status: {
		type: String,
		enum: Object.values(OrderStatus),
		default: OrderStatus.placed,
		required: true,
	},
	quantity: {
		type: Number,
		default: 1,
		required: false,
	},
	complete: {
		type: Boolean,
		default: false,
		required: false,
	},
})

const Order: Model<IOrder> = model('Order', orederSchema)

/**
 *
 *
 * @description creaates a new Order
 * @param {object} order an object representtion of the new order
 * @returns {Order} the new Order
 */
export function insert(order: Order): Promise<IOrder> {
	const newPet = new Order(order)
	return newPet.save()
}

/**
 * @description returns the inventory by status
 * @returns {Array} aggregated result of the inventory
 * grouped by status
 */
export function inventory(): Promise<Array<IOrder>> {
	return Pet.aggregate([
		{
			$group: {
				_id: { status: '$status' },
				count: { $sum: 1 },
			},
		},
	]).exec()
}

/**
 * @description returns the list of orders
 * @returns {Array} the Orders
 */
export function get(): Promise<Array<IOrder>> {
	return Order.find({}).populate('petId').exec()
}

/**
 * @param {string} orderId the Id of the Order
 * @returns {Promise} the removed Order in a Promise
 */
export function deleteOrderById(orderId: string): Promise<IOrder | null> {
	return Order.findOneAndDelete({ _id: orderId }).exec()
}
