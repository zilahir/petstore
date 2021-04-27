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
