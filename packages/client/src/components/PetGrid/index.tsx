import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { AnimatePresence, motion } from 'framer-motion'

import { apiEndPoints } from '../../api/apiEndpoints'
import { get } from '../../api/cloudFunctions'
import styles from './PetGrid.module.scss'

import { Pet } from '../../../../server/src/models/pet'
import OnePet from './Pet'

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
				{data.map(
					({ name, photoUrls, status, category, tags }, petIndex: number) => (
						<motion.div
							key={name}
							variants={variants}
							custom={petIndex}
							initial="hidden"
							animate="visible"
							exit="exit"
						>
							<OnePet
								status={status}
								category={category}
								tags={tags}
								name={name}
								photoUrls={photoUrls}
							/>
						</motion.div>
					),
				)}
			</AnimatePresence>
		</div>
	) : null
}

export default PetGrid
