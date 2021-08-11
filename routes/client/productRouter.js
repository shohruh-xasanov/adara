const router = require('express').Router()
const {productAll,getProduct,getCategory,getCollection} = require('../../controllers/client/productController')
router.get('/all/:name', productAll)
router.get('/:id', getProduct)
router.get('/cat/:id',getCategory)
router.get('/collection/:id', getCollection)
module.exports = router