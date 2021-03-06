/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
import React, { ReactElement, useState } from 'react'
import LocalOfferIcon from '@material-ui/icons/LocalOffer'
import { AnimatePresence, motion } from 'framer-motion'
import { wrap } from '@popmotion/popcorn'

import { useToasts } from 'react-toast-notifications'
import styles from './Pet.module.scss'
import Ribbon from './components/Ribbon'
import Button from '../../common/Button'
import { post } from '../../../api/cloudFunctions'
import { apiEndPoints } from '../../../api/apiEndpoints'
import { Pet } from '../../../../../server/src/models/pet'

export interface Tag {
	_id: string
	name: string
}

interface IOnePet extends Pet {
	petId: string
	setPetStatusToPending?: (id: string) => void
}

const defaultProps = {
	setPetStatusToPending: undefined,
}

const OnePet = ({
	name,
	photoUrls,
	category,
	tags,
	status,
	userId,
	petId,
	setPetStatusToPending,
}: IOnePet): ReactElement => {
	const [[page, direction], setPage] = useState([0, 0])
	const petImageIndex = wrap(0, photoUrls.length, page)
	const { addToast } = useToasts()

	const paginate = (newDirection: number): void => {
		setPage([page + newDirection, newDirection])
	}

	/**
	 *
	 * @description calls the new order POST api
	 * with the given order object
	 * toggles a notificatino after
	 * and calls the functino which will set this pet's status to pending
	 */
	function placeOrder(): void {
		const order = {
			userId,
			petId,
		}
		post({
			url: apiEndPoints.newOrder,
			data: order,
		}).then(() => {
			addToast('Images had been uploaded successfully', {
				appearance: 'success',
			})
			if (setPetStatusToPending) {
				setPetStatusToPending(petId)
			}
		})
	}

	/**
	 *
	 */
	function changePetImages(): void {
		// we are not navigating if there's only one image
		if (photoUrls.length > 1) {
			paginate(1)
		}
	}
	const variants = {
		enter: (direction: number) => ({
			x: direction > 0 ? 300 : -300,
			opacity: 0,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
		},
		exit: (direction: number) => ({
			zIndex: 0,
			x: direction < 0 ? 300 : -300,
			opacity: 0,
		}),
	}
	return (
		<div className={styles.onePet}>
			<Ribbon label={(status as unknown) as string} />
			<div className={styles.petImages}>
				<AnimatePresence exitBeforeEnter initial={false} custom={direction}>
					<motion.img
						key={page}
						custom={direction}
						whileHover={{ scale: 1.05 }}
						alt={name}
						variants={variants}
						src={photoUrls[petImageIndex]}
						onClick={() => changePetImages()}
						animate="center"
						exit="exit"
					/>
				</AnimatePresence>
				{photoUrls.length > 1 && (
					<ul className={styles.dots}>
						{photoUrls.map((_, index: number) => (
							<li
								key={photoUrls[index]}
								className={petImageIndex === index ? styles.active : ''}
							/>
						))}
					</ul>
				)}
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
				{tags.length > 0 && (
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
				)}
			</div>
			<div className={styles.buyBtn}>
				<Button label="Place order" onClick={() => placeOrder()} />
			</div>
		</div>
	)
}

OnePet.defaultProps = defaultProps

export default OnePet
