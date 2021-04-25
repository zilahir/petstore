import { TEST } from './actionTypes'

export const setTest = (test: string) => ({
	type: TEST,
	payload: {
		test,
	},
})
