import bcrypt from 'bcryptjs'
import { Router, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import HttpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'

import auth from '../../middleware/auth'
import Payload from '../../types/Payload'
import Request from '../../types/Request'
import User, { IUser } from '../../models/user'

const router: Router = Router()

// @route   GET api/auth
// @desc    Get authenticated user given the token
// @access  Private
router.get('/', auth, async (req: Request, res: Response) => {
	try {
		const user: IUser = await User.findById(req.userId).select('-password')
		res.json(user)
	} catch (err) {
		console.error(err.message)
		res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
	}
})

// @route   POST api/auth
// @desc    Login user and get token
// @access  Public
router.post(
	'/login',
	[
		check('username', 'Please include a valid email').exists(),
		check('password', 'Password is required').exists(),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array() })
		}

		const { usename, password } = req.body
		try {
			const user: IUser = await User.findOne({ usename })

			if (!user) {
				return res.status(HttpStatusCodes.BAD_REQUEST).json({
					errors: [
						{
							msg: 'Invalid Credentials',
						},
					],
				})
			}

			const isMatch = await bcrypt.compare(password, user.password)

			if (!isMatch) {
				return res.status(HttpStatusCodes.BAD_REQUEST).json({
					errors: [
						{
							msg: 'Invalid Credentials',
						},
					],
				})
			}

			const payload: Payload = {
				userId: user.id,
			}

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXP },
				(err, token) => {
					if (err) throw err
					res.json({ token, ...user.toObject() })
				},
			)
		} catch (err) {
			console.error(err.message)
			res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
		}
	},
)

export default router
