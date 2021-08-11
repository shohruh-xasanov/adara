const router = require('express').Router()
const {addProduct, getAll,
    updateProduct,
    getById,
    deleteFilePoster} = require('../controllers/productController') 
const upload = require('../middleware/fileUploads')
const {isAdminAuth} = require('../middleware/auth')
router.post('/create',isAdminAuth, upload.array('images', 6), addProduct)
router.get('/edit/:id', getById)
router.get('/all',isAdminAuth, getAll)
router.delete('/:id',deleteFilePoster)
router.put('/:id',updateProduct)

module.exports = router;