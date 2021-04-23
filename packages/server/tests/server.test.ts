import supertest from 'supertest'
import connectDB, { closeDbConnection } from '../config/database'

import app from '../src/server'

beforeEach(() => {
	connectDB().then(done => {
		console.log('Mongo setup OK', done)
	})
})

afterEach(() => {
	closeDbConnection().then(done => {
		console.log('Mongo closed OK', done)
	})
})
