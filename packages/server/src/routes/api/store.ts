import { Router } from 'express'
import { insertNewOrder } from '../../controllers/order'

const router: Router = Router()

router.post('/order', [insertNewOrder])

export default router
