import faker from 'faker'
import supertest from 'supertest'

import app from '../src/server'
import { disConnectFromDb, connectToDb, createUser } from './utils/setup'

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

test('/GET, /api/user', async done => {
	const user = await createUser()
	await supertest(app)
		.get(`/user/${user.username}`)
		.expect(200)
		.then(response => {
			expect(response.body.username).toStrictEqual(user.toObject().username)
			done()
		})
})

test('/DELETE, /api/user', async done => {
	const user = await createUser()
	await supertest(app)
		.delete(`/user/${user.username}`)
		.expect(200)
		.then(response => {
			expect(response.body.username).toStrictEqual(user.toObject().username)
			done()
		})
})
