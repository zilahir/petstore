// import supertest from 'supertest'
import random from 'random'
import faker from 'faker'
import mongoose, { connection, Model, Query } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

import Tag from '../src/models/tag'
import Category from '../src/models/category'
import Pet, { Pet as PetInterface, Status } from '../src/models/pet'
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

test('/POST /api/pet', async done => {
	const tags = await Tag.find({})
	const categories = await Category.find({})
	const numOfTag = random.int(1, tags.length)
	const numOfCategory = random.int(1, categories.length)
	const tagsForThisPet = tags.slice(0, numOfTag)
	const categoiesForThisPet = categories[numOfCategory]
	const randomDogImage = faker.image.animals(500, 500)
	const newPet: PetInterface = {
		name: faker.lorem.word(5),
		status: Status.available,
		category: categoiesForThisPet,
		tags: tagsForThisPet,
		photoUrls: [randomDogImage],
	}
	Pet.create(newPet).then(() => {
		done()
	})
})
