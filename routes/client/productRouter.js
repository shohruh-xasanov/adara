const router = require('express').Router()
const {productAll,getProduct} = require('../../controllers/client/productController')
router.get('/all/:typeID', productAll)
router.get('/:id', getProduct)
module.exports = router