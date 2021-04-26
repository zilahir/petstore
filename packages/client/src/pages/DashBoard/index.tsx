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
import Select, { OptionsType, OptionTypeBase } from 'react-select'
import CreatableSelect from 'react-select/creatable'
import shortid from 'shortid'

import { useToasts } from 'react-toast-notifications'
import { Option } from 'react-select/src/filters'
import { apiEndPoints } from '../../api/apiEndpoints'
import { deleteFunction, get, post, patch } from '../../api/cloudFunctions'
import Layout from '../../components/common/Layout'
import { TopLevelState } from '../../store/configureStore'
import styles from './DashBoard.module.scss'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import DashboardContext from './dashboardContext'
import Input from '../../components/common/Input'
import Spinner from '../../components/common/Spinner'
import { Pet } from '../../../../server/src/models/pet'

export interface Category {
	name: string
	_id: string
}

export interface Tag {
	name: string
	_id: string
}

type Status = 'avalible' | 'pending'

const DashBoard = (): ReactElement => {
	const { user } = useSelector((store: TopLevelState) => store)
	const [selectedPet, setSelectedPet] = useState<Pet | any>({})
	const [images, setImages] = useState<Array<File>>([])
	const [petName, setPetName] = useState<string>('')
	const [isLoading, toggleLoading] = useState<boolean>(false)
	const [selectedTag, setSelectedTags] = useState<string[]>([])
	const [selectedCategory, setSelectedCategory] = useState<string>('')
	const [savedImages, setSavedImages] = useState<Array<any>>([])
	const { addToast } = useToasts()

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
			.then(serverImages => {
				setSavedImages(serverImages.map(({ url }) => url))
				addToast('Images had been uploaded successfully', {
					appearance: 'success',
				})
			})
			.catch((error: Error) => {
				addToast('Image uploading has failed, please try again', {
					appearance: 'error',
				})
				throw new Error(error.message)
			})
			.finally(() => {
				toggleLoading(false)
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

	const [isModifyModalOpen, toggleModifyModalOpen] = useState<boolean>(false)

	const fetchPets = (): Array<Pet> =>
		(get({
			url: `${apiEndPoints.getPetsByUser}/${user._id}`,
		}) as unknown) as Array<Pet>

	const fetchCategories = (): Array<Category> =>
		(get({
			url: `${apiEndPoints.getAllCategories}`,
		}) as unknown) as Array<Category>

	const fetchTags = (): Array<Tag> =>
		(get({
			url: `${apiEndPoints.getAllTags}`,
		}) as unknown) as Array<Tag>
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

	function clearInput(): void {
		setImages([])
		setSelectedTags([])
		setSelectedCategory('')
		setSavedImages([])
	}

	function addNewPet(): void {
		const newPet = {
			name: petName,
			userId: user._id,
			photoUrls: savedImages,
			category: selectedCategory,
			tags: selectedTag,
		}
		post({
			url: apiEndPoints.addNewPet,
			data: newPet,
		}).then(() => {
			refetchPets()
			clearInput()
			addToast(`Your pet ${newPet.name} has been added to the store`, {
				appearance: 'success',
			})
		})
	}

	function handlePetModify(chosenPet: Pet): void {
		setSelectedPet(chosenPet)
		toggleModifyModalOpen(true)
	}

	function modifyPetValues(key: keyof Pet, value: string): void {
		setSelectedPet({
			...selectedPet,
			[key]: value,
		})
	}

	function findChosenCategory(): any | undefined {
		const thisTag =
			categories &&
			categories.find(category => category._id === selectedPet.category._id)
		return thisTag ? { label: thisTag.name, value: thisTag._id } : undefined
	}

	function findChosenTags(): Option[] | undefined {
		const thisTag =
			tags &&
			tags
				.filter((tag: Tag) =>
					selectedPet.tags.some((petTag: Tag) => petTag._id === tag._id),
				)
				.map(({ _id, name }) => ({
					label: name,
					value: _id,
					data: name,
				}))
		return thisTag
	}

	function modifyPet(): void {
		const modifiedPet: Pet = {
			...selectedPet,
			tags: selectedPet.tags.map((tag: Tag) => tag._id),
			category: selectedPet.category._id,
		}
		patch({
			url: `${apiEndPoints.modifyPet}/${selectedPet._id}`,
			data: modifiedPet,
		}).then(() => {
			refetchPets()
			toggleModifyModalOpen(false)
		})
	}

	function handleCategoryChange(option: OptionTypeBase | null): void {
		if (option && option.__isNew__) {
			post({
				url: apiEndPoints.createCategory,
				data: {
					name: option.label,
				},
			}).then(() => {
				addToast('Category had been uploaded successfully', {
					appearance: 'success',
				})
			})
		} else {
			setSelectedCategory(option?.value)
		}
	}

	return (
		<DashboardContext.Provider value={{ selectedPet, setSelectedPet }}>
			<Layout>
				<div className={styles.dashboardRootContainer}>
					<div className={styles.petContainer}>
						<h1>My Pets</h1>
						{pets && isPetsFetched && pets.length > 0 && (
							<ul>
								{pets.map((pet: Pet) => (
									<li key={pet.name}>
										<div>
											<p>
												{pet.name}
												{pet.status && pet.status === 'pending' && (
													<span className={styles.pending}>pending</span>
												)}
											</p>
										</div>
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
												onClick={() => handlePetModify(pet)}
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
						{!isLoading ? (
							<h1>Upload a new pet to the store</h1>
						) : (
							<h1>Uploading your images...</h1>
						)}
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
										<CreatableSelect
											isClearable
											hande
											placeholder="Category"
											onChange={selected => handleCategoryChange(selected)}
											options={categories?.map(({ name, _id }: any) => ({
												value: _id,
												label: name,
											}))}
										/>
									</div>
								</div>
								<div className={styles.inputContainer}>
									<Select
										isMulti
										placeholder="Tags"
										options={tags?.map(({ name, _id }: any) => ({
											value: _id,
											label: name,
										}))}
										onChange={selected =>
											setSelectedTags(selected.map(tag => tag.value))
										}
									/>
								</div>
								<div className={styles.previewContainer}>{thumbs}</div>
								<div className={styles.dragNDropContainer} {...getRootProps()}>
									<input {...getInputProps()} />
									<p>drag and drop files here or:</p>
									<Button onClick={open} label="Upoad files" />
								</div>
								<div className={styles.submitContainer}>
									<Button label="Add pet" onClick={() => addNewPet()} />
								</div>
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
							onClick={() => toggleConfirmDeleteModal(false)}
						/>
					</div>
				</div>
			</Modal>
			<Modal
				isVisible={isModifyModalOpen}
				onClose={() => toggleModifyModalOpen(false)}
			>
				<div className={styles.modifyModalContainer}>
					<h1>{`Modify pet: ${selectedPet.name}`}</h1>
					<div className={styles.inputContainer}>
						<div className={styles.group}>
							<div className={styles.oneInput}>
								<Input
									className={styles.input}
									label="Pet's name"
									onChange={event =>
										modifyPetValues('name', event.target.value)
									}
									placeHolder="Musti"
									value={selectedPet.name}
								/>
							</div>
							{isModifyModalOpen && (
								<div className={styles.oneInput}>
									<Select
										placeholder="Category"
										onChange={(selected: Option) =>
											modifyPetValues('category', selected.value)
										}
										defaultValue={findChosenCategory()}
										options={categories?.map(({ name, _id }: any) => ({
											value: _id,
											label: name,
										}))}
									/>
								</div>
							)}
						</div>
						{isModifyModalOpen && (
							<div className={styles.inputContainer}>
								<Select
									isMulti
									placeholder="Tags"
									options={tags?.map(({ name, _id }: Tag): any => ({
										value: _id,
										label: name,
										data: name,
									}))}
									defaultValue={findChosenTags()}
									onChange={selected =>
										setSelectedTags(selected.map(tag => tag.value))
									}
								/>
							</div>
						)}
					</div>
					<div className={styles.btnContainer}>
						<Button label="Modify" onClick={() => modifyPet()} />
					</div>
				</div>
			</Modal>
		</DashboardContext.Provider>
	)
}

export default DashBoard
