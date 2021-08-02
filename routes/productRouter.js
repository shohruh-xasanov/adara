const router = require('express').Router()
const {addProduct, getAll} = require('../controllers/productController') 
const upload = require('../middleware/fileUploads')
const {isAdminAuth} = require('../middleware/auth')
router.post('/create',isAdminAuth, upload.array('images', 6), addProduct)
router.get('/all',isAdminAuth, getAll)

module.exports = router