import { Document, Model, model, NativeError, Schema } from 'mongoose'
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import { ManagedUpload } from 'aws-sdk/clients/s3'
import { Request } from 'express'

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

export interface Image {
	image: {
		[key: string]: string
		name: string
	}
}

export interface FileInterface {
	files: Image
}

export const uploadFile = (req: Request & FileInterface): Promise<string> => {
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

		s3.upload(params, (error: Error, data: ManagedUpload.SendData): void => {
			if (error) {
				throw new Error(error.message)
			}
			resolve(data.Location)
		})
	})
}

export const getAll = (): Promise<IFile[]> => {
	return File.find({}).exec()
}

export default File
