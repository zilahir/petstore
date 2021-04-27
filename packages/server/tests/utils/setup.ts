import mongoose from 'mongoose'
import dotenv from 'dotenv'
import faker from 'faker'
import User, { UserInterface } from '../../src/models/user'
import Pet, { Pet as PetInterface, Status } from '../../src/models/pet'
import Category from '../../src/models/category'
import random from 'random'
import Tag from '../../src/models/tag'

dotenv.config()

export const connectToDb = () =>
	mongoose.connect(process.env.MONGOURL, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
	})

export const disConnectFromDb = () => mongoose.connection.close()

export const createUser = () => {
	const newUser: UserInterface = {
		username: faker.internet.userName(),
		firstName: faker.name.firstName(0),
		lastName: faker.name.lastName(1),
		email: faker.internet.email(),
		password: 'demo123',
		phone: '0406753038',
		userStatus: 'active',
	}
	return User.create(newUser)
}

export const createPet = async () => {
	const user = await createUser()
	const categories = await Category.find({})
	const numOfCategory = random.int(1, categories.length)
	const tags = await Tag.find({})
	const numOfTag = random.int(1, tags.length)
	const randomDogImage = faker.image.animals(500, 500)
	const categoiesForThisPet = categories[numOfCategory]
	const tagsForThisPet = tags.slice(0, numOfTag)
	const newPet: PetInterface = {
		userId: user.id,
		name: faker.lorem.word(5),
		status: Status.avaliable,
		category: categoiesForThisPet,
		tags: tagsForThisPet,
		photoUrls: [randomDogImage],
	}
	return Pet.create(newPet)
}
