import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const API = axios.create()

const cloudFunctionRequest = ({
	url,
	method,
	params,
}: AxiosRequestConfig): Promise<AxiosResponse> =>
	Promise.resolve({
		url,
		method,
		params,
	}).then(
		requestData =>
			new Promise((resolve, reject) => {
				API(requestData)
					.then((requestResult: AxiosResponse) => {
						resolve(requestResult.data)
					})
					.catch(error => {
						reject(error)
					})
			}),
	)

export const get = (
	requestOptions: AxiosRequestConfig,
): Promise<AxiosResponse> =>
	cloudFunctionRequest({ ...requestOptions, method: 'get' })

export default API
