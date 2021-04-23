import { Router } from 'express'

import { insertNewCategory } from '../../controllers/Category'

const router: Router = Router()

router.post('/', [insertNewCategory])

export default router
