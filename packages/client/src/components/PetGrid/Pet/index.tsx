import React, { ReactElement } from 'react'
import random from 'random'

import { motion } from 'framer-motion'
import { Pet } from '../../../../../server/src/models/pet'
import styles from './Pet.module.scss'
import Ribbon from './components/Ribbon'

interface Tag {
	_id: string
	name: string
}

const OnePet = ({
	name,
	photoUrls,
	category,
	tags,
	status,
}: Pet): ReactElement => (
	<div className={styles.onePet}>
		<Ribbon label={(status as unknown) as string} />
		<div className={styles.petImages}>
			{photoUrls.map((photo: string, index: number) => (
				<motion.img
					whileHover={{ scale: 1.05 }}
					key={photo}
					alt={`${photo}-${index + 1}`}
					src={`https://picsum.photos/${random.int(300, 600)}/${random.int(
						300,
						500,
					)}`}
				/>
			))}
		</div>
		<div className={styles.metaContainer}>
			<div className={styles.name}>
				<p>{name}</p>
			</div>
			<div className={styles.tags}>
				<p>{category}</p>
				<ul>
					{tags.map((tag: Tag) => (
						<li key={tag.name}>{tag.name}</li>
					))}
				</ul>
			</div>
		</div>
	</div>
)

export default OnePet
