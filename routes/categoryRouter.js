const router = require('express').Router()
const {addCategory, getAll,getById,elemntDelete,updateCategory} = require('../controllers/categoryController')

router.post('/create', addCategory)
router.get('/all',getAll)
router.route('/:id')
    .get(getById)
    .put(updateCategory)
    .delete(elemntDelete)
module.exports = router