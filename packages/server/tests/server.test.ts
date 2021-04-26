// import supertest from 'supertest'
import random from 'random'
import faker from 'faker'
import mongoose, { connection, Model, Query } from 'mongoose'
import dotenv from 'dotenv'

import Tag from '../src/models/tag'
import Category from '../src/models/category'
import Pet, { IPet, Pet as PetInterface, Status } from '../src/models/pet'
import User, { UserInterface } from '../src/models/user'

const fakerApi: Faker.FakerStatic & any = faker
dotenv.config()

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

test('/POST /api/pet', async done => {
	const tags = await Tag.find({})
	const categories = await Category.find({})
	const numOfTag = random.int(1, tags.length)
	const numOfCategory = random.int(1, categories.length)
	const tagsForThisPet = tags.slice(0, numOfTag)
	const categoiesForThisPet = categories[numOfCategory]
	const randomDogImage = faker.image.animals(500, 500)
	const newUser: UserInterface = {
		username: faker.internet.userName(),
		firstName: faker.name.firstName(0),
		lastName: faker.name.lastName(1),
		email: faker.internet.email(),
		password: 'demo123',
		phone: '0406753038',
		userStatus: 'active',
	}

	const user = await User.create(newUser)
	const newPet: PetInterface = {
		userId: user.id,
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

test('/DELETE /api/pet', async done => {
	const tags = await Tag.find({})
	const categories = await Category.find({})
	const numOfTag = random.int(1, tags.length)
	const numOfCategory = random.int(1, categories.length)
	const tagsForThisPet = tags.slice(0, numOfTag)
	const categoiesForThisPet = categories[numOfCategory]
	const randomDogImage = faker.image.animals(500, 500)
	const newUser: UserInterface = {
		username: faker.internet.userName(),
		firstName: faker.name.firstName(0),
		lastName: faker.name.lastName(1),
		email: faker.internet.email(),
		password: 'demo123',
		phone: '0406753038',
		userStatus: 'active',
	}

	const user = await User.create(newUser)
	const newPet: PetInterface = {
		userId: user.id,
		name: faker.lorem.word(5),
		status: Status.available,
		category: categoiesForThisPet,
		tags: tagsForThisPet,
		photoUrls: [randomDogImage],
	}
	const pet = await Pet.create(newPet)
	Pet.findOneAndDelete({ id: pet.id }).then(() => {
		done()
	})
})

test('/PATCH /api/pet', async done => {
	const tags = await Tag.find({})
	const categories = await Category.find({})
	const numOfTag = random.int(1, tags.length)
	const numOfCategory = random.int(1, categories.length)
	const tagsForThisPet = tags.slice(0, numOfTag)
	const categoiesForThisPet = categories[numOfCategory]
	const randomDogImage = faker.image.animals(500, 500)
	const newUser: UserInterface = {
		username: faker.internet.userName(),
		firstName: faker.name.firstName(0),
		lastName: faker.name.lastName(1),
		email: faker.internet.email(),
		password: 'demo123',
		phone: '0406753038',
		userStatus: 'active',
	}

	const user = await User.create(newUser)
	const newPet: PetInterface = {
		userId: user.id,
		name: faker.lorem.word(5),
		status: Status.available,
		category: categoiesForThisPet,
		tags: tagsForThisPet,
		photoUrls: [randomDogImage],
	}

	const pet: IPet = await Pet.create(newPet)

	const modifiedPet = {
		...newPet,
		name: 'MODIFIED',
	}

	Pet.findOneAndUpdate({ id: pet.id }, modifiedPet).then(() => {
		done()
	})
})
