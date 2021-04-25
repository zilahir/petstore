export const apiRoot =
	process.env.NODE_ENV === 'development'
		? 'http://localhost:5000'
		: 'https://iotpg5dv56.execute-api.eu-west-1.amazonaws.com/dev/'

export const apiEndPoints = {
	getUser: `${apiRoot}/getusers`,
	getAllPets: `${apiRoot}/pet`,
	findByStatus: `${apiRoot}/pet/findByStatus`,
	registerNewUser: `${apiRoot}/user`,
	loginUser: `${apiRoot}/user/login`,
}
