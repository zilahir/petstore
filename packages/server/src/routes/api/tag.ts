import { Router } from 'express'

import { insertNewTag } from '../../controllers/tag'

const router: Router = Router()

/**
 * POST /tag
 *
 * @summary create a tag
 * @param {string} name the name fo the new tag
 * @returns {object} 200 - success response
 * @returns {object} 400 - Bad request response
 * @example response - 200 - success response example
 *   {
 *     "_id": "Bury the light",
 *     "name": "lorem ipsum",
 *   }
 */
router.post('/', [insertNewTag])

export default router
