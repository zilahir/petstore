import { Router } from 'express'
import { insertNewOrder, getInventory } from '../../controllers/order'

const router: Router = Router()

router.post('/order', [insertNewOrder])

router.get('/inventory', [getInventory])

export default router
