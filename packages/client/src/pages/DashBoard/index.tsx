/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { ReactElement, useState } from 'react'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

import { apiEndPoints } from '../../api/apiEndpoints'
import { deleteFunction, get } from '../../api/cloudFunctions'
import Layout from '../../components/common/Layout'
import { TopLevelState } from '../../store/configureStore'
import styles from './DashBoard.module.scss'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import { Pet } from '../../../../server/src/models/pet'
import DashboardContext from './dashboardContext'

const DashBoard = (): ReactElement => {
	const { user } = useSelector((store: TopLevelState) => store)
	const [selectedPet, setSelectedPet] = useState<Pet | any>({})
	const [
		isConfirmDeleteModalOpen,
		toggleConfirmDeleteModal,
	] = useState<boolean>(false)

	const fetchPets = (): Array<Pet> =>
		(get({
			url: `${apiEndPoints.getPetsByUser}/${user._id}`,
		}) as unknown) as Array<any>
	const { data, isFetched, refetch } = useQuery('petsByUser', fetchPets)

	function handleDelete(): void {
		deleteFunction({
			url: `${apiEndPoints.deletePet}/${selectedPet._id}`,
		}).then(() => {
			refetch()
			toggleConfirmDeleteModal(false)
		})
	}

	function toggleDeleteModalOpen(chosenPet: Pet): void {
		toggleConfirmDeleteModal(true)
		setSelectedPet(chosenPet)
	}
	return (
		<DashboardContext.Provider value={{ selectedPet, setSelectedPet }}>
			<Layout>
				<div className={styles.dashboardRootContainer}>
					<div className={styles.petContainer}>
						<h1>My Pets</h1>
						{data && isFetched && data.length > 0 && (
							<ul>
								{data.map((pet: any) => (
									<li key={pet.name}>
										<div>{pet.name}</div>
										<div className={styles.actionBtnContainer}>
											<Button
												label="Delete"
												onClick={() => toggleDeleteModalOpen(pet)}
												icon={<DeleteIcon htmlColor="#6c63ff" />}
												className={styles.actionBtn}
												variant="danger"
											/>
											<Button
												label="Edit"
												onClick={() => console.debug('delete')}
												icon={<CreateIcon htmlColor="#6c63ff" />}
												className={styles.actionBtn}
											/>
										</div>
									</li>
								))}
							</ul>
						)}
					</div>
					<div>right</div>
				</div>
			</Layout>
			<Modal
				isVisible={isConfirmDeleteModalOpen}
				onClose={() => toggleConfirmDeleteModal(false)}
			>
				<div className={styles.confirmContainer}>
					<div className={styles.title}>
						<h1>Are you sure you want to delete this pet?</h1>
					</div>
					<div className={styles.content}>
						<Button
							className={styles.actionBtn}
							label="Confirm"
							onClick={() => handleDelete()}
							variant="danger"
						/>
						<Button
							className={styles.actionBtn}
							label="Cancel"
							onClick={() => console.debug('confirm')}
						/>
					</div>
				</div>
			</Modal>
		</DashboardContext.Provider>
	)
}

export default DashBoard
