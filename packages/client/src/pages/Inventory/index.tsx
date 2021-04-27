/* eslint-disable no-underscore-dangle */
import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { Status } from '../../../../server/src/models/pet'
import { apiEndPoints } from '../../api/apiEndpoints'
import { get } from '../../api/cloudFunctions'

import styles from './Inventory.module.scss'

import Layout from '../../components/common/Layout'

interface InventoryItemStatus {
	status: Status
}

interface IventoryCount {
	_id: InventoryItemStatus
	count: number
}

const Inventory = (): ReactElement => {
	const { data } = useQuery(
		'inventory',
		() =>
			(get({
				url: apiEndPoints.getInventoryy,
			}) as unknown) as Array<IventoryCount>,
	)

	return (
		<Layout>
			<div className={styles.inventoryContainer}>
				<h1>Inventory</h1>
				<div>
					{data && (
						<ul>
							{data.map((inventory: IventoryCount) => (
								<li>
									{inventory._id.status}: <span>{inventory.count}</span>
								</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</Layout>
	)
}

export default Inventory
