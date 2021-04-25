import {
	createStore,
	combineReducers,
	compose,
	applyMiddleware,
	Store,
} from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import test from './reducers/test'
import user from './reducers/user'

export interface IUSer {
	email: string
	password: string
	username: string
	firstName: string
	lastName: string
	phone: string
	userStatus: string
	token: string
}

interface Test {
	test: string
}

export interface TopLevelState {
	user: IUSer
	test: Test
}

const persistConfig = {
	key: 'petstore:root',
	storage,
	version: 1,
	blacklist: [],
}

const rootReducer = combineReducers({
	test,
	user,
})

const composeEnhancers =
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWareList = [thunk]

export const store: Store<TopLevelState> = createStore(
	persistedReducer,
	composeEnhancers(applyMiddleware(...middleWareList)),
)
export const persistor = persistStore(store)
