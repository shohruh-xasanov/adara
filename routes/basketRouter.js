const router = require('express').Router()
const {addBasket, getAll} = require('../models/Basket')
router.post('/create', addBasket)
router.get('/all',getAll)
module.exports = router