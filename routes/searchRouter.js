const router = require('express').Router()
const {searchProduct} = require('../controllers/searchController')
router.get('/product', searchProduct)

module.exports = router