import faker from 'faker'
import Category from '../src/models/category'
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

test('POST /api/category', async done => {
	const dogs: Array<string> = (faker as any).animal.dog(10).split(' ')
	await Promise.all(
		dogs.map(async (tag: string) => {
			await Category.create({ name: tag }).then(() => {
				done()
			})
		}),
	)
})
