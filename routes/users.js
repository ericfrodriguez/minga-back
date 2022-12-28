import express from 'express'
let router = express.Router()

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    success: true,
    response: 'users'
  })
})

export default router