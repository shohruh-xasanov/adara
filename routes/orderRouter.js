const router = require('express').Router()
const {getAll} = require('../controllers/orderController')

router.get('/', getAll)

module.exports = router