import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import random from 'random'
import { AnimatePresence, motion } from 'framer-motion'

import { apiEndPoints } from '../../api/apiEndpoints'
import { get } from '../../api/cloudFunctions'
import styles from './PetGrid.module.scss'

import { Pet } from '../../../../server/src/models/pet'

const variants = {
	hidden: {
		opacity: 0,
		y: 10,
	},
	visible: (custom: number) => ({
		y: 0,
		opacity: 1,
		transition: {
			staggerChildren: 0.4,
			delay: custom * 0.05,
			when: 'beforeChildren',
		},
	}),
	exit: (custom: number) => ({
		opacity: 0,
		y: 0,
		transition: {
			staggerChildren: 0.4,
			delay: custom * 0.05,
			when: 'beforeChildren',
		},
	}),
}

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
			<AnimatePresence key={data.length}>
				{data.map(({ name, photoUrls }, petIndex: number) => (
					<motion.div
						key={name}
						className={styles.onePet}
						variants={variants}
						custom={petIndex}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
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
						<div className={styles.metaContainer}>
							<p>{name}</p>
						</div>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	) : null
}

export default PetGrid
