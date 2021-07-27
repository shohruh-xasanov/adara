const router = require('express').Router()
const {addProduct, getAll} = require('../controllers/productController') 
const upload = require('../middleware/fileUploads')
router.post('/create',upload.array('images', 6), addProduct)
router.get('/all', getAll)

module.exports = router