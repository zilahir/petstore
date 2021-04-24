import { Router } from 'express'

import { insertNewCategory } from '../../controllers/category'

const router: Router = Router()

/**
 * POST /category
 *
 * @summary create a category
 * @param {string} name the name fo the new category
 * @returns {object} 200 - success response
 * @returns {object} 400 - Bad request response
 * @example response - 200 - success response example
 *   {
 *     "_id": "Bury the light",
 *     "name": "lorem ipsum",
 *   }
 */
router.post('/', [insertNewCategory])

export default router
