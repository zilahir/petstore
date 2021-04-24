import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { apiEndPoints } from '../../api/apiEndpoints'
import get from '../../api/cloudFunctions'

import styles from './PetGrid.module.scss'

const PetGrid = (): ReactElement => {
	const { data } = useQuery('pets', () =>
		get({
			url: apiEndPoints.findByStatus,
			params: {
				status: 'available',
			},
		}),
	)
	console.debug('data', data)
	return <div className={styles.gridRoot} />
}

export default PetGrid
