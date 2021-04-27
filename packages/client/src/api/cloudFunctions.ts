import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const DEFAULT_OPTIONS = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
}

const API = axios.create()

const cloudFunctionRequest = ({
	url,
	method,
	params,
	data,
	headers,
}: AxiosRequestConfig): Promise<AxiosResponse> => {
	const opt = {
		...DEFAULT_OPTIONS,
		...headers,
	}
	return Promise.resolve({
		url,
		method,
		params,
		data,
		headers: opt,
	}).then(
		requestData =>
			new Promise((resolve, reject) => {
				API(requestData)
					.then((requestResult: AxiosResponse) => {
						resolve(requestResult.data)
					})
					.catch((error: AxiosError) => {
						reject(error.response?.data)
					})
			}),
	)
}

export const get = (requestOptions: AxiosRequestConfig): any =>
	cloudFunctionRequest({ ...requestOptions, method: 'get' })

export const post = (requestOptions: AxiosRequestConfig): any =>
	cloudFunctionRequest({ ...requestOptions, method: 'post' })

export const deleteFunction = (requestOptions: AxiosRequestConfig): any =>
	cloudFunctionRequest({ ...requestOptions, method: 'delete' })

export const patch = (requestOptions: AxiosRequestConfig): any =>
	cloudFunctionRequest({ ...requestOptions, method: 'patch' })

export default API
