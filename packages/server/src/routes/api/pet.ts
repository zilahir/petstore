import { Router } from 'express'
// import auth from '../../middleware/auth'

import {
	insertNewPet,
	getAllPets,
	findPetsByStatus,
	patchPet,
	getPetById,
	deletePetById,
	getPetByUser,
} from '../../controllers/pet'

const router: Router = Router()

/**
 * POST /pet
 *
 * @summary creates a pet
 * @param {object} pet pet object
 * @returns {object} 200 - success response
 * @returns {object} 400 - Bad request response
 * @example response - 200 - success response example
 * {
    "photoUrls": [
        "demo"
    ],
    "category": [
        "6083edadde033eaa9c008569"
    ],
    "userId": "608588ce3fde5761fa870ad5",
    "tags": [
        "6083f203874b78ae165ca457"
    ],
    "_id": "60843b745151f1c87f6f9b93",
    "name": "Pablo",
    "status": "available",
    "__v": 0
  }
 */
router.post('/', [insertNewPet])

router.get('/', [getAllPets])

router.patch('/:petId', [patchPet])

router.get('/findByStatus', [findPetsByStatus])

router.delete('/:petId', [deletePetById])

router.get('/user/:userId', [getPetByUser])

router.get('/:id', [getPetById])

export default router
