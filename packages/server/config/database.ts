import { ConnectionOptions, connect, connection } from 'mongoose'

const connectDB = async () => {
	try {
		const mongoURI: string = process.env.MONGOURL
		const options: ConnectionOptions = {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		}
		await connect(mongoURI, options)
		console.log('MongoDB Connected...')
	} catch (err) {
		console.error(err.message)
		// Exit process with failure
		process.exit(1)
	}
}

export const closeDbConnection = async () => {
	try {
		await connection.close()
	} catch (err) {
		console.error(err.message)
		// Exit process with failure
		process.exit(1)
	}
}

export default connectDB
