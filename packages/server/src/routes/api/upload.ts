import { Router } from 'express'
import fileUpload from 'express-fileupload'

import { uploadImage } from '../../file/controllers/file.controller'

const router = Router()

router.post('/upload', [fileUpload(), uploadImage])

export default router
