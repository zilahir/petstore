import React, { ReactElement } from 'react'
import { useQuery } from 'react-query'
import { AnimatePresence, motion } from 'framer-motion'

import { apiEndPoints } from '../../api/apiEndpoints'
import { get, patch } from '../../api/cloudFunctions'
import styles from './PetGrid.module.scss'

import { Pet } from '../../../../server/src/models/pet'
import OnePet from './Pet'
import NoPets from './Pet/components/NoPets'

export interface IPet extends Pet {
	_id: string
}

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
			delay: custom * 0.15,
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

function setPetStatusToPending(petId: string): void {
	patch({
		url: `${apiEndPoints.modifyPet}/${petId}`,
		data: {
			status: 'pending',
		},
	})
}

const PetGrid = (): ReactElement | null => {
	const { data, isFetched } = useQuery(
		'pets',
		() =>
			(get({
				url: apiEndPoints.findByStatus,
				params: {
					status: 'avaliable',
				},
			}) as unknown) as Array<IPet>,
	)

	return (
		<div className={styles.grid}>
			{isFetched && data && data.length > 0 ? (
				<AnimatePresence key={data.length}>
					{data.map(
						(
							{ name, photoUrls, status, category, tags, userId, _id },
							petIndex: number,
						) => (
							<motion.div
								key={_id}
								variants={variants}
								custom={petIndex}
								initial="hidden"
								animate="visible"
								exit="exit"
							>
								<OnePet
									setPetStatusToPending={setPetStatusToPending}
									petId={_id}
									userId={userId}
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
			) : (
				<NoPets />
			)}
		</div>
	)
}

export default PetGrid
