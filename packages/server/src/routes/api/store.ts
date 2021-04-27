import { Router } from 'express'
import {
	insertNewOrder,
	getInventory,
	getAllOrders,
	deleteOrder,
} from '../../controllers/order'

const router: Router = Router()

router.post('/order', [insertNewOrder])

router.get('/inventory', [getInventory])

router.get('/order', [getAllOrders])

router.delete('/order/:orderId', [deleteOrder])

export default router
