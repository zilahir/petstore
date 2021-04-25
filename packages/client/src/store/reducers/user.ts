import { PURGE } from 'redux-persist'

import { AUTH_USER, REMOVE_USER } from '../actions/actionTypes'
import { IUSer } from '../configureStore'

const initialState = {
	user: {},
}

interface Action {
	type: string
	payload: IUSer
}

const reducer = (
	state = initialState,
	action: Action,
): IUSer | typeof initialState => {
	switch (action.type) {
		case AUTH_USER:
			return action.payload
		case REMOVE_USER:
			return initialState
		case PURGE:
			return initialState
		default:
			return state
	}
}

export default reducer
