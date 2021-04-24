// import supertest from 'supertest'

import faker from 'faker'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

import Tag from '../src/models/tag'
import Category from '../src/models/category'
// import app from '../src/server'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// TODO: fix this once DefinitelyTyped is updated
const fakerApi: Faker.FakerStatic & any = faker

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
	await Promise.all(
		tags.map(async (tag: string) => {
			await Tag.create({ name: tag })
		}),
	)
})

test('POST /api/tag', async () => {
	const dogs: Array<string> = fakerApi.animal.dog(10).split(' ')
	await Promise.all(
		dogs.map(async (tag: string) => {
			await Category.create({ name: tag })
		}),
	)
})
