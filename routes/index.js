import categories from './categories.route.js'
import users from './users.route.js'
import express from 'express'
let router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('minga server ready')
})

router.use('/categories', categories)
router.use('/auth',users)

export default router