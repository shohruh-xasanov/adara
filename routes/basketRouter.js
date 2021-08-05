const router = require('express').Router()
const {createBasket,deleteBasket, getAll} = require('../controllers/client/basketController')
router.post('/create', createBasket)
router.get('/:id',getAll)
router.delete('/:id', deleteBasket)
module.exports = router