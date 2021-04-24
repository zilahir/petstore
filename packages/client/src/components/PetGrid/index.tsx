import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { apiEndPoints } from '../../api/apiEndpoints'

import styles from './PetGrid.module.scss'

const PetGrid = (): ReactElement => {
	const { data } = useQuery('repoData', () =>
		fetch(apiEndPoints.getAllPets).then(response => response.json()),
	)
	console.debug('data', data)
	return <div className={styles.gridRoot} />
}

export default PetGrid
