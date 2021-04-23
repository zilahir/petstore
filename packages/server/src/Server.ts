import express from 'express'
import serverless from 'serverless-http'
import { auth, requiresAuth, OpenidRequest } from 'express-openid-connect'
import dotenv from 'dotenv'

import connectDB from '../config/database'
import authorization from './routes/api/auth'
import user from './routes/api/user'
import profile from './routes/api/profile'
import file from './routes/api/upload'
import category from './routes/api/category'

dotenv.config()

const config = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.OAUTH_SECRET,
	baseURL: 'http://localhost:5000',
	clientID: 'AYzTQQMGYe87U7NxgNRHG84SJZf5Anzd',
	issuerBaseURL: 'https://dev-zilahir.eu.auth0.com',
}

const app = express()
app.use(auth(config))

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
	res.header('Access-Control-Expose-Headers', 'Content-Length')
	res.header(
		'Access-Control-Allow-Headers',
		'Accept, Authorization, Content-Type, X-Requested-With, Range',
	)
	if (req.method === 'OPTIONS') {
		return res.send(200)
	} else {
		return next()
	}
})

// Connect to MongoDB
connectDB()

// Express configuration
app.set('port', process.env.PORT || 5000)
app.use(express.json())
app.use(
	express.urlencoded({
		extended: false,
		limit: '50mb',
		parameterLimit: 100000,
	}),
)

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get('/', (_req, res) => {
	res.send({
		prod: false,
		running: true,
		ver: 0.1,
	})
})

app.get('/profile', requiresAuth(), (req: OpenidRequest, res) => {
	res.send(JSON.stringify(req.oidc.user))
})

app.use('/api/auth', authorization)
app.use('/api/user', user)
app.use('/api/profile', profile)
app.use('/api/file', file)
app.use('/category', category)

const port = app.get('port')

const server = app.listen(port, () =>
	console.log(`Server started on port ${port}`),
)

module.exports = app

export default server

// module.exports.handler = serverless(app)
