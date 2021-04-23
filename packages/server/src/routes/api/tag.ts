import { Router } from 'express'

import { insertNewTag } from '../../controllers/tag'

const router: Router = Router()

router.post('/', [insertNewTag])

export default router
