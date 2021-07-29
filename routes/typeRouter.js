const router = require('express').Router()
const {createBrand,getAll,getElementById,elementDelete,updateType} = require('../controllers/typeController')

router.post('/create',createBrand)
router.get('/all', getAll)
router.route('/:id')
    .get(getElementById)
    .put(updateType)
    .delete(elementDelete)

module.exports = router