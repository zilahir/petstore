import { TEST } from './actionTypes'

export const setTest = (test: any) => ({
	type: TEST,
	payload: {
		test,
	},
})
