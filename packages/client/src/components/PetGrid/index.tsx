import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import random from 'random'
import { apiEndPoints } from '../../api/apiEndpoints'

import { get } from '../../api/cloudFunctions'
import styles from './PetGrid.module.scss'

import { Pet } from '../../../../server/src/models/pet'

const PetGrid = (): ReactElement | null => {
	const { data } = useQuery(
		'pets',
		() =>
			(get({
				url: apiEndPoints.findByStatus,
				params: {
					status: 'available',
				},
			}) as unknown) as Array<Pet>,
	)

	return data && data.length > 0 ? (
		<div className={styles.grid}>
			{data.map(({ name, photoUrls }) => (
				<div key={name} className={styles.onePet}>
					<div className={styles.petImages}>
						{photoUrls.map((photo: string, index: number) => (
							<img
								key={photo}
								alt={`${photo}-${index + 1}`}
								src={`https://picsum.photos/${random.int(
									600,
									1000,
								)}/${random.int(700, 1300)}`}
							/>
						))}
					</div>
					<p>{name}</p>
				</div>
			))}
		</div>
	) : null
}

export default PetGrid
