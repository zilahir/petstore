/* eslint-disable no-underscore-dangle */
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { useToasts } from 'react-toast-notifications'
import { Pet, Status } from '../../../../server/src/models/pet'
import { apiEndPoints } from '../../api/apiEndpoints'
import { deleteFunction, get } from '../../api/cloudFunctions'
import { Order } from '../../../../server/src/models/order'

import styles from './Inventory.module.scss'

import Layout from '../../components/common/Layout'
import Button from '../../components/common/Button'

interface InventoryItemStatus {
	status: Status
}

interface IventoryCount {
	_id: InventoryItemStatus
	count: number
}

interface IOrder extends Order {
	petId: Pet
	_id: string
}

interface EmptyInterface {
	type: string
}

const Inventory = (): ReactElement => {
	const { addToast } = useToasts()
	const { data: inventoryData } = useQuery(
		'inventory',
		() =>
			(get({
				url: apiEndPoints.getInventoryy,
			}) as unknown) as Array<IventoryCount>,
	)

	const { data: orderData, refetch: refetchOrders } = useQuery(
		'orders',
		() =>
			(get({
				url: apiEndPoints.getAllOrders,
			}) as unknown) as Array<IOrder>,
	)

	/**
	 *
	 *
	 * @param {string} orderId the id of the Order
	 * @description calls the DELETE API on the Order
	 * then, refetches the orders, and toggles a notification
	 */
	function handleOrderDelete(orderId: string): void {
		deleteFunction({
			url: `${apiEndPoints.deleteOrder}/${orderId}`,
		}).then(() => {
			refetchOrders()
			addToast('Order had been deleted successfully', {
				appearance: 'success',
			})
		})
	}

	const Empty = ({ type }: EmptyInterface): ReactElement => (
		<div className={styles.empty}>
			<p>There is nothing in {type}</p>
		</div>
	)

	return (
		<Layout>
			<div className={styles.inventoryContainer}>
				<h1>Inventory</h1>
				<div>
					{inventoryData && inventoryData.length > 0 ? (
						<ul>
							{inventoryData.map((inventory: IventoryCount) => (
								<li key={inventory._id.status}>
									{inventory._id.status}: <span>{inventory.count}</span>
								</li>
							))}
						</ul>
					) : (
						<Empty type="inventory" />
					)}
				</div>
			</div>
			<div className={styles.inventoryContainer}>
				<h1>Placed orders</h1>
				<div>
					{orderData && orderData.length > 0 ? (
						<ul>
							{orderData.map((order: IOrder, index: number) => (
								<li key={order._id}>
									{`#${index + 1} ${order.petId.name}`}
									<Button
										label="delete order"
										variant="danger"
										onClick={() => handleOrderDelete(order._id)}
									/>
								</li>
							))}
						</ul>
					) : (
						<Empty type="placed orders" />
					)}
				</div>
			</div>
		</Layout>
	)
}

export default Inventory
