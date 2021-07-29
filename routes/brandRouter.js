const router = require('express').Router()
const {createBrand,getAll,updateBrand,elementDelete,getElementById} = require('../controllers/brandController')

router.post('/create',createBrand)
router.get('/all', getAll)
router.route('/:id')
    .get(getElementById)
    .put(updateBrand)
    .delete(elementDelete)

module.exports = router