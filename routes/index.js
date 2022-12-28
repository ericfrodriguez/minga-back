import categories from './categories.js'
import users from './users.js'
import express from 'express'
let router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('minga server ready')
})

router.use('/categories',categories)
router.use('/users',users) //obligo al enrrutador principal
//a usar el path USERS con las rutas definidas en el enrrutador de USERS

export default router