import bcrypt from 'bcryptjs'
import { Router, Response } from 'express'
import { check, validationResult } from 'express-validator/check'
import HttpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'

import Payload from '../../types/Payload'
import Request from '../../types/Request'
import User, { IUser } from '../../models/user'

const router: Router = Router()

// @route   POST api/user
// @desc    Register user given their email and password, returns the token upon successful registration
// @access  Public
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters',
		).isLength({ min: 6 }),
	],
	async (req: Request, res: Response) => {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res
				.status(HttpStatusCodes.BAD_REQUEST)
				.json({ errors: errors.array() })
		}

		const { email, password, username, firstName, lastName, phone } = req.body
		try {
			let user: IUser = await User.findOne({ email })

			if (user) {
				return res.status(HttpStatusCodes.BAD_REQUEST).json({
					errors: [
						{
							msg: 'User already exists',
						},
					],
				})
			}

			const salt = await bcrypt.genSalt(10)
			const hashed = await bcrypt.hash(password, salt)

			// Build user object based on IUser
			const userFields = {
				email,
				password: hashed,
				username,
				firstName,
				lastName,
				phone,
			}

			user = new User(userFields)

			await user.save()

			const payload: Payload = {
				userId: user.id,
			}

			jwt.sign(
				payload,
				process.env.JWT_SECRET,
				{ expiresIn: process.env.JWT_EXP },
				(err, token) => {
					if (err) throw err
					res.json({ token, ...userFields })
				},
			)
		} catch (err) {
			console.error(err.message)
			res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send('Server Error')
		}
	},
)

export default router
