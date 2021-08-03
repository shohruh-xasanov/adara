const router = require('express').Router()
const {productAll} = require('../../controllers/client/productController')
router.get('/all/:typeID', productAll)

module.exports = router