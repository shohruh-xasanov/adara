const router = require('express').Router()
const {productAll,getProduct} = require('../../controllers/client/productController')
router.get('/all/:name', productAll)
router.get('/:id', getProduct)
module.exports = router