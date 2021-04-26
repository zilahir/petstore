import React, { ReactElement } from 'react'
import random from 'random'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import { motion } from 'framer-motion'

import styles from './Pet.module.scss'
import Ribbon from './components/Ribbon'
import Button from '../../common/Button'
import { patch, post } from '../../../api/cloudFunctions'
import { apiEndPoints } from '../../../api/apiEndpoints'
import { Pet } from '../../../../../server/src/models/pet'

export interface Tag {
	_id: string
	name: string
}

interface IOnePet extends Pet {
	petId: string
}

function setPetStatusToPending(petId: string): void {
	patch({
		url: `${apiEndPoints.modifyPet}/${petId}`,
		data: {
			status: 'pending',
		},
	})
}

const OnePet = ({
	name,
	photoUrls,
	category,
	tags,
	status,
	userId,
	petId,
}: IOnePet): ReactElement => {
	function placeOrder(): void {
		const order = {
			userId,
			petId,
		}
		post({
			url: apiEndPoints.newOrder,
			data: order,
		}).then(() => {
			setPetStatusToPending(petId)
		})
	}
	return (
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
				<div>
					<div className={styles.name}>
						<p>{name}</p>
					</div>
					<div className={styles.category}>
						<p>{category.name}</p>
					</div>
				</div>
				<div className={styles.tags}>
					<ul>
						{tags.map((tag: Tag) => (
							<li className={styles.oneTag} key={tag.name}>
								<LocalOfferIcon htmlColor="#fff" />
								{tag.name}
							</li>
						))}
					</ul>
				</div>
			</div>
			<div className={styles.buyBtn}>
				<Button label="Place order" onClick={() => placeOrder()} />
			</div>
		</div>
	)
}

export default OnePet
