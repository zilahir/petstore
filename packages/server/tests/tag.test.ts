import faker from 'faker'

import { disConnectFromDb, connectToDb } from './utils/setup'
import Tag from '../src/models/tag'

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

test('POST /api/tag', async done => {
	const tags: Array<string> = faker.random.words(10).split(' ')

	const oneTag = tags[0]
	const tag = await Tag.create({ name: oneTag }).then(() => {
		done()
	})
})
