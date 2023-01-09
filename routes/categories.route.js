import controller from '../controllers/categories.controller.js'
import schema from '../schemas/categories.schema.js'
import validator from '../middlewares/validator.js'
const { create,read,one,update,destroy } = controller
import express from 'express'
let router = express.Router()

router.post('/:author_id/:company_id',validator(schema),create)
router.get('/',read)
router.get('/:category_id',one)
router.put('/:id',update)
router.delete('/:id',destroy)

export default router