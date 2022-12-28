import controller from '../controllers/categories.controller.js'
const { create,read,one,update,destroy } = controller
//const read = controller.read
import express from 'express'
let router = express.Router()

router.post('/',create)
router.get('/',read)
router.get('/:category_id',one) //el nombre del param se define en el controlado!
router.put('/:id',update) //put o patch para modificar
router.delete('/:id',destroy)

//defino controlador
//defino ruta
//pruebo en postman

export default router