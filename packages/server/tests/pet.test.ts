import supertest from 'supertest'
import dotenv from 'dotenv'

import app from '../src/server'
import Pet, { IPet, Pet as PetInterface, Status } from '../src/models/pet'
import {
	disConnectFromDb,
	connectToDb,
	createUser,
	createPet,
} from './utils/setup'

/* test 

	pet CREATE
	pet MODIFY
	pet DELETE

*/

dotenv.config()

beforeEach(done => {
	connectToDb().then(() => {
		done()
	})
})

afterEach(done => {
	disConnectFromDb().then(() => {
		done()
	})
})

test('/POST, /api/user', async done => {
	createUser().then(() => {
		done()
	})
})

test('/POST /api/pet', async done => {
	const pet = await createPet()
	await supertest(app)
		.get(`/pet/${pet.id}`)
		.expect(200)
		.then(response => {
			expect(response.body._id).toBe(pet.id)
			done()
		})
})

test('/DELETE /api/pet', async done => {
	const pet = await createPet()
	Pet.findByIdAndDelete(pet.id).then(() => {
		Pet.findOne({ id: pet.id }).then(result => {
			expect(result).toBe(null)
			done()
		})
	})
})

test('/PATCH /api/pet', async done => {
	const pet: IPet = await createPet()
	const newName = `${pet.toObject().name}-MODIFIED`

	const modifiedPet = {
		name: newName,
	}

	Pet.findByIdAndUpdate(pet._id, modifiedPet, {
		new: true,
	}).then(result => {
		expect(result.toObject().name).toBe(newName)
		done()
	})
})
