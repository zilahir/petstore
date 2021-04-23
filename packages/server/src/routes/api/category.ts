import { Router } from 'express'

import { insertNewCategory } from '../../controllers/category'

const router: Router = Router()

router.post('/', [insertNewCategory])

export default router
