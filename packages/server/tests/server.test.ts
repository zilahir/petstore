// import supertest from 'supertest'

import faker from 'faker'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { forEach } from 'lodash'

dotenv.config()

import Tag from '../src/models/tag'
// import app from '../src/server'

beforeEach(done => {
	mongoose
		.connect(process.env.MONGOURL, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		})
		.then(() => {
			done()
		})
})

afterEach(done => {
	mongoose.connection.close().then(() => {
		done()
	})
})

test('POST /api/tag', async () => {
	const tags: Array<string> = faker.random.words(10).split(' ')
	console.debug('tags', tags)
	await Promise.all(
		tags.map(async (tag: string) => {
			await Tag.create({ name: tag })
		}),
	)
})
