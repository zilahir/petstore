import supertest from 'supertest'

import app from '../src/server'

import {
	disConnectFromDb,
	connectToDb,
	createPet,
	createUser,
} from './utils/setup'

import Order from '../src/models/order'

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

test('/POST, /api/store/order', async done => {
	const pet = await createPet()
	const user = await createUser()
	Order.create({ petId: pet.id, userId: user.id }).then(result => {
		expect(result.toObject().userId).toStrictEqual(user.toObject()._id)
		done()
	})
})

test('/DELETE, /api/store/order', async done => {
	const pet = await createPet()
	const user = await createUser()
	const order = Order.create({ petId: pet.id, userId: user.id })
	await supertest(app)
		.delete(`/store/order/${(await order)._id}`)
		.expect(200)
		.then(() => {
			done()
		})
})

test('/GET, /api/store/order', async done => {
	const pet = await createPet()
	const user = await createUser()
	const order = await Order.create({ petId: pet.id, userId: user.id })
	await supertest(app)
		.delete(`/store/order/${order._id}`)
		.expect(200)
		.then(() => {
			done()
		})
})
