/* eslint-disable no-underscore-dangle */
/* eslint-disable unicorn/consistent-function-scoping */
/* eslint-disable no-unused-vars */
import React, { ReactElement, useState, useCallback, useEffect } from 'react'
import classnames from 'classnames'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import { useDropzone } from 'react-dropzone'
import Select from 'react-select'
import shortid from 'shortid'

import { apiEndPoints } from '../../api/apiEndpoints'
import { deleteFunction, get, post } from '../../api/cloudFunctions'
import Layout from '../../components/common/Layout'
import { TopLevelState } from '../../store/configureStore'
import styles from './DashBoard.module.scss'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import { Pet } from '../../../../server/src/models/pet'
import DashboardContext from './dashboardContext'
import Input from '../../components/common/Input'
import { Category } from '../../../../server/src/models/category'
import { Tag } from '../../../../server/src/models/tag'
import Spinner from '../../components/common/Spinner'

type UploadImages = {
	url: string
}

const DashBoard = (): ReactElement => {
	const { user } = useSelector((store: TopLevelState) => store)
	const [selectedPet, setSelectedPet] = useState<Pet | any>({})
	const [images, setImages] = useState<Array<File>>([])
	const [petName, setPetName] = useState<string>('')
	const [isLoading, toggleLoading] = useState<boolean>(false)

	const onDrop = useCallback(acceptedFiles => {
		toggleLoading(true)
		const uploadPromises: Array<Promise<any>> = []
		acceptedFiles.map((currentFile: File) => {
			const formData = new FormData()
			const file = new File([currentFile], `${shortid.generate()}.jpg`, {
				type: 'image/jpeg',
			})
			formData.append('image', file)
			uploadPromises.push(
				post({
					url: apiEndPoints.uploadImage,
					data: formData,
				}),
			)
			return true
		})

		Promise.all(uploadPromises)
			.then(() => {})
			.catch((error: Error) => {
				toggleLoading(false)
				throw new Error(error.message)
			})

		setImages(
			acceptedFiles.map((currentFile: File) =>
				Object.assign(currentFile, {
					preview: URL.createObjectURL(currentFile),
				}),
			),
		)
	}, [])
	const { getRootProps, getInputProps, open } = useDropzone({
		onDrop,
		noClick: true,
		accept: 'image/jpeg, image/png',
	})

	useEffect(
		() => () => {
			images.map((file: any) => URL.revokeObjectURL(file.preview))
		},
		[images],
	)

	const [
		isConfirmDeleteModalOpen,
		toggleConfirmDeleteModal,
	] = useState<boolean>(false)

	const fetchPets = (): Array<Pet> =>
		(get({
			url: `${apiEndPoints.getPetsByUser}/${user._id}`,
		}) as unknown) as Array<any>

	const fetchCategories = (): Array<Category> =>
		(get({
			url: `${apiEndPoints.getAllCategories}`,
		}) as unknown) as Array<any>

	const fetchTags = (): Array<Tag> =>
		(get({
			url: `${apiEndPoints.getAllTags}`,
		}) as unknown) as Array<any>
	const {
		data: pets,
		isFetched: isPetsFetched,
		refetch: refetchPets,
	} = useQuery('petsByUser', fetchPets)
	const { data: categories } = useQuery('caategories', fetchCategories)
	const { data: tags } = useQuery('tags', fetchTags)

	function handleDelete(): void {
		deleteFunction({
			url: `${apiEndPoints.deletePet}/${selectedPet._id}`,
		}).then(() => {
			refetchPets()
			toggleConfirmDeleteModal(false)
		})
	}

	function toggleDeleteModalOpen(chosenPet: Pet): void {
		toggleConfirmDeleteModal(true)
		setSelectedPet(chosenPet)
	}

	const thumbs = images.map((file: any) => (
		<div className={styles.preview} key={file.name}>
			<div>
				<img alt="preview" src={file.preview} />
			</div>
		</div>
	))

	return (
		<DashboardContext.Provider value={{ selectedPet, setSelectedPet }}>
			<Layout>
				<div className={styles.dashboardRootContainer}>
					<div className={styles.petContainer}>
						<h1>My Pets</h1>
						{pets && isPetsFetched && pets.length > 0 && (
							<ul>
								{pets.map((pet: any) => (
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
					<div
						className={classnames(styles.newPetContainer, styles.petContainer)}
					>
						<h1>Upload a new pet to the store</h1>
						{!isLoading ? (
							<div className={styles.inputContainer}>
								<div className={styles.group}>
									<div className={styles.oneInput}>
										<Input
											className={styles.input}
											label="Pet's name"
											onChange={event => setPetName(event.target.value)}
											placeHolder="Musti"
											value={petName}
										/>
									</div>
									<div className={styles.oneInput}>
										<Select
											placeholder="Category"
											options={categories?.map(({ name }: Category) => ({
												value: name,
												label: name,
											}))}
										/>
									</div>
								</div>
								<div className={styles.inputContainer}>
									<Select
										isMulti
										placeholder="Tags"
										options={tags?.map(({ name }: Category) => ({
											value: name,
											label: name,
										}))}
									/>
								</div>
								<div className={styles.dragNDropContainer} {...getRootProps()}>
									<input {...getInputProps()} />
									<p>drag and drop files here or:</p>
									<Button onClick={open} label="Upoad files" />
								</div>
								<div className={styles.previewContainer}>{thumbs}</div>
							</div>
						) : (
							<Spinner className={styles.loaderContainer} />
						)}
					</div>
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
