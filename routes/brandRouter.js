const router = require('express').Router()
const {createBrand,getAll,updateBrand,elementDelete,getElementById} = require('../controllers/brandController')
const {isAdminAuth} = require('../middleware/auth')
router.post('/create',isAdminAuth,createBrand)
router.get('/all',isAdminAuth, getAll)
router.route('/:id')
    .get(isAdminAuth,getElementById)
    .put(isAdminAuth,updateBrand)
    .delete(isAdminAuth,elementDelete)

module.exports = router