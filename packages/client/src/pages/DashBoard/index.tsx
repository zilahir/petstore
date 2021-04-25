import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { apiEndPoints } from '../../api/apiEndpoints'
import { get } from '../../api/cloudFunctions'

import Layout from '../../components/common/Layout'
import styles from './DashBoard.module.scss'

const DashBoard = (): ReactElement => {
	const { data, isFetched } = useQuery(
		'pets',
		() =>
			(get({
				url: apiEndPoints.findByStatus,
				params: {
					status: 'available',
				},
			}) as unknown) as Array<any>,
	)
	return (
		<Layout>
			<div className={styles.dashboardRootContainer}>
				<div>
					{data && isFetched && data.length > 0 && (
						<ul>
							{data.map((pet: any) => (
								<li key={pet.name}>{pet.name}</li>
							))}
						</ul>
					)}
				</div>
				<div>right</div>
			</div>
		</Layout>
	)
}

export default DashBoard
