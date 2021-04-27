import { ConnectionOptions, connect, connection } from 'mongoose'

const connectDB = async (): Promise<void> => {
	try {
		const mongoURI: string = process.env.MONGOURL
		const options: ConnectionOptions = {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		}
		await connect(mongoURI, options)
	} catch (err) {
		throw new Error(`Something bad happened! ${err.message}`)
	}
}

export const closeDbConnection = async (): Promise<void> => {
	try {
		await connection.close()
	} catch (err) {
		throw new Error(`Something bad happened! ${err.message}`)
	}
}

export default connectDB
