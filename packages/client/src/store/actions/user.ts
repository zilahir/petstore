import { IUSer } from '../configureStore'
import { AUTH_USER, REMOVE_USER } from './actionTypes'

export const authUser = (user: IUSer): any => ({
	type: AUTH_USER,
	payload: user,
})

export const removeUser = (): any => ({
	type: REMOVE_USER,
	payload: null,
})
