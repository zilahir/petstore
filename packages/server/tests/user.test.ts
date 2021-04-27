import faker from 'faker'
import User, { UserInterface } from '../src/models/user'
import { disConnectFromDb, connectToDb } from './utils/setup'

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
	const newUser: UserInterface = {
		username: faker.internet.userName(),
		firstName: faker.name.firstName(0),
		lastName: faker.name.lastName(1),
		email: faker.internet.email(),
		password: 'demo123',
		phone: '0406753038',
		userStatus: 'active',
	}
	User.create(newUser).then(() => {
		done()
	})
})
