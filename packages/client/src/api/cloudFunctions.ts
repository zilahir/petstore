import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const API = axios.create()

const cloudFunctionRequest = ({
	url,
	method,
	params,
	data,
}: AxiosRequestConfig): Promise<AxiosResponse> =>
	Promise.resolve({
		url,
		method,
		params,
		data,
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

export const get = (requestOptions: AxiosRequestConfig): any =>
	cloudFunctionRequest({ ...requestOptions, method: 'get' })

export const post = (requestOptions: AxiosRequestConfig): any =>
	cloudFunctionRequest({ ...requestOptions, method: 'post' })

export const deleteFunction = (requestOptions: AxiosRequestConfig): any =>
	cloudFunctionRequest({ ...requestOptions, method: 'delete' })

export default API
