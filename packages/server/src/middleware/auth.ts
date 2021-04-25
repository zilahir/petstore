import config from 'config'
import { Response, NextFunction } from 'express'
import HttpStatusCodes from 'http-status-codes'
import jwt from 'jsonwebtoken'
import { IUser } from '../models/user'

import Payload from '../types/Payload'
import Request from '../types/Request'

/**
 * @param req
 * @param res
 * @param next
 */
export default function (req: Request, res: Response, next: NextFunction) {
	// Get token from header
	const token = req.header('x-auth-token')

	// Check if there's no token
	if (!token) {
		return res
			.status(HttpStatusCodes.UNAUTHORIZED)
			.json({ msg: 'No token, authorization denied' })
	}
	// Verify token
	try {
		const payload: Payload | any = jwt.verify(token, process.env.JWT_SECRET)
		req.userId = payload.userId
		next()
	} catch (err) {
		res.status(HttpStatusCodes.UNAUTHORIZED).json({ msg: 'Token is not valid' })
	}
}

type SameUserRequest = {
	jwt: IUser & { userId: string }
}

/**
 * @param req
 * @param res
 * @param next
 */
export function sameUserCantDoThisAction(
	req: Request & SameUserRequest,
	res: Response,
	next: NextFunction,
) {
	const userId = req.jwt.userId

	if (req.params.userId !== userId) {
		return next()
	} else {
		return res.status(400).send()
	}
}
