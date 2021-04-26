import { Document, Model, model, NativeError, Schema } from 'mongoose'
import AWS from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

export interface IFile extends Document {
	isbn: string
	url: string
	createdAt: string | Date
}

export interface File {
	url: string
	isbn: string
	createdAt: string | Date
}

const fileSchema: Schema = new Schema({
	url: {
		type: String,
		required: true,
	},
	createdAt: {
		type: String,
		required: true,
	},
})

const File: Model<IFile> = model('File', fileSchema)

const insertFile = (fileData: File) => {
	const file = new File(fileData)
	return file.save()
}

export const uploadFile = (req: any) => {
	return new Promise(resolve => {
		const s3 = new AWS.S3({
			accessKeyId: process.env.AWS_ACCESS,
			secretAccessKey: process.env.AWS_SECRET,
		})

		const params = {
			Bucket: process.env.AWS_BUCKET,
			Key: `${req.files.image.name}`,
			Body: req.files.image.data,
			ACL: 'public-read',
		}

		console.debug('paras', params)

		s3.upload(params, (err: any, data: any): void => {
			if (err) {
				throw new Error(err)
			}
			resolve(data)
		})
	})
}

export const getAll = (): Promise<IFile[]> => {
	return File.find({}).exec()
}

export default File
